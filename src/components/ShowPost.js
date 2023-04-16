import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import ShowComment from "./ShowComment";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { BsCaretDownFill } from "react-icons/bs";
import { toast } from "react-hot-toast";

const ShowPost = (prop) => {
  const [commentData, setCommentData] = useState("");
  let userName = "Aakash Gupta";
  let userProfileUrl =
    "data:image/jpeg;base64,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";
  function commentHandler(id) {
    console.log(id);
    if (!commentData) toast.error("Please enter some text before comment");
    else {
      const showp = window.localStorage.getItem("postList");
      let post = [];
      if (showp != null) {
        post = JSON.parse(showp);
      }
      // console.log("post= ", post);
      let newComment = { commentBy: userName, data: commentData };
      for (let i = 0; i < post.length; i++) {
        if (post[i].id === id) {
          post[i].commentList.push(newComment);
          break;
        }
      }
      window.localStorage.setItem("postList", JSON.stringify(post));
      setCommentData("");
      prop.data ? prop.setData(false) : prop.setData(true);
    }
  }
  function commentClick(id) {
    if (document.getElementById("comment" + id).className === "d-block")
      document.getElementById("comment" + id).className = "d-none";
    else document.getElementById("comment" + id).className = "d-block";
  }
  function likeClick(id) {
    const showp = window.localStorage.getItem("postList");
    let post = [];
    if (showp != null) {
      post = JSON.parse(showp);
    }
    // console.log("post= ", post);
    for (let i = 0; i < post.length; i++) {
      if (post[i].id === id) post[i].isLiked = post[i].isLiked ? false : true;
      break;
    }
    window.localStorage.setItem("postList", JSON.stringify(post));
    prop.data ? prop.setData(false) : prop.setData(true);
  }
  return (
    <div>
      <div
        className="ps-2 view border border-dark rounded d-flex flex-column mt-2 justify-content-around"
        style={{
          maxHeight: 450,
          width: 700,
          overflowY: "scroll",
          overflow: "auto",
        }}
      >
        <div className="d-flex">
          <div>Post By </div>
          <div> : </div>
          <div className="fw-bold">{prop.postDetail.postBy}</div>
        </div>
        <hr className="mt-0 " />
        <div
          style={{
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            overflowY: "scroll",
            overflow: "auto",
            height: 150,
            width: 670,
          }}
        >
          {prop.postDetail.postContent}
        </div>
        <hr className="mb-0" />
        <div className="d-flex">
          <div
            onClick={() => {
              likeClick(prop.postDetail.id);
            }}
            className="ps-2"
          >
            {prop.postDetail.isLiked ? (
              <div style={{ color: "blue" }}>
                <AiTwotoneLike size={30} /> Like
              </div>
            ) : (
              <div>
                <BiLike size={30} />
                Like
              </div>
            )}
          </div>
          <div
            onClick={() => {
              commentClick(prop.postDetail.id);
            }}
            className="ps-5"
          >
            <FaRegCommentDots size={30} />
            Comment
          </div>
        </div>
        <div
          className="d-none"
          id={"comment" + prop.postDetail.id}
          style={{
            maxHeight: 300,
            minHeight: 120,
            width: 670,
            overflowY: "scroll",
            overflow: "auto",
          }}
        >
          <div className="d-flex align-items-center">
            <div className="pt-2 ps-2">
              <Image
                style={{ height: 50, width: 50 }}
                src={userProfileUrl}
                roundedCircle
              />
            </div>
            <div className="pt-2 ps-2">
              <textarea
                style={{
                  borderRadius: 35,
                  paddingLeft: "20px",
                  resize: "none",
                }}
                placeholder="Your comment"
                type="textArea"
                rows={2}
                cols={55}
                value={commentData}
                onChange={(e) => {
                  setCommentData(e.target.value);
                }}
              />
            </div>
            <div className="pe-4 ps-2">
              <Button
                height="20px"
                variant="outline-primary"
                onClick={() => {
                  commentHandler(prop.postDetail.id);
                }}
              >
                Comment
              </Button>
            </div>
          </div>
          <div
            className="ps-2 mb-1"
            style={{
              height: 8,
              color: "blue",
            }}
          >
            <div>
              Previous Comments
              <BsCaretDownFill />
            </div>
          </div>
          <div>
            {prop.postDetail.commentList.length > 0 ? (
              prop.postDetail.commentList.map((comment) => (
                <ShowComment commentData={comment} />
              ))
            ) : (
              <div
                className="ps-2 mb-1"
                style={{
                  height: 7,
                  color: "grey",
                }}
              >
                <hr className="m-0" />
                There are No Previous Comment
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPost;
