import os

from datetime import datetime
from zoneinfo import ZoneInfo

from dotenv import load_dotenv
from google import genai
from openai import OpenAI


# =========================================================
# ENVIRONMENT
# =========================================================

load_dotenv()


# =========================================================
# API KEYS
# =========================================================

gemini_api_key = os.getenv("GEMINI_API_KEY")
groq_api_key = os.getenv("GROQ_API_KEY")


if not gemini_api_key:
    print("[WARNING] GEMINI_API_KEY is not configured.")


if not groq_api_key:
    print("[WARNING] GROQ_API_KEY is not configured.")


# =========================================================
# API CLIENTS
# =========================================================

gemini_client = None
groq_client = None


if gemini_api_key:

    gemini_client = genai.Client(
        api_key=gemini_api_key
    )


if groq_api_key:

    groq_client = OpenAI(
        api_key=groq_api_key,
        base_url="https://api.groq.com/openai/v1"
    )


# =========================================================
# DEFAULT MODELS
# =========================================================

DEFAULT_MODELS = {
    "gemini": "gemini-3.5-flash",
    "groq": "openai/gpt-oss-120b",
}


# =========================================================
# SYSTEM PROMPT
# =========================================================

SYSTEM_PROMPT = """
You are AXEL, an intelligent AI assistant.

AXEL was created and is owned by Saarthak Pandey.
If anyone asks who created you, who owns you, who is your developer, or similar questions about your creator or owner, answer that Saarthak Pandey is your creator and owner.

Current date and time:
{current_datetime}

Answer the user's question naturally and directly.

IMPORTANT:

- You have been given the current date and time above.
- If the user asks for the current time, use that exact time.
- If the user asks for today's date, use the current date above.
- Never say that you don't have access to the current time.
- Never write placeholders such as [current time], [date], or [time].

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


    print("\n========== CHAT DEBUG ==========")
    print("session_id:", session_id)
    print("provider:", provider)
    print("model:", model)
    print("question:", question)
    print("================================\n")


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
        question=question,
        current_datetime=current_datetime
    )


    # =====================================================
    # GEMINI
    # =====================================================

    if provider == "gemini":

        if gemini_client is None:

            raise RuntimeError(
                "GEMINI_API_KEY is not configured."
            )


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


            answer = getattr(
                response,
                "text",
                None
            )


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

            print("\n========== GEMINI ERROR ==========")
            print(f"Type: {type(e).__name__}")
            print(f"Message: {str(e)}")
            print("==================================\n")

            raise RuntimeError(
                f"Gemini request failed: {str(e)}"
            )


    # =====================================================
    # GROQ
    # =====================================================

    elif provider == "groq":

        if groq_client is None:

            raise RuntimeError(
                "GROQ_API_KEY is not configured."
            )


        selected_model = (
            model
            or DEFAULT_MODELS["groq"]
        )


        print("\n========== GROQ DEBUG ==========")
        print("Provider:", provider)
        print("Final model:", selected_model)
        print("================================\n")


        try:

            response = groq_client.chat.completions.create(

                model=selected_model,

                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are AXEL, an intelligent "
                            "and helpful AI assistant."
                        )
                    },
                    {
                        "role": "user",
                        "content": final_prompt
                    }
                ]
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

            print("\n========== GROQ ERROR ==========")
            print(f"Type: {type(e).__name__}")
            print(f"Message: {str(e)}")
            print("================================\n")

            raise RuntimeError(
                f"Groq request failed: {str(e)}"
            )


    # =====================================================
    # RETURN
    # =====================================================

    return answer