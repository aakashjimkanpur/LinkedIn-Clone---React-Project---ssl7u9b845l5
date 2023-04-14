import React from "react";

const ShowPost = (prop) => {
  return (
    <div
      className="view border border-dark rounded my-1"
      style={{ height: 220, width: 300 }}
    >
      hello post
      {console.log("in the post")}
      {prop.postDetail.postBy}
    </div>
  );
};

export default ShowPost;
