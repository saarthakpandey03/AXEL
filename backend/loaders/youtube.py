from urllib.parse import urlparse, parse_qs
from youtube_transcript_api import YouTubeTranscriptApi


def extract_video_id(url: str) -> str:
    """
    Extract YouTube video ID from common YouTube URL formats.
    """

    parsed = urlparse(url)

    hostname = parsed.netloc.lower().replace("www.", "")

    # youtu.be/<id>
    if hostname == "youtu.be":
        return parsed.path.strip("/").split("/")[0]

    # youtube.com/watch?v=<id>
    if hostname in ["youtube.com", "m.youtube.com"]:
        if parsed.path == "/watch":
            return parse_qs(parsed.query).get("v", [None])[0]

        # youtube.com/shorts/<id>
        if parsed.path.startswith("/shorts/"):
            return parsed.path.split("/")[2]

        # youtube.com/embed/<id>
        if parsed.path.startswith("/embed/"):
            return parsed.path.split("/")[2]

    return None


def load(url: str) -> str:
    """
    Extract transcript text from a YouTube video.
    """

    try:

        video_id = extract_video_id(url)

        if not video_id:
            raise ValueError(
                "Invalid or unsupported YouTube URL."
            )

        api = YouTubeTranscriptApi()

        # First try Hindi / English variants
        languages = [
            "hi",
            "en-IN",
            "en",
        ]

        transcript = None

        try:
            transcript = api.fetch(
                video_id,
                languages=languages
            )

        except Exception:

            # If requested languages aren't available,
            # try any available transcript.
            transcript_list = api.list(video_id)

            transcript = transcript_list.find_transcript(
                [
                    "en",
                    "hi",
                    "en-IN",
                ]
            ).fetch()


        if not transcript:
            raise ValueError(
                "No transcript available for this video."
            )


        full_text = " ".join(
            snippet.text
            for snippet in transcript
        )


        if not full_text.strip():
            raise ValueError(
                "Transcript is empty."
            )


        return full_text


    except Exception as e:

        raise Exception(
            f"Transcript Error: {str(e)}"
        )