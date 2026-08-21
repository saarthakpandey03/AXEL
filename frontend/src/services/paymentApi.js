import api from "./api";

export const createPaymentOrder = async (plan) => {
    const response = await api.post(
        "/payment/create-order",
        {
            plan,
        }
    );

    return response.data;
};

export const verifyPayment = async (paymentData) => {
    const response = await api.post(
        "/payment/verify",
        paymentData
    );

    return response.data;
};