import { clientService } from "../service/client";

export const postUserData = async (payload: any) => {
    const response = await clientService("POST", "http://127.0.0.1:5000/post", payload);
    return { status: response?.status, data: response?.data}
}


export const loadMoreData = async (payload : any) => {
    const response = await clientService("POSt", "http://192.168.4.146:8080/insertCustomerData",payload);
    return {status : response?.status, data: response?.data.rows}
}
