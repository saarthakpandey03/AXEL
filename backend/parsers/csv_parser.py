import pandas as pd


def parse(file_path: str):

    dataframe = pd.read_csv(file_path)

    if dataframe.empty:
        raise Exception("Empty CSV")

    return dataframe.to_string(index=False)