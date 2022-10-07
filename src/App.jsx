import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import MyNavbar from "./components/MyNavbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Purchases from "./pages/Purchases";
import { getNewsThunk } from "./store/slices/newSlice.slice";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsThunk());
  }, []);

  return (
    <HashRouter>
      <MyNavbar />
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route component={PageNotFound}/>

        <Route element={<ProtectedRoutes/>}>
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/cart" element={<Cart/>}/>
        </Route>

      </Routes>
      <Footer/>
    </HashRouter>
  );
}

export default App;
