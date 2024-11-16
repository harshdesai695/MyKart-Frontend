import React, { useEffect, useContext, useState } from 'react'
import './Profile.css'
import { getUser } from '../../Controller/UserController'
import { AuthContext } from '../../Auth/AuthProvider'
import Loader from '../../Components/CustomComponents/Loader'
import { EditIconButton } from '../../Components/CustomComponents/CustomButtons'



const Profile = () => {

    const { userId } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        getuserData();
    }, [])

    const onEditClick = (value) => {
        console.log("click", value)
    }

    const getuserData = () => {
        let res = getUser(userId);
        res.then((data) => {
            console.log("data", data.data)
            setUserData(data.data);
        })
    }

    return (
        <div className='Profile-Page'>
            <div className="Profile-Container">
                <div className="Profile-details">
                    {userData !== null ? (
                        <>
                            <div className="Profile-detail-item">
                                User-Name: {userData.userName}
                                <div className="edit-icon">
                                    <EditIconButton onClick={() => onEditClick(userData.userName)} />
                                </div>
                            </div>
                            <div className="Profile-detail-item">
                                Email : {userData.email}
                                <div className="edit-icon">
                                    <EditIconButton onClick={() => onEditClick(userData.email)} />
                                </div>
                            </div>
                            <div className="Profile-detail-item">
                                PhoneNo : {userData.phoneNo}
                                <div className="edit-icon">
                                    <EditIconButton onClick={() => onEditClick(userData.email)} />
                                </div>
                            </div>
                        </>
                    ) : <Loader />

                    }

                </div>

            </div>
        </div>
    )
}

export default Profile
