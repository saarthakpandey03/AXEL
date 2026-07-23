import pandas as pd


def parse(file_path: str):

    if not text.strip():
        raise Exception("Empty document")

    sheets = pd.read_excel(
        file_path,
        sheet_name=None
    )

    text = ""

    for sheet_name, dataframe in sheets.items():

        text += f"\nSheet: {sheet_name}\n"

        text += dataframe.to_string(index=False)

        text += "\n"

    return text