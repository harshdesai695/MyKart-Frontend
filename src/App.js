import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Screens/Home/Home";
import Login from "./Screens/Login/Login";
import AuthProvider from "./Auth/AuthProvider";
import WishListPage from "./Screens/WishList/WishListPage";
import Profile from "./Screens/Profile/Profile";
import Cart from "./Screens/Cart/Cart";
import SearchPage from "./Screens/Search/SearchPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductPage from "./Screens/Product/ProductPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route path="/Home" element={<Home />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/WishList" element={<WishListPage />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/Cart" element={<Cart />}></Route>
            <Route path="/ProductPage" element={<ProductPage />}></Route>
            <Route path="/SearchPage" element={<SearchPage />}></Route>
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
