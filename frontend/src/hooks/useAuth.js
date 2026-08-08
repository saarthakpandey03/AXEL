import { useNavigate } from "react-router-dom";
import { signin } from "../services/authApi";

const useAuth = () => {

    const navigate = useNavigate();

    const login = async (formData) => {

        try {

            const data = await signin(formData);

            localStorage.setItem(
                "token",
                data.access_token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/workspace");

            return data;

        } catch (error) {

            console.log(
                "LOGIN ERROR:",
                error.response?.data
            );

            throw error;
        }
    };


    const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("session_id");
    localStorage.removeItem("axel_messages");

    navigate("/signin", { replace: true });
};


    return {
        login,
        logout,
    };
};

export default useAuth;