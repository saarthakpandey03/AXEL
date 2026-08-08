import api from "./api";

export const signup = async(data) =>{
    const response = await api.post(
        "/auth/signup",
        data
    );
    return response.data;
};

export const signin = async(data) => {
    const response = await api.post(
        "/auth/signin",
        data
    );
    return response.data;
};