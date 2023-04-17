import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FcLock } from "react-icons/fc";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function login() {
    if (!email || !password) toast.error("Please Enter Email & Password");
    else {
      let user = window.localStorage.getItem(email.toLowerCase());
      if (!user) toast.error("This Email id is not Registered with us");
      else {
        user = JSON.parse(user);
        if (password != user.password)
          toast.error("Email & Password does not match");
        else {
          const valueToStore = {
            name: user.name,
            email: email,
            password: user.password,
            isLogin: true,
          };
          window.localStorage.setItem(
            "LoginUser",
            JSON.stringify(valueToStore)
          );
          toast.success("Login Successfully");
          navigate("/home");
        }
      }
    }
  }
  return (
    <div className="d-flex flex-column align-items-center">
      <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Label>
          <FcLock size={40} />
        </Form.Label>
        <br />
        <Form.Label>Log In</Form.Label>
      </Form.Group>
      <Form className="w-25">
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="align-items-end"
            type="password"
            placeholder="Password*"
          />
          <Nav.Link
            onClick={() => {
              navigate("/newuser", { state: { id: 1, name: "Akash" } });
            }}
            style={{ fontSize: "12px", color: "blue", textAlignLast: "right" }}
          >
            New user?Sign UP
          </Nav.Link>
        </Form.Group>
      </Form>
      <Button onClick={login} variant="primary" className="w-25">
        Submit
      </Button>
    </div>
  );
};

export default Login;
