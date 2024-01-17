import React from "react";

const Like = (props) => {
  const { liked, handlLike } = props;
  let classes = "fa fa-heart";

  if (!liked) classes += "-o";
  return <i onClick={handlLike} className={classes}></i>;
};

export default Like;
