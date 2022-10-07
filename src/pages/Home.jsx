import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { InputGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";
import Carrusel from "../components/Carrusel";

const Home = () => {
  const navigate = useNavigate();
  const productList = useSelector((state) => state.products.data?.products);
  const [categories, setCategories] = useState([]);
  const [productFiltered, setProductFiltered] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");

  const dispatch = useDispatch();

  console.log(productFiltered);
  console.log(searchProducts);

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories))
      .catch((error) => console.log(error));
  }, []);

  //   console.log(categories);

  //   console.log(productList);

  useEffect(() => {
    setProductFiltered(productList);
  }, [productList]);

  const filterCategory = (categoryId) => {
    const filtered = productList?.filter(
      (products) => products.category.id === categoryId
    );
    setProductFiltered(filtered);
  };

  //   console.log(productFiltered);

  const searchProduct = () => {
    dispatch(setIsLoading(true));
    const filtered = productList.filter((products) =>
      products.title.toLowerCase().includes(searchProducts.toLowerCase())
    );
    console.log(filtered);
    setProductFiltered(filtered);
    dispatch(setIsLoading(false));
  };

  return (
    <div>
      <Carrusel />
      <div className="categoriesContainer">
        {categories?.map((category) => (
          <div
            className="buttonCategories"
            key={category.id}
            onClick={() => {
              filterCategory(category.id);
            }}
          >
            {category.name}
          </div>
        ))}
      </div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Buscar artículo"
          onChange={(e) => setSearchProducts(e.target.value)}
          value={searchProducts}
        />
        <Button variant="outline-secondary" onClick={searchProduct}>
          Buscar
        </Button>
      </InputGroup>

      <div className="container">
        <ul className="productListContainer">
          {productFiltered?.map((products) => (
            <div
              key={products.id}
              onClick={() => navigate(`/products/${products.id}`)}
            >
              <Col className="cardcontainer">
                <Card className="cardProduct">
                  <Card.Img
                    variant="top"
                    src={products.productImgs[0]}
                    className="imageCard"
                  />
                  <Card.Body className="cardBody">
                    <Card.Title className="cardTitle">
                      {products.title}
                    </Card.Title>
                   
                    <Card.Text className="cardPrice">
                      $ {products.price}
                    </Card.Text>
                    <Button variant="outline-secondary" className="buttonViewMore">Ver Más</Button>
                  </Card.Body>
                  
                </Card>
              </Col>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
