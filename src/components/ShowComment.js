import React from "react";

const ShowComment = (prop) => {
  return (
    <div>
      <hr className="m-0" />
      <div className="ps-2 mb-1 d-flex">
        <div className="fw-bold" id={prop.commentData.commentByUserId}>
          {prop.commentData.commentByUserName}{" "}
        </div>{" "}
        :
        <div
          style={{
            maxWidth: 500,
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            overflowY: "scroll",
            overflow: "auto",
          }}
        >
          {prop.commentData.userComment}
        </div>
      </div>
    </div>
  );
};

export default ShowComment;
