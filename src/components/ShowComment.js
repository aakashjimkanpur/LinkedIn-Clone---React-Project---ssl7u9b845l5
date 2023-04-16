import React from "react";

const ShowComment = (prop) => {
  return (
    <div>
      <hr className="m-0" />
      <div className="ps-2 mb-1 d-flex">
        <div className="fw-bold">{prop.commentData.commentBy} </div> :
        <div
          style={{
            maxWidth: 500,
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            overflowY: "scroll",
            overflow: "auto",
          }}
        >
          {prop.commentData.data}
        </div>
      </div>
    </div>
  );
};

export default ShowComment;
