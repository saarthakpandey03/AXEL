import ollama


SYSTEM_PROMPT = """
You are AXEL Vision.

Analyze the image carefully.

Describe:

1. Overall scene
2. Objects present
3. UI elements
4. Code (if present)
5. Error messages
6. Tables
7. Charts
8. Documents
9. Text visible
10. Important details

If the image contains code, explain what the code is doing.

If the image contains an error, explain the error.

If the image contains a document or resume, summarize it.

If the image contains a graph or chart, explain it.

Return a clean, structured description.
"""


def generate_caption(image_path: str):

    response = ollama.chat(
        model="llava",
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": "Analyze this image in detail.",
                "images": [image_path],
            },
        ],
    )

    return response["message"]["content"]