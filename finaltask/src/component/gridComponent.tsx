import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGridApi, combined} from "../formUserDataApi/formUserDataApi";
import { gridUserDataModel, membershipModel, locationModel, gridModel } from "../interface/interface";
import { filterModel } from "../interface/interface";
import { postMembershipData } from "../formUserDataApi/formUserDataApi";
import { loadMoreData } from "../formUserDataApi/api";
import { edit } from "../formUserDataApi/formUserDataApi";
import { deleteUserData } from "../formUserDataApi/formUserDataApi";

export function GridComponent() {

    /* user_id : string,
     first_name : string,
     last_name : string,
     email_address : string,
     membership_id : number,
     membership_type : string,
     location : string,
     status : boolean*/

    const gridDetails = {
        user_id: "",
        first_name: "",
        last_name: "",
        email_address: "",
        membershipId: "",
        totalCount: 0,
        membership_type: "",
        locationId: "",
        status: true
    }

    const navigate = useNavigate();
    const [gridData, setGridData] = useState<gridUserDataModel[]>([]);
    // const [gridDatas, setGridDatas] = useState<gridModel>(gridDetails)
    const [totalCount, setTotalCount] = useState<number>();
    const [selectedMembership, setSelectedMembership] = useState<string | null>(null);

    console.log(gridDetails)

    //const []
    const [searchValue, setSearchValue] = useState<string>("");
    const [membershipDropdown, setMembershipDropdown] = useState<membershipModel[]>([]);
    const [locationDropdown, setLocationDropdown] = useState<locationModel[]>([])
    const [sortData, setSortData] = useState({
        column: "first_name",
        order: "asc"
    })


    const [filterData, setFilterData] = useState({
        membershipId: "",
        locationId: "",
        status: ""
    }
    )

    const [hideOrShow, setHideOrShow] = useState(true);
    const [loadMore, setLoadMore] = useState<number>(7);

    //[PC_6]
    useEffect(() => {
        InitialLoadGrid();
    }, [])

    // useEffect(() => {
    //     filterData.membershipId && Cascading()
    // }, [filterData.membershipId])

    // [PC_23] to [PC_25]

    const handleSearch = (event: any) => {
        setSearchValue(event.target.value)
        if (event.charCode === 13) {

            InitialLoadGrid()
        }
        InitialLoadGrid()

        console.log(gridData)


    }
    console.log(gridData)

    // [PC_30] to [PC_33]
    const handleSort = (column: string) => {
        let order = "desc";
        if (sortData.column === column && sortData.order === "desc") {
            order = "asc"
        }
        setSortData({ column: column, order: order })

        InitialLoadGrid();
    }

    // [PC_7] to [PC_12]
    const InitialLoadGrid = async () => {

        const payload = {
            search: searchValue,
            filter: filterData,
            sort: sortData,
            loadMore: loadMore,

        }
        console.log(payload);

        let submitGrid = await getGridApi(payload);
        const combinedDropdown = await combined();
        console.log("SubmitGrid", submitGrid)
        if (submitGrid.status === 200) {
            setGridData(submitGrid.data)
            setTotalCount(submitGrid.totalCount[0])
            setMembershipDropdown(combinedDropdown.membership)
            setLocationDropdown(combinedDropdown.location)
            console.log("Success grid")
        }
        else{
            console.log("Error")
        }
        // if (membershipApi.status === 200) {
        //     setMembershipDropdown(membershipApi.data)
        // }
        // else{
        //     console.log("Error")
        // }
    }

    console.log("total---", totalCount)

    const editApi = async (id: string) => {
        const payload = { id: id };
        console.log(payload)
        try {
            const response = await edit(payload);
            if (response) {
                // Navigate to another component and pass the response data
                 navigate('/', { state: response.data[0]});
                console.log("editApi", response.data);
            }
        } catch (error) {
            console.error("Error editing user data:", error);
        }
    }

        const deleteData = async (id : string) => {
        let payload = {
            id: id        
        }
        console.log(payload,"---------------")
        let deleteData = await deleteUserData(payload);

        if (deleteData.status === 200) {
            alert("deletedSuccessfully")
        }
        else {
            alert("Not deleted")
        }
        InitialLoadGrid()
    }



    //[PC_52] to [PC_55]
    const bindMembership = () => {
        return membershipDropdown.map((data) => (
            <option key={data.id} value={data.id}>
                {data.membership_type}
            </option>
        ));
    };

    //[PC_56] to [PC_59]
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


    // [PC_45] to [PC_51]
    const Cascading = async () => {
        let cascading = await postMembershipData({ id: filterData.membershipId });
        if (cascading.status == 200) {
            setLocationDropdown(cascading?.data)
        }
        else {
            console.log("Api failed")
        }
    }

    // [PC_13] to [PC_22]
    const bindGridData = () => {
        return gridData.map((data: any) => <tr key={data.id}>
            <td onChange={onChangeData}>{data.id}</td>
            <td onChange={onChangeData}>{data.first_name}</td>
            <td onChange={onChangeData}>{data.last_name}</td>
            <td onChange={onChangeData}>{data.email_address}</td>
            <td onChange={onChangeData}>{data.membership_type}</td>
            <td onChange={onChangeData}>{data.location}</td>
            <td onChange={onChangeData}>{data.status ? "Active" : "Inactive"}</td>

            {/* [PC_40] to [PC_41] */}
            {/* <td><button onClick={()=>deleteData(data.id)}>Delete</button></td>  */}
            {/* <td><button className={"grid-filter-toggle"} onClick={() => navigate('/', { state: data })}>Edit</button></td> */}
            <td><button className={"grid-filter-toggle"} onClick={() => editApi(data.id)} >Edit</button></td>


        </tr>)
    }

    //[PC_43] to [PC_44]

    const onChangeData = (event: any) => {
        const id = event.target.id
        const value = event.target.value

       // setGridDatas({ ...gridDatas, [id]: value })
        //setSelectedMembership(value)
        setFilterData({...filterData, [id]: value})
    }
    //console.log("GridDatas",gridDatas)

    //[PC_27] to [PC_29]

    const onChangeFilter = (event: any) => {
        const id = event.target.id
        const value = event.target.value
        // setGridDatas({ ...gridDatas, [id]: value })
        setSelectedMembership(value)
        setFilterData({ ...filterData, [id]: value })

    }

    //[PC_45]
    const onApplyFilter = (event: any) => {

        InitialLoadGrid()
    }
    const onCancelFilter = () => {
        setHideOrShow(true);
        setFilterData({ membershipId: "", locationId: "", status: "" });
        InitialLoadGrid();
    }

    // [PC_34] to [PC_39]

    const handleLoadmore = async () => {
        //debugger;
        setLoadMore((prev) => prev + 7)
        const payload = {
            search: searchValue,
            filter: filterData,
            sort: sortData,
            loadMore: loadMore + 7
        }

        let submitGrid = await getGridApi(payload);

        if (submitGrid.status === 200) {



            setGridData(gridData.concat(submitGrid.data))

            console.log("Loaded")


        }
        //InitialLoadGrid()
    }
    return (
        <>
            <div className="grid-container">
                <div className="grid-header">
                    <h2>Manage Customers</h2>
                    <div className="grid-header">
                        <input onChange={(event) => { handleSearch(event) }} onKeyPress={handleSearch} className="grid-search-input" />

                        <button type="submit" className="grid-filter-toggle" onClick={() => setHideOrShow(!hideOrShow)}>
                            Advanced Filter
                        </button>
                        <div className="" hidden={hideOrShow}>
                            <select onChange={onChangeFilter} id="membershipId" value={filterData.membershipId}>
                                <option value={0}>Select</option>
                                {bindMembership()}
                            </select>
                            <select onChange={onChangeData} id="locationId" value={filterData.locationId}>
                                <option value={0}>Select</option>
                                {bindLocation()}
                            </select>
                            <select onChange={onChangeFilter} id="status" value={filterData.status}>
                                <option value={0}>Select</option>
                                <option value={"Active"}>Active</option>
                                <option value={"Inactive"}>Inactive</option>
                            </select>
                            <div>
                                <button onClick={onCancelFilter}>Cancel</button>
                                <button onClick={onApplyFilter}>Apply Filter</button>
                            </div>
                        </div>
                        <button className="grid-new-customer-btn" onClick={() => { navigate('/') }}>
                            New Customer
                        </button>
                    </div>
                </div>
                <table className="grid-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("id")}>User ID<span>{sortData.column === "id" && sortData.order === "asc" ? '⬆️' : '⬇️'}</span></th>
                            <th onClick={() => handleSort("first_name")}>First name<span>{sortData.column === "first_name" && sortData.order === "asc" ? '⬆️' : '⬇️'}</span></th>
                            <th onClick={() => handleSort("last_name")}>Last name<span>{sortData.column === "last_name" && sortData.order === "asc" ? '⬆️' : '⬇️'}</span></th>
                            <th>Email address</th>
                            <th>Membership</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {bindGridData()}

                    </tbody>
                </table>
                {totalCount != gridData.length ? <button className="grid-search-btn" onClick={handleLoadmore}>Load More</button> : ""}
                {/* <button onClick={() => navigate('/', {state: {st}})}>next</button> */}

            </div>
        </>
    );

}

