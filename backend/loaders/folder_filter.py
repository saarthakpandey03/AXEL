import os


# Folders to Ignore
IGNORE_FOLDERS = {
    ".git",
    "__pycache__",
    "node_modules",
    "venv",
    ".venv",
    "dist",
    "build",
    ".idea",
    ".vscode",
    ".next",
    "coverage"
}


# File Extensions to Read
ALLOWED_EXTENSIONS = {
    ".py",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".cpp",
    ".c",
    ".java",
    ".go",
    ".rs",
    ".html",
    ".css",
    ".scss",
    ".json",
    ".yaml",
    ".yml",
    ".md",
    ".txt",
    ".sql",
    ".xml"
}


def should_skip_folder(folder_name: str):

    return folder_name in IGNORE_FOLDERS


def should_read_file(file_path: str):

    _, ext = os.path.splitext(file_path)

    return ext.lower() in ALLOWED_EXTENSIONS