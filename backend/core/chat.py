import os

from datetime import datetime
from zoneinfo import ZoneInfo

from dotenv import load_dotenv
from google import genai
from openai import OpenAI

from backend.memory.conversation import (
    add_message,
    build_context
)


# =========================================================
# ENVIRONMENT
# =========================================================

load_dotenv()


# =========================================================
# API CLIENTS
# =========================================================

gemini_api_key = os.getenv("GEMINI_API_KEY")
groq_api_key = os.getenv("GROQ_API_KEY")


if not gemini_api_key:
    print("[WARNING] GEMINI_API_KEY is not configured.")


if not groq_api_key:
    print("[WARNING] GROQ_API_KEY is not configured.")


gemini_client = genai.Client(
    api_key=gemini_api_key
)


groq_client = OpenAI(
    api_key=groq_api_key,
    base_url="https://api.groq.com/openai/v1"
)


# =========================================================
# DEFAULT MODELS
# =========================================================

DEFAULT_MODELS = {
    "gemini": "gemini-3.5-flash",
    "groq": "llama-3.3-70b-versatile",
}


# =========================================================
# SYSTEM PROMPT
# =========================================================

SYSTEM_PROMPT = """
You are AXEL, an intelligent AI assistant.

Current date and time:
{current_datetime}

Use the previous conversation only when it is relevant.
If the current question is unrelated, answer it independently.

IMPORTANT:

- You have been given the current date and time above.
- If the user asks for the current time, use that exact time.
- If the user asks for today's date, use the current date above.
- Never say that you don't have access to the current time.
- Never write placeholders such as [current time], [date], or [time].
- Answer naturally and directly.

Conversation History:
{history}

Current Question:
{question}

Answer:
"""


# =========================================================
# CHAT
# =========================================================

def chat(
    session_id: str,
    question: str,
    provider: str = "gemini",
    model: str | None = None
):

    provider = provider.lower().strip()


    # =====================================================
    # VALIDATE PROVIDER
    # =====================================================

    supported_providers = {
        "gemini",
        "groq"
    }


    if provider not in supported_providers:

        raise ValueError(
            f"Unsupported provider: {provider}"
        )


    # =====================================================
    # CONVERSATION HISTORY
    # =====================================================

    history = build_context(
        session_id,
        limit=10
    )


    # =====================================================
    # CURRENT INDIA TIME
    # =====================================================

    current_datetime = datetime.now(
        ZoneInfo("Asia/Kolkata")
    ).strftime(
        "%A, %d %B %Y, %I:%M %p"
    )


    # =====================================================
    # BUILD PROMPT
    # =====================================================

    final_prompt = SYSTEM_PROMPT.format(
        history=history,
        question=question,
        current_datetime=current_datetime
    )


    # =====================================================
    # GEMINI
    # =====================================================

    if provider == "gemini":

        selected_model = (
            model
            or DEFAULT_MODELS["gemini"]
        )


        print(
            f"[AXEL] Gemini request | "
            f"model={selected_model}"
        )


        try:

            response = (
                gemini_client
                .models
                .generate_content(
                    model=selected_model,
                    contents=final_prompt
                )
            )


            # ---------------------------------------------
            # Validate response
            # ---------------------------------------------

            answer = response.text


            if not answer:

                raise RuntimeError(
                    "Gemini returned an empty response."
                )


            answer = answer.strip()


            if not answer:

                raise RuntimeError(
                    "Gemini returned an empty response."
                )


        except Exception as e:

            print(
                "[GEMINI ERROR]"
            )

            print(
                f"Type: {type(e).__name__}"
            )

            print(
                f"Message: {str(e)}"
            )

            raise RuntimeError(
                f"Gemini request failed: {str(e)}"
            )


    # =====================================================
    # GROQ
    # =====================================================

    elif provider == "groq":

        selected_model = (
            model
            or DEFAULT_MODELS["groq"]
        )


        print(
            f"[AXEL] Groq request | "
            f"model={selected_model}"
        )


        try:

            response = (
                groq_client
                .chat
                .completions
                .create(

                    model=selected_model,

                    messages=[
                        {
                            "role": "user",
                            "content": final_prompt
                        }
                    ]
                )
            )


            answer = (
                response
                .choices[0]
                .message
                .content
            )


            if not answer:

                raise RuntimeError(
                    "Groq returned an empty response."
                )


            answer = answer.strip()


            if not answer:

                raise RuntimeError(
                    "Groq returned an empty response."
                )


        except Exception as e:

            print(
                "[GROQ ERROR]"
            )

            print(
                f"Type: {type(e).__name__}"
            )

            print(
                f"Message: {str(e)}"
            )

            raise RuntimeError(
                f"Groq request failed: {str(e)}"
            )


    # =====================================================
    # SAVE MEMORY
    # =====================================================

    add_message(
        session_id,
        "user",
        question
    )


    add_message(
        session_id,
        "assistant",
        answer
    )


    # =====================================================
    # RETURN
    # =====================================================

    return answer