import api from "./api";


const getSessionId = () => {
    try {
        const savedUser =
            localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }


        const user = JSON.parse(
            savedUser
        );


        // Unique user identifier
        const userId =
            user?.id ||
            user?._id ||
            user?.email;


        if (!userId) {
            return null;
        }


        // Separate session for every user
        const sessionKey =
            `axel_session_${userId}`;


        let sessionId =
            localStorage.getItem(
                sessionKey
            );


        // Create session if it doesn't exist
        if (!sessionId) {

            sessionId =
                crypto.randomUUID();

            localStorage.setItem(
                sessionKey,
                sessionId
            );
        }


        return sessionId;

    } catch (error) {

        console.error(
            "Failed to get session ID:",
            error
        );

        return null;
    }
};


export const sendMessage = async (
    message,
    provider = "gemini",
    model = null
) => {

    const sessionId =
        getSessionId();


    const response = await api.post(
        "/message",
        {
            message,
            provider,
            model,
        },
        {
            headers: sessionId
                ? {
                    "X-Session-ID": sessionId,
                }
                : {},
        }
    );


    return response.data;
};