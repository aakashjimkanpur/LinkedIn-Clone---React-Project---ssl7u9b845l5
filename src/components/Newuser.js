import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FcLock } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Newuser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function submit() {
    if (!name || !email || !password || !confirmPassword)
      toast.error("All Fields are required");
    else {
      if (
        password != confirmPassword ||
        password.length < 8 ||
        !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        if (password != confirmPassword)
          toast.error("Password & Confirm Password should be same");
        if (
          !password.match(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
          )
        )
          toast.error(
            "Password should have 8 to 15 characters whith at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
          );
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
          toast.error("Please Enter valid Email");
      } else {
        const isExist = window.localStorage.getItem(email.toLowerCase());
        if (isExist) toast.error("This Email id is Already Registered with us");
        else {
          const valueToStore = { name: name, password: password };
          window.localStorage.setItem(
            email.toLowerCase(),
            JSON.stringify(valueToStore)
          );
          toast.success("User Created Successfully, Please login");
          navigate("/login");
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
        <Form.Label>Details</Form.Label>
      </Form.Group>
      <Form className="w-25">
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter Name"
          />
        </Form.Group>
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
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className="align-items-end"
            type="password"
            placeholder="Confirm Password*"
          />
        </Form.Group>
      </Form>
      <Button onClick={submit} variant="primary" className="w-25">
        Create User
      </Button>
    </div>
  );
};

export default Newuser;
