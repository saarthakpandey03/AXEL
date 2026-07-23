def parse(file_path: str):

    with open(
        file_path,
        "r",
        encoding="utf-8"
    ) as f:
        text = f.read()

    if not text.strip():
        raise Exception("Empty document")

    return text