import React, { useRef } from "react";
import Button from "../Button/index";
import "./style/CommentBox.css";

const CommentBox = ({ currentUser, replyingTo, dispatch }) => {
  const commentContent = useRef(null);

  const handlerAddReply = () => {
    let commentDefaultValueLength = commentContent.current.defaultValue.length;
    let commentMessage = commentContent.current.value.substring(
      commentDefaultValueLength - 1
    );
    dispatch({
      type: "addReply",
      replyingTo,
      commentMessage,
      currentUser,
    });
  };

  const handlerSendComment = () => {
    let commentMessage = commentContent.current.value;
    commentContent.current.value = "";
    dispatch({
      type: "addComment",
      currentUser,
      commentMessage,
    });
  };

  return (
    <div className="commentBox">
      <div className="profileImage">
        <img
          src={require(`../../${currentUser.image.png}`)}
          alt={currentUser.username}
        />
      </div>
      <textarea
        defaultValue={replyingTo ? `@${replyingTo.user.username} ` : ""}
        ref={commentContent}
      />
      {replyingTo ? (
        <Button
          buttonType="reply"
          existIcon={false}
          outlined={false}
          size="13px"
          handlerClick={handlerAddReply}
        >
          Reply
        </Button>
      ) : (
        <Button
          buttonType="reply"
          existIcon={false}
          outlined={false}
          size="13px"
          handlerClick={handlerSendComment}
        >
          Send
        </Button>
      )}
    </div>
  );
};

export default CommentBox;
