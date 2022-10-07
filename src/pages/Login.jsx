import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import login from "../styles/login.css";
import Swal from 'sweetalert2'

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    console.log(data);
    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/users/login/",
        data
      )
      .then((res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sesión iniciada exitosamente',
          showConfirmButton: false,
          timer: 2000
        })
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          alert("Credenciales inválidas");
        }
        console.log(error.response);
      });
  };

  return (
    <div>
      <div className="containerGeneral">
        <Col>
          <Row>
            <Form onSubmit={handleSubmit(submit)} className="formContainer">
              <h3>Login</h3>
              <div className="dataForTest">
                Datos para probar.
                <br />
                Email: max@gmail.com
                <br />
                Password: pass1234
              </div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email")} 
                  className="inputForm"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Acepto las politicas de privacidad"
                  {...register("checkbox")}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="buttonform">
                Submit
              </Button>
            </Form>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default Login;
