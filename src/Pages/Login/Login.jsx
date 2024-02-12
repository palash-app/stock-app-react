import React from "react";
import "./login.css";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// {
//    username: 'kminchelle',
//    password: '0lelplR',
// }

const Login = () => {
  const navigate = useNavigate();

  const loginByid = async value => {
    try {
      // const response = await axios.post(
      //   "https://dummyjson.com/auth/login",
      //   value
      // );
      localStorage.setItem("token", "this is a token");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("enter username"),
      password: Yup.string().required("enter password"),
    }),
    onSubmit: values => {
      loginByid(values);
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center login-box-container">
      <div className="login">
        <div className="login-img">
          <img src="/img/graph.svg" alt="graph" />
        </div>
        <div className="login-box">
          <h1 className="text-center text-primary">Sign In</h1>
          <br />
          <br />
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label column htmlFor="name">
                USERNAME:
              </Form.Label>
              <Form.Control
                type="text"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="password">PASSWORD:</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Form.Group>

            <div className="d-flex mt-3 mb-2">
              <Button className="w-100" variant="primary" type="submit">
                Sign In
              </Button>
            </div>
            <div className="d-flex justify-content-between">
              <Form.Group className="mb-2">
                <Form.Check checked label="Remember Me"></Form.Check>
              </Form.Group>
              <p>Forgot password?</p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
