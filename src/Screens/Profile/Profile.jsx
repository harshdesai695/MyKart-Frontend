import React, { useEffect, useContext, useState } from "react";
import "./Profile.css";
import { getUser } from "../../Controller/UserController";
import { AuthContext } from "../../Auth/AuthProvider";
import Loader from "../../Components/CustomComponents/Loader";
import { FaUserCircle, FaEdit } from 'react-icons/fa'; // Icons for UI

const Profile = () => {
  const { userId } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await getUser(userId);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const onEditClick = (field) => {
    // In a real app, you would set state to enable an input field
    console.log(`Editing ${field}...`);
    alert(`Editing for ${field} is not implemented yet.`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        {/* Left Section: Avatar */}
        <div className="profile-avatar-section">
          {userData?.imageUrl ? (
            <img src={userData.imageUrl} alt="Profile" className="profile-avatar-img" />
          ) : (
            <FaUserCircle className="profile-avatar-default" />
          )}
          <h2>{userData?.userName || 'User'}</h2>
          <p>{userData?.email || 'No email provided'}</p>
        </div>

        {/* Right Section: Details */}
        <div className="profile-details-section">
          <h3>Account Details</h3>
          <div className="info-field">
            <label>Username</label>
            <div className="info-value-container">
              <span className="info-value">{userData?.userName}</span>
              <button className="edit-btn" onClick={() => onEditClick('Username')}>
                <FaEdit />
              </button>
            </div>
          </div>

          <div className="info-field">
            <label>Email Address</label>
            <div className="info-value-container">
              <span className="info-value">{userData?.email}</span>
              <button className="edit-btn" onClick={() => onEditClick('Email')}>
                <FaEdit />
              </button>
            </div>
          </div>

          <div className="info-field">
            <label>Phone Number</label>
            <div className="info-value-container">
              <span className="info-value">{userData?.phoneNo}</span>
              <button className="edit-btn" onClick={() => onEditClick('Phone Number')}>
                <FaEdit />
              </button>
            </div>
          </div>
          
          <div className="profile-actions">
              <button className="save-changes-btn">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;