import React, { useEffect, useContext, useState } from "react";
import "./Profile.css";
import {
  getUser,
  getUserAddress,
  deleteUserAddress,
  addUserAddress,
} from "../../Controller/UserController";
import { AuthContext } from "../../Auth/AuthProvider";
import Loader from "../../Components/CustomComponents/Loader";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { AddressCard } from "../../Components/CustomComponents/Cards";
import { toast } from "react-toastify";
import { AddressModal } from "../../Components/CustomComponents/modals";

const Profile = () => {
  const { userId } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [userAddress, setUserAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUserData();
    fetchUserAddress();
  }, [userId]);

  const fetchUserAddress = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    try {
      const addressResponse = await getUserAddress(userId);
      setUserAddress(addressResponse.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const onEditClick = (field) => {
    console.log(`Editing ${field}...`);
    alert(`Editing for ${field} is not implemented yet.`);
  };

  const handleAddAddress = () => {
    setIsModalOpen(true);
  };
  const handleEditAddress = (address) => {
    alert(`Editing address: ${address.streetLine1}. Not implemented yet.`);
  };

  const handleSaveAddress = async (newAddressData) => {
    const addressPayload = { ...newAddressData };
    try {
      const response = await addUserAddress(addressPayload, userId);
      if (response.success) {
        toast.success("Address added successfully!");
        fetchUserAddress();
      } else {
        toast.error("Failed to add address.");
      }
    } catch (error) {
      console.error("Failed to save address:", error);
      toast.error("Failed to save address.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDeleteAddress = async (address) => {
    try {
      const response = await deleteUserAddress(address);
      if (response.success) {
        toast.success("Address deleted successfully.");
        fetchUserAddress();
      } else {
        toast.error("Failed to delete address.");
      }
    } catch (error) {
      console.error("Failed to delete address:", error);
      toast.error("Failed to delete address.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveAddress}
      />
      <div className="profile-page-container">
        <div className="profile-card">
          <div className="profile-avatar-section">
            {userData?.imageUrl ? (
              <img
                src={userData.imageUrl}
                alt="Profile"
                className="profile-avatar-img"
              />
            ) : (
              <FaUserCircle className="profile-avatar-default" />
            )}
            <h2>{userData?.userName || "User"}</h2>
            <p>{userData?.email || "No email provided"}</p>
          </div>
          <div className="profile-details-section">
            <h3>Account Details</h3>
            <div className="info-field">
              <label>Username</label>
              <div className="info-value-container">
                <span className="info-value">{userData?.userName}</span>
                <button
                  className="edit-btn"
                  onClick={() => onEditClick("Username")}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
            <div className="info-field">
              <label>Email Address</label>
              <div className="info-value-container">
                <span className="info-value">{userData?.email}</span>
                <button
                  className="edit-btn"
                  onClick={() => onEditClick("Email")}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
            <div className="info-field">
              <label>Phone Number</label>
              <div className="info-value-container">
                <span className="info-value">
                  {userData?.phoneNo || "Not provided"}
                </span>
                <button
                  className="edit-btn"
                  onClick={() => onEditClick("Phone Number")}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
            <div className="profile-actions">
              <button className="save-changes-btn">Save Changes</button>
            </div>
          </div>
        </div>

        <div className="address-management-section">
          <div className="address-section-header">
            <h3>Manage Addresses</h3>
            <button className="add-address-btn" onClick={handleAddAddress}>
              Add New Address
            </button>
          </div>
          <div className="address-list">
            {userAddress && userAddress.length > 0 ? (
              userAddress.map((address, index) => (
                <AddressCard
                  key={index}
                  address={address}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                />
              ))
            ) : (
              <p className="no-address-msg">You have no saved addresses.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
