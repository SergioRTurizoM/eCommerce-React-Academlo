import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteProductThunk, getCartThunk } from "../store/slices/cart.Slice";
import getConfig from "../utils/getConfig";
import cart from "../styles/cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { checkoutButtonThunk } from "../store/slices/purchases.slice";
import { setIsLoading } from "../store/slices/isLoading.slice";
import { useState } from "react";

const Cart = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartSlice.data?.cart.products);
  const [totalShop, setTotalShop] = useState(0)

  console.log(cart);

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const deleteProd = (id) => {
    dispatch(deleteProductThunk(id));
  };

  const checkout = () => {
    console.log("Haciendo Checkout");
    dispatch(checkoutButtonThunk());
  };

  useEffect(()=>{
    let total = 0;
    cart?.forEach(product =>{
      total += +product.price * product.productsInCart.quantity})
      setTotalShop(total)
  },[cart])

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {cart?.map((product) => (
              <ListGroup.Item key={product.id}>
                <ListGroup.Item>
                  <div className="cardCartContainer">
                    <div>
                      Artículo: {product.title}
                      <br />
                      Precio: ${product.price}
                      <br />
                      Cantidad: {product.productsInCart.quantity}
                      <br />
                      SubTotal: $
                      {product.productsInCart.quantity * product.price}
                    </div>
                    <div onClick={() => deleteProd(product.id)}> <i class="fa-solid fa-trash"></i> </div>
                  </div>
                </ListGroup.Item>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <br/>
          <b>Total Compra: $ {totalShop}</b>
   
          <br/>
          <Button onClick={checkout}>Pagar</Button>
          <br/>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Cart;
