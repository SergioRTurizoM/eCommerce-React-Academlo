import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import productDetails from '../styles/productDetails.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { addFavoriteThunk } from '../store/slices/purchases.slice';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const ProductDetail = () => {

    const {id} = useParams();
    const newProduct = useSelector(state=> state.products.data?.products)
    const productsDetail = newProduct?.find((products) => products.id === Number(id));
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(5)

    console.log(newProduct);
    console.log(productsDetail);

    const filterSimilar = newProduct?.filter((similar)=>{
        return similar.category.id === productsDetail.category.id
    })    

    console.log(filterSimilar);

    useEffect(()=>{
      setQuantity(5)
    }, [id])


 const addFavorite = () => {
  console.log("Agregando a favorito");
    const favorite = {
      id: id,
      quantity: quantity
    }
    dispatch(addFavoriteThunk(favorite))
 }

    return (
      <div>
        <div className='cardContainerProd'>
          
        <Card>
        <Card.Title>{productsDetail?.title}</Card.Title>
        <p>${productsDetail?.price}</p>
        <Card.Img variant="top" src={productsDetail?.productImgs} className='imageProductBig'  />
        <Card.Text className="cardText">
                      {productsDetail?.description}
                    </Card.Text>
        <div className='quantity'>
          <Button variant="outline-dark" onClick={()=>setQuantity(quantity - 1)}> <i class="fa-solid fa-minus"></i> </Button>
          {quantity}
          <Button variant="outline-dark" onClick={()=>setQuantity(quantity + 1)}> <i class="fa-solid fa-plus"></i> </Button>
          <br/>
          <br/>

          <Button className='buttonCallToAction' onClick={addFavorite}>Agregar al carrito</Button>{' '}
        </div>

        <br/>
        <br/>
      
        </Card>
        </div>


            <h2>Ver productos similares</h2>

        <br/>
        <Container>
            <Row>
            {filterSimilar?.map((similares)=>(
                <Col className='similarCard' key={similares.id}>
                <Link to={`/products/${similares.id}`}>
                    <h6>{similares.title}</h6>
                    <img src={similares.productImgs} alt="" />
                </Link>
                </Col>
            ))}
            </Row>
        </Container>

            <br/>
            <br/>

      </div>
    );
  };
  


export default ProductDetail;