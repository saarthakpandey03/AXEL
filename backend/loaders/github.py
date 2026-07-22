import requests


def load(repo_url: str) -> str:
    """
    Extract useful information from a GitHub repository.

    Returns:
        Repository description
        README
        Folder structure
    """

    try:

        # Example:
        # https://github.com/langchain-ai/langchain

        parts = repo_url.rstrip("/").split("/")

        owner = parts[-2]
        repo = parts[-1]

        headers = {
            "Accept": "application/vnd.github+json",
            "User-Agent": "AXEL"
        }

        # ---------------- Repo Info ---------------- #

        repo_api = f"https://api.github.com/repos/{owner}/{repo}"

        repo_data = requests.get(
            repo_api,
            headers=headers
        ).json()

        description = repo_data.get("description", "")

        # ---------------- README ---------------- #

        readme_api = f"https://raw.githubusercontent.com/{owner}/{repo}/main/README.md"

        readme = requests.get(readme_api)

        readme_text = ""

        if readme.status_code == 200:
            readme_text = readme.text

        # ---------------- Folder Structure ---------------- #

        contents_api = f"https://api.github.com/repos/{owner}/{repo}/contents"

        contents = requests.get(
            contents_api,
            headers=headers
        ).json()

        structure = []

        for item in contents:

            structure.append(
                f"{item['type']} : {item['name']}"
            )

        return f"""
Repository:
{owner}/{repo}

Description:
{description}

Folder Structure:
{chr(10).join(structure)}

README:
{readme_text}
"""

    except Exception as e:

        raise Exception(
            f"GitHub Loader Error : {e}"
        )