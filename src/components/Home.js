import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import { FaUserPlus, FaBookmark } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import myImage from "./r1.jpg";
import myImage1 from "./r2.png";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";
import ShowPost from "./ShowPost";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "./userContext";

const Home = () => {
  const navigate = useNavigate();
  const usercontext = React.useContext(UserContext);
  const [postData, setPostData] = useState("");
  const [postList, setPostList] = useState([]);
  const [data, setData] = useState(true);
  const location = useLocation();

  let userName = usercontext.userName;
  let userId = usercontext.userId;
  let userTheme = "Looking jobs in Software Development";
  const baseURL = "https://linked-in-b-tfww.vercel.app";
  // const baseURL = "http://localhost:3001";
  useEffect(() => {
    fetchPostList();
  }, [data]);
  let userProfileUrl =
    "data:image/jpeg;base64,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";
  let userProfileBackGround =
    "data:image/jpeg;base64,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";
  function fetchPostList() {
    fetch(`${baseURL}/post/postList`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPostData("");
        setPostList(data);
      })
      .catch((err) => {
        toast.error("Something Error Occurred", err);
      });
  }
  function post() {
    if (!postData) toast.error("Please Enter Some Text");
    else {
      fetch(`${baseURL}/post/newPost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postById: userId,
          postByName: userName,
          postContent: postData,
          likeList: [],
          commentList: [],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPostData("");
          toast.success("Post Successfully");
          fetchPostList();
        })
        .catch((err) => {
          toast.error("Something Error Occurred", err);
        });
    }
  }
  return (
    <div className="d-flex flex-row justify-content-around my-5">
      <div className="d-flex flex-column">
        <div
          className="view border border-dark rounded"
          style={{ height: 300, width: 200 }}
        >
          <Card className="bg-dark text-white">
            <Card.Img
              style={{ height: 50, width: 198 }}
              src={userProfileBackGround}
              alt="BackGround Image"
            />
            <Card.ImgOverlay className=" px-5 ms-3">
              <Image
                style={{ height: 70, width: 70 }}
                src={userProfileUrl}
                alt="User Profile"
                roundedCircle
              />
            </Card.ImgOverlay>
          </Card>
          <div className="mt-5 ms-3">
            <div style={{ textAlign: "center" }}>
              <b>{userName}</b>
            </div>
            <div
              style={{ color: "#828c96", fontSize: 12, textAlign: "center" }}
            >
              {userTheme}
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-around">
            <div>
              <div
                style={{
                  color: "rgb(89 92 96)",
                  fontSize: 12,
                  textAlign: "left",
                }}
              >
                Connections
              </div>
              <div
                style={{
                  color: "black",
                  fontSize: 12,
                  textAlign: "left",
                }}
              >
                Grow your Network
              </div>
            </div>
            <div>
              <FaUserPlus size={25} />
            </div>
          </div>
          <hr />
          <div className="d-flex m-3">
            <div>
              <FaBookmark size={20} />
            </div>
            <div
              style={{
                color: "black",
                fontSize: 15,
              }}
            >
              My Items
            </div>
          </div>
        </div>
        <div
          className="view border border-dark my-1 rounded"
          style={{ height: 120, width: 200 }}
        >
          <div className="d-flex justify-content-around">
            <div>
              <div
                style={{
                  fontSize: 14,
                  textAlign: "left",
                }}
              >
                Groups
              </div>
              <div
                style={{
                  fontSize: 14,
                  textAlign: "left",
                }}
              >
                Events
              </div>
              <div
                style={{
                  fontSize: 14,
                  textAlign: "left",
                }}
              >
                Follow Hahtags
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 30,
                  textAlign: "right",
                }}
              >
                +
              </div>
            </div>
          </div>
          <hr className="mb-1" />
          <div className="ps-3" style={{ color: "#828c96" }}>
            Discover More
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div
          className="view border border-dark rounded"
          style={{ height: 120, width: 700 }}
        >
          <div className="my-1 d-flex justify-content-around">
            <div className="pt-2">
              <Image
                style={{ height: 50, width: 50 }}
                src={userProfileUrl}
                roundedCircle
              />
            </div>
            <div className="pt-2">
              <textarea
                style={{
                  borderRadius: 35,
                  paddingLeft: "20px",
                  resize: "none",
                }}
                placeholder="Start a post"
                type="textArea"
                rows={2}
                cols={80}
                value={postData}
                onChange={(e) => {
                  setPostData(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="pe-4" style={{ textAlign: "right" }}>
            <Button variant="outline-primary" onClick={post}>
              Post
            </Button>
          </div>
        </div>
        <div className="d-flex flex-column">
          {postList.length > 0 ? (
            postList.map((post) => (
              <ShowPost
                postDetail={post}
                data={data}
                setData={setData}
                key={post._id}
              />
            ))
          ) : (
            <div> There are No Articles</div>
          )}
        </div>
      </div>
      <div className="d-flex flex-column">
        <div
          className="view border border-dark rounded my-1"
          style={{ height: 220, width: 300 }}
        >
          <div className="d-flex justify-content-between">
            <div
              className="fw-bold ps-2"
              style={{ color: "#828c96", fontSize: 18 }}
            >
              Add to your Feed
            </div>
            <div>
              <HiInformationCircle />
            </div>
          </div>
          <div>
            <img alt="Follow" height={150} width={170} src={myImage} />
          </div>
          <div
            className="fw-bold ps-2"
            style={{ color: "#5c90dd", fontSize: 18 }}
          >
            View all recommendation <BsArrowRight size={30} />
          </div>
        </div>
        <div
          className="view border border-dark my-1 rounded"
          style={{ height: 250, width: 300 }}
        >
          <img alt="Follow" height={245} width={295} src={myImage1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
