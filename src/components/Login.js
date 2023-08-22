import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FcLock } from "react-icons/fc";
import Nav from "react-bootstrap/Nav";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import UserContext from "./userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const usercontext = React.useContext(UserContext); //https://linked-in-b-tfww.vercel.app/
  const baseURL = "https://linked-in-b-tfww.vercel.app";
  // const baseURL = "http://localhost:3001";
  function login() {
    if (!email || !password) toast.error("Please Enter Email & Password");
    else {
      fetch(`${baseURL}/user/isEmailExist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase() }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (!data.isExist)
            toast.error("This Email id is not Registered with us");
          else {
            fetch(`${baseURL}/user/loginUser`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            })
              .then((res) => res.json())
              .then((data) => {
                // console.log(data);
                if (!data.token) toast.error("Email & Password does not match");
                else {
                  toast.success("Login Successfully");
                  usercontext.setToken(`Bearer ${data.token}`);
                  usercontext.setUserId(data.id);
                  usercontext.setUserName(data.name.toUpperCase());
                  navigate("/home");
                }
              })
              .catch((err) => {
                toast.error("Something Error Occurred", err);
              });
          }
        });
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
          <Form.Label>Email Id</Form.Label>
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
