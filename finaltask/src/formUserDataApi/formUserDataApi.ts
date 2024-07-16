//[PC_1] to [PC_18]

import { stat } from "fs";
import { clientService } from "../service/client";


export const combined= async () => {
    const response = await clientService("GET", "http://127.0.0.1:5000/combined", {})
   // console.log("Second", response)
    return { status: response?.status, membership: response?.data.membership, location: response?.data.location, carodel: response?.data.carmodel};
}
export const postMembershipData = async (payload: any) => {
    const response = await clientService("POST", "http://127.0.0.1:5000/location", payload)
    return { status: response?.status, data: response?.data.location_data };
}


export const getcarModel = async () => {
    const response = await clientService("GET", "http://127.0.0.1:5000/carModels", {})
    return { status: response?.status, data: response?.data.carmodel_data }
}

export const getGridApi = async (payload: any) => {
    const response = await clientService("POST", "http://127.0.0.1:5000/grid", payload)
    //console.log("API call", response?.data)
    return { status: response?.status, data: response?.data.gridData, totalCount : response?.data.total}
}

export const edit = async (payload:any) => {
    const response = await clientService("POST", "http://127.0.0.1:5000/edit",payload)
    return {status: response?.status, data: response?.data}
}


// export const getCombinedDropdown = async() => {
//     const response = await clientService("GET","http://127.0.0.1:5000/combined",{})
//     console.log("response----",response?.data)
//     return {status: response?.status, membership: response?.data.membership, location: response?.data.location, carmodel: response?.data.carmodel}
// }

export const deleteUserData = async (payload: any) => {
    const response = await clientService("POST", "http://127.0.0.1:5000/delete",payload)
    return {status: response?.status, data: response?.data}

}
