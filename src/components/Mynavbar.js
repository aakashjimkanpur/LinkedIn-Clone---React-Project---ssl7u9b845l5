import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ImHome3 } from "react-icons/im";
import { HiUsers } from "react-icons/hi";
import { RiShoppingBagFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { TbBellFilled } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import { SiPolywork } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import UserContext from "./userContext";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Mynavbar = () => {
  const [isHomeClicked, setIshomeClicked] = useState(true);
  const [isNetWorkClicked, setIsNetWorkClicked] = useState(false);
  const [isJobsClicked, setIsJobsClicked] = useState(false);
  const [isMessagingClicked, setIsMessagingClicked] = useState(false);
  const [isNotificationClicked, setIsNotificationClicked] = useState(false);
  const styles = {
    underline: { textDecorationLine: "underline" },
    nounderline: { textDecorationLine: "" },
  };
  const navigate = useNavigate();
  const usercontext = React.useContext(UserContext);
  const baseURL = "https://linked-in-b-tfww.vercel.app";
  // const baseURL = "http://localhost:3001";

  function logout() {
    fetch(`${baseURL}/user/logoutUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: usercontext.token,
      },
      body: JSON.stringify({ token: usercontext.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Logout Successfully");
        usercontext.setToken(null);
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Something Error Occurred", err);
      });
  }

  function deselect() {
    setIshomeClicked(false);
    setIsNetWorkClicked(false);
    setIsJobsClicked(false);
    setIsMessagingClicked(false);
    setIsNotificationClicked(false);
  }
  return (
    <div>
      <div className="d-flex justify-content-around">
        <div className="d-flex w-25">
          <div>
            <svg
              height="50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="#0A66C2"
              focusable="false"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </div>
          <Form.Control
            type="search"
            placeholder="🔍 Search"
            aria-label="Search"
            className="h-75 my-2"
          />
        </div>
        <div className="d-flex flex-row">
          <Nav.Link>
            <div
              onClick={() => {
                deselect();
                setIshomeClicked(true);
              }}
              className="d-flex flex-column align-items-center px-2"
            >
              <ImHome3 size={30} />
              <span
                style={isHomeClicked ? styles.underline : styles.nounderline}
              >
                Home
              </span>
            </div>
          </Nav.Link>
          <Nav.Link>
            <div
              onClick={() => {
                deselect();
                setIsNetWorkClicked(true);
              }}
              className="d-flex flex-column align-items-center px-2"
            >
              <HiUsers size={30} />
              <span
                style={isNetWorkClicked ? styles.underline : styles.nounderline}
              >
                Network
              </span>
            </div>
          </Nav.Link>
          <Nav.Link>
            <div
              onClick={() => {
                deselect();
                setIsJobsClicked(true);
              }}
              className="d-flex flex-column align-items-center px-2"
            >
              <RiShoppingBagFill size={30} />
              <span
                style={isJobsClicked ? styles.underline : styles.nounderline}
              >
                Jobs
              </span>
            </div>
          </Nav.Link>
          <Nav.Link>
            <div
              onClick={() => {
                deselect();
                setIsMessagingClicked(true);
              }}
              className="d-flex flex-column align-items-center px-2"
            >
              <AiFillMessage size={30} />
              <span
                style={
                  isMessagingClicked ? styles.underline : styles.nounderline
                }
              >
                Messaging
              </span>
            </div>
          </Nav.Link>
          <Nav.Link>
            <div
              onClick={() => {
                deselect();
                setIsNotificationClicked(true);
              }}
              className="d-flex flex-column align-items-center px-2"
            >
              <TbBellFilled size={30} />
              <span
                style={
                  isNotificationClicked ? styles.underline : styles.nounderline
                }
              >
                Notifications
              </span>
            </div>
          </Nav.Link>
          <Nav.Link>
            <div className="d-flex flex-column align-items-center px-2">
              <FaUserAlt size={30} />
              <NavDropdown
                title={usercontext.userName}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="#action3" onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav.Link>
          <Nav.Link>
            <div className="d-flex flex-column align-items-center px-2">
              <SiPolywork size={30} />
              <NavDropdown title="Works" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Works</NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav.Link>
        </div>
      </div>
      <hr className="my-0" />
    </div>
  );
};

export default Mynavbar;
