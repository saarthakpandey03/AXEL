import api from "./api";

export const generateImage = async ({
    prompt,
    aspectRatio = "1:1",
    imageSize = "1K",
}) => {

    const sessionId =
        localStorage.getItem("session_id") || "";

    const response = await api.post(
        "/generate-image",
        {
            prompt,
            aspect_ratio: aspectRatio,
            image_size: imageSize,
        },
        {
            headers: {
                "X-Session-Id": sessionId,
            },
        }
    );

    return response.data;
};