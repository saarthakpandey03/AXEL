from youtube_transcript_api import YouTubeTranscriptApi


def load(url: str) -> str:
    """
    Extract transcript text from a YouTube video.

    Args:
        url (str): YouTube video URL

    Returns:
        str: Complete transcript as plain text
    """

    try:
        # Extract Video ID
        if "youtu.be/" in url:
            video_id = url.split("youtu.be/")[1].split("?")[0]
        else:
            video_id = url.split("v=")[1].split("&")[0]

        api = YouTubeTranscriptApi()

        # Try Hindi first
        try:
            transcript = api.fetch(video_id, languages=["hi"])

        except Exception:
            # Try Indian English
            try:
                transcript = api.fetch(video_id, languages=["en-IN"])

            # Finally English
            except Exception:
                transcript = api.fetch(video_id, languages=["en"])

        # Convert transcript into plain text
        full_text = " ".join(
            snippet.text for snippet in transcript
        )

        return full_text

    except Exception as e:
        raise Exception(f"Transcript Error: {e}")