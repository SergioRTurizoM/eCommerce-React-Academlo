import React from 'react';
import home from '../styles/home.css'
import one from "../assets/imagesCarrusel/one.png"
import two from "../assets/imagesCarrusel/two.png"
import three from "../assets/imagesCarrusel/three.png"
import four from '../assets/imagesCarrusel/four.png'
import Carousel from 'react-bootstrap/Carousel';


const Carrusel = () => {
    return (
        <Carousel>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src={one}
            alt="First slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src={two}
            alt="Second slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src={three}
            alt="Third slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src={four}
            alt="Fourth slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
};

export default Carrusel;