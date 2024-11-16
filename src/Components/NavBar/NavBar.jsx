import React, { useContext } from 'react'
import './NavBar.css'
import { PrimaryButton, DropDownButton } from '../CustomComponents/CustomButtons'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthProvider'

const NavBar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const menuItems = ['Profile', 'WishList', 'Cart', 'Orders']

    const handleOnClick = (pid) => {
        navigate('./Login', { state: { pid } });
    }

    const handleLogout = () => {
        logout();
        navigate('./');
    }

    const handleMenuClick = (item) => {
        // console.log("Clicked item:", item); 
        // let navigatePageName = '/' + item;
        // console.log(navigatePageName)
        navigate('/' + item)
    };

    return (
        <nav className="Navbar">
            <div className="prefix-container">
                <div className="MyKart-Logo">
                    MyKart
                </div>
            </div>
            <div className="middle-container">

            </div>
            <div className="suffix-container">

                {isLoggedIn ?
                    <>  
                        <DropDownButton menuItems={menuItems} onClick={handleMenuClick} />
                        <PrimaryButton lable={"Logout"} onClick={handleLogout} />
                    </>
                    :
                    
                    <>
                        <PrimaryButton lable={"SignUp"} onClick={() => handleOnClick('signup')} />
                        <span>|</span>
                        <PrimaryButton lable={"Login"} onClick={() => handleOnClick('login')} />
                    </>
                }
            </div>
        </nav>
    )

}

export default NavBar
