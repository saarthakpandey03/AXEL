import api from "./api";

export const sendMessage = async (
    message,
    provider = "gemini",
    model = null
) => {

    // Always get the latest session ID
    const sessionId =
        localStorage.getItem("session_id") || "";


    const response = await api.post(
        "/message",
        {
            message,
            provider,
            model,
        },
        {
            headers: {
                "X-Session-Id": sessionId,
            },
        }
    );


    // Backend creates a session if one doesn't exist
    if (response.data.session_id) {

        localStorage.setItem(
            "session_id",
            response.data.session_id
        );

    }


    return response.data;
};