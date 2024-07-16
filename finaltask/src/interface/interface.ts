export interface formModel{
    id:string,
    first_name : string,
    last_name : string,
    email_address : string,
    gender: string,
    date_of_birth : string,
    contact: string,
    status: string,
    membership_id : string,
    membership_type: string,
    location_id : string,
    location: string,
    car_model_id : string,
    car_type:string,
    transmission_type : string,
    fuel_type : string

   
    }

export interface membershipModel{
    id : string,
    membership_type : string
}

export interface locationModel{
    membership_id : string,
    location_id : string,
    location : string
}

export interface carModel{
    id : number,
    car_type : string
}

export interface filterModel{
    membershipId : string,
    locationId : string,
    status : boolean
}

/*export interface gridData{
    rows : gridUserDataModel[]
}*/

export interface gridUserDataModel{
    user_id : string,
    first_name : string,
    last_name : string,
    email_address : string,
    membership_id : string,
    membership_type : string,
    totalCount: number,
    location : string,
    status : boolean
}


export interface grid{
    rows : [gridModel]
}

export interface gridModel{
    user_id : string,
    first_name : string,
    last_name : string,
    email_address : string,
    totalCount: number,
    membershipId : string,
    membership_type : string,
    locationId : string,
    status : boolean
}



