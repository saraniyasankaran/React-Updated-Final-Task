import React, { useEffect } from "react";
import { useState } from "react";
import { combined, getcarModel, postMembershipData } from "../formUserDataApi/formUserDataApi";
import { formModel, membershipModel, locationModel, carModel } from "../interface/interface";
import { postUserData } from "../formUserDataApi/api";
import { useLocation } from "react-router-dom";


export function FormUserDataComponent() {

    //[PC_3] to [PC_10]
    const [membershipDropdown, setMembershipDropdown] = useState<membershipModel[]>([])
    const [locationDropdown, setLocationDropdown] = useState<locationModel[]>([])
    const [carModelDropdown, setCarModelDropdown] = useState<carModel[]>([])
    const [selectedMembership, setSelectedMembership] = useState<string | null>(null);

    const location = useLocation();
    //console.log(location ,"location")


    const formDetails = {
        id: "",
        first_name: "",
        last_name: "",
        email_address: "",
        gender: "",
        date_of_birth: "",
        contact: "",
        status: "",
        membership_id: "",
        membership_type: "",
        location_id: "",
        location: "",
        car_model_id: "",
        car_type: "",
        transmission_type: "",
        fuel_type: ""
    }


    const [formData, setFormData] = useState<formModel>(formDetails)
    const [formDataValidation, setFormDataValidation] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email_address: "",
        gender: "",
        date_of_birth: "",
        contact: "",
        status: "",
        membership_id: "",
        location_id: "",
        car_model_id: "",
        transmission_type: "",
        fuel_type: ""

    });
    const id = formData.membership_id
    useEffect(() => {
        getInitialLoad()
        console.log("state")
        console.log(location.state)
        if (location.state) {
            console.log("True")
            setFormData((prev) => ({
                ...prev,
                id: location.state.id,
                first_name: location.state.first_name,
                last_name: location.state.last_name,
                email_address: location.state.email_address,
                date_of_birth: dateConverter(location.state.date_of_birth),
                gender: location.state.gender,
                contact: location.state.contact,
                status: location.state.status?"Active":"Inactive",
                membership_id: location.state.membership_id,
                membership_type: location.state.membership_type,
                location_id: location.state.location_id,
                location: location.state.location,
                car_model_id: location.state.car_model_id,
                car_type: location.state.car_type,
                transmission_type: location.state.transmission_type,
                fuel_type: location.state.fuel_type
            }))
        }
    }, [])
    console.log("Form-------", formData)

    // useEffect(() => {
    //     formData.membership_id && submitMembershipData()
    // }, [formData.membership_id])

    // [PC_47] to [PC_61]
    function dateConverter(input: any) {
        let date = new Date(input);
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
        // return new Date(input);
    }

    const submitData = async () => {
        if (userDataValidation()) {

            let payload = {
                id: formData.id,
                first_name: formData.first_name,
                last_name: formData.last_name,
                email_address: formData.email_address,
                gender: formData.gender,
                date_of_birth: dateConverter(formData.date_of_birth),
                contact: formData.contact,
                status: formData.status == "Active" ? true : false,
                membership_id: (formData.membership_id),
                location_id: (formData.location_id),
                car_model_id: (formData.car_model_id),
                transmission_type: formData.transmission_type,
                fuel_type: formData.fuel_type,
            }
            //console.log(payload, "req")
            let submitData = await postUserData(payload);

            if (submitData.status === 200) {
                alert("Successfully form is submitted")
                setFormData(formDetails)
            }
            else {
                alert("Form is not submitted")
            }
        }

    }


    const getInitialLoad = async () => {
        // console.log("first")
        const combinedDropdown = await combined();

        //console.log(membershipApi)
        //console.log("membershipApi",membershipApi.data)
        if (combinedDropdown?.status === 200) {
            //console.log("last")
            setMembershipDropdown(combinedDropdown.membership)
            setLocationDropdown(combinedDropdown.location);
            setCarModelDropdown(combinedDropdown.carodel)
            
        }
        else{
            console.log(combinedDropdown.status)
        }
    }





    const userDataValidation = () => {
        const { first_name, last_name, email_address, gender, date_of_birth, contact, status, membership_id, membership_type, location_id, location, car_model_id, car_type, transmission_type, fuel_type } = formData;
        let valid = true;

        const cloneDetails = {
            id: "",
            first_name: "",
            last_name: "",
            email_address: "",
            gender: "",
            date_of_birth: "",
            contact: "",
            status: "",
            membership_id: "",
            membership_type: "",
            location_id: "",
            location: "",
            car_model_id: "",
            car_type:"",
            transmission_type: "",
            fuel_type: ""
        };

        const alphaRegex = /^[a-zA-Z]*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (!first_name.trim() || !alphaRegex.test(first_name)) {
            cloneDetails.first_name = "Please enter a valid first name";
            valid = false;
        }

        if (!last_name.trim() || !alphaRegex.test(last_name)) {
            cloneDetails.last_name = "Please enter a valid last name";
            valid = false;
        }

        if (!email_address.trim() || !emailRegex.test(email_address)) {
            cloneDetails.email_address = "Please enter a valid email address";
            valid = false;
        }

        if (!contact.trim() || !contactRegex.test(contact)) {
            cloneDetails.contact = "Please enter a valid contact number";
            valid = false;
        }

        if (!date_of_birth) {
            cloneDetails.date_of_birth = "Please select a date of birth";
            valid = false;
        }

        if (!gender) {
            cloneDetails.gender = "Please select a gender";
            valid = false;
        }

        if (!membership_id) {
            cloneDetails.membership_id = "Please select a membership type";
            valid = false;
        }

        if (!location_id) {
            cloneDetails.location_id = "Please select a location";
            valid = false;
        }

        if (!car_model_id) {
            cloneDetails.car_model_id = "Please select a car model";
            valid = false;
        }

        if (!status) {
            cloneDetails.status = "Please select a status";
            valid = false;
        }

        if (!transmission_type) {
            cloneDetails.transmission_type = "Please select a transmission type";
            valid = false;
        }

        if (!fuel_type) {
            cloneDetails.fuel_type = "Please select a fuel type";
            valid = false;
        }

        setFormDataValidation(cloneDetails);
        return valid;
    };

    //[PC_91] to [pc_93]
    const submitMembershipData = async () => {

        let cascading = await postMembershipData({ id: (formData.membership_id) });
        if (cascading.status == 200) {
            setLocationDropdown(cascading?.data)
        }
        else {
            console.log("Error")
        }

    }

    //[PC_42] to [PC_46]
   
    const bindMembership = () => {
        return membershipDropdown.map((data) => (
            <option key={data.id} value={data.id}>
                {data.membership_type}
            </option>
        ));
    };

    const bindLocation= () => {
        const filteredLocations = selectedMembership ? locationDropdown.filter(data => data.membership_id === selectedMembership) : [];
        return (
            <>
                    {filteredLocations.map((data) => (
                        <option key={data.location_id} value={data.location_id}>
                            {data.location}
                        </option>
                    ))}
            </>
        );
    };


    // const bindLocation = () => {
    //     return locationDropdown.map((element) => <option key={element.location_id} value={element.location_id}>{element.location}</option>)
    // }
    const bindCarModel = () => {
        return carModelDropdown.map((data) => <option key={data.id} value={data.id}>{data.car_type}</option>)
    }

    // [PC_11] To [PC_28]

    const onChangeDetails = (event: any) => {
        const id = event.target.id;
        const value = event.target.value;
        const alphaRegex = /^[a-zA-Z]*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

        let errorMessage = "";

        if (id === "first_name") {
            if (!alphaRegex.test(value)) {
                errorMessage = "Firstname must contain only letters";
            }
        }

        if (id === "last_name") {
            if (!alphaRegex.test(value)) {
                errorMessage = "Lastname must contain only letters";
            }
        }
        if (id === "email_address" && !emailRegex.test(value)) {
            errorMessage = "Invalid email format";
        }

        if (id === "contact" && !contactRegex.test(value)) {
            errorMessage = "Invalid contact number";
        }

        if (id === "date_of_birth") {
            setFormData({
                ...formData,
                date_of_birth: dateConverter(value)
            });
        }

        if (id === "location_id" || id === "car_model_id") {
            console.log(id,"membershipid")
            setFormData({
                ...formData,
                [id]: value
            });        
        } 
        if(id === "membership_id"){
            setFormData({
                ...formData,
                [id] : value
            })
            setSelectedMembership(value)
        }

        setFormData({
            ...formData,
            [id] : value
        })

        // Set validation error message
        setFormDataValidation({
            ...formDataValidation,
            [id]: errorMessage
        });
    };
     console.log("formData---",formData)

    return (
        <>
            <div className="parent-container">
                <h2>Basic Information</h2>
                <div className="sub-parent">
                    <div className="child-container">
                        <label className="label-text">First Name<span>*</span></label>
                        <input type="text" className="input-text" name="first_name" placeholder="Enter First Name" id="first_name" onChange={onChangeDetails} value={formData.first_name} />
                        <span>{formDataValidation.first_name}</span>
                    </div>
                    <div className="child-container">
                        <label className="label-text">Last Name<span>*</span></label>
                        <input type="text" className="input-text" placeholder="Enter Last Name" id="last_name" onChange={onChangeDetails} value={formData.last_name} />
                        <span>{formDataValidation.last_name}</span>
                    </div>
                    <div className="child-container">
                        <label className="label-text">Email Address<span>*</span></label>
                        <input type="text" className="input-text" placeholder="Enter email address" id="email_address" onChange={onChangeDetails} value={formData.email_address} />
                        <span>{formDataValidation.email_address}</span>
                    </div>
                </div>
                <div className="sub-parent">
                    <div className="child-container">
                        <label className="label-text">Gender<span>*</span></label>
                        <input type="radio" name="gender" value={"Male"} id="gender" onChange={onChangeDetails} checked={formData.gender === "Male"} />
                        <label htmlFor="Gender">Male</label>
                        <input type="radio" name="gender" value={"Female"} id="gender" onChange={onChangeDetails} checked={formData.gender === "Female"} />
                        <label htmlFor="Gender">Female</label>
                        <span>{formDataValidation.gender}</span>
                    </div>
                    <div className="child-container">
                        <label className="label-text">Date of Birth<span>*</span></label>
                        <input type="date" id="date_of_birth" className="input-text" placeholder="YYYY-MM-DD" onChange={onChangeDetails} value={formData.date_of_birth}/>
                        <span>{formDataValidation.date_of_birth}</span>
                    </div>
                    <div className="child-container">
                        <label className="label-text">Contact<span>*</span></label>
                        <input type="text" className="input-text" placeholder="Enter Contact Number" id="contact" onChange={onChangeDetails} value={formData.contact} />
                        <span>{formDataValidation.contact}</span>
                    </div>
                </div>
                <div className="sub-parent">
                    <div className="child-container">
                        <label className="label-text">Status</label>
                        <input type="radio" name="status" id="status" value={"Active"} onChange={onChangeDetails} checked={formData.status === "Active"} />
                        <label htmlFor="Active">Active</label>
                        <input type="radio" name="status" id="status" value={"Inactive"} onChange={onChangeDetails} checked={formData.status === "Inactive"} />
                        <label htmlFor="inactive">Inactive</label>
                        <span>{formDataValidation.status}</span>
                    </div>
                    <div className="child-container">
                        <label className="label-text" htmlFor="job">Membership</label>
                        <select className="input-text" id="membership_id" value={formData.membership_id} onChange={onChangeDetails}>
                            <option value={0}>Select</option>
                            {bindMembership()}
                        </select>
                        <span>{formDataValidation.membership_id}</span>
                    </div>
                    <div className="child-container">
                        <label className="label-text" htmlFor="location">Location</label> 
                         <select className="input-text" id="location_id" name="location" value={formData.location_id} onChange={onChangeDetails}>
                            <option value={0}>Select</option>
                            {bindLocation()}

                        </select>
                        <span>{formDataValidation.location_id}</span>
                    </div>
                </div>
                <div className="sub-parent">
                    <div className="child-container">
                        <label className="label-text" htmlFor="car">Car Details</label>
                        <select className="input-text" name="car" id="car_model_id" value={formData.car_model_id} onChange={onChangeDetails}>
                            <option value={0}>Select</option>
                            {bindCarModel()}
                        </select>
                        <span>{formDataValidation.car_model_id}</span>
                    </div>
                    <div className="child-container">
                        <label className="label-text">Transmission Type</label>
                        <input type="radio" name="Transmission" id="transmission_type" value={"Manual"} onChange={onChangeDetails} checked={formData.transmission_type === "Manual"} />
                        <label htmlFor="manual">Manual</label>
                        <input type="radio" name="Transmission" id="transmission_type" value={"Automatic"} onChange={onChangeDetails} checked={formData.transmission_type === "Automatic"} />
                        <label htmlFor="inactive">Automatic</label>
                        <span>{formDataValidation.transmission_type}</span>
                    </div>
                    <div className="child-container">
                        <label className="label-text">Fuel Type</label>
                        <input type="radio" name="Fuel" id="fuel_type" value={"Petrol"} onChange={onChangeDetails} checked={formData.fuel_type === "Petrol"} />
                        <label htmlFor="manual">Petrol</label>
                        <input type="radio" name="Fuel" id="fuel_type" value={"Diesel"} onChange={onChangeDetails} checked={formData.fuel_type === "Diesel"} />
                        <label htmlFor="inactive">Diesel</label>
                        <span>{formDataValidation.fuel_type}</span>
                    </div>
                </div>
                <div className="btn">
                    <button className="form-component-btn" onClick={() => setFormData(formDetails)}>CANCEL</button>
                    <button onClick={submitData} className="form-component-btn">SUBMIT</button>
                </div>
            </div>
        </>
    )
}