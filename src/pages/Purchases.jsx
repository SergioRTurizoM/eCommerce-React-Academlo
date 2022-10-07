import React from 'react';
import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import purchasesSlice, { getPurchasesThunk } from '../store/slices/purchases.slice';
import purchasesStyle from '../styles/purchasesStyle.css'


const Purchases = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const purchases = useSelector(state => state.purchasesSlice.data?.purchases)

    console.log(purchases);

    useEffect(()=>{
        dispatch(getPurchasesThunk())
    },[])

    return (
        <div>
            <br/>
            <h3>Historial de tus compras</h3>
            <ListGroup className='listPurchases'>
                {
                    purchases?.map(purchase => (
                        <ListGroup.Item key={purchase.id}  >
                            <h6>Compra Factura No {purchase.id} - 
                            Creada el: {purchase.createdAt}</h6>
                            <ListGroup.Item>
                                {
                                    purchase.cart.products?.map(prod=>(
                                        <ListGroup.Item onClick={() => navigate(`/products/${prod.id}`)} key={prod.id}>
                                            {prod.title}
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup.Item>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>

        </div>
    );
};

export default Purchases;