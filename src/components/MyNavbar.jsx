import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cart from "./Cart";
import { useDispatch } from "react-redux";
import { getCart } from "../store/slices/cart.Slice";
import logo from '../assets/imagesCarrusel/logo.png'
import navbar from '../styles/navbar.css'

const MyNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
    dispatch(getCart([]))
  };

  return (
    <div>
      <>
        <Navbar  collapseOnSelect expand="md" bg-light navbar-light variant="light" className="navbartotal">
          <Container>
            <Navbar.Brand href="/home"><img src={logo} className='logo' /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" >
              <Nav className="me-auto barComplete">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/purchases">
                  Purchases
                </Nav.Link>
                <Nav.Link onClick={handleShow}>
                <i class="fa-solid fa-cart-arrow-down"></i>
                </Nav.Link>
                <Nav.Link onClick={logout}><i class="fa-solid fa-arrow-right-from-bracket"></i></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Cart show={show} handleClose={handleClose} />
      </>
    </div>
  );
};

export default MyNavbar;
