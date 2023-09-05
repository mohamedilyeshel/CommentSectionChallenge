import React, { useContext, useRef } from "react";
import "./style/CommentBlock.css";
import Score from "../Score/Score";
import Button from "../Button/index";
import ReplyBox from "../CommentBox/CommentBox";
import generalContext from "../../Context/GeneralContext";
import TransformCreatedAtDate from "../../utils/DateUtils/TransformCreatedAtDate";
import Difference from "../../utils/DateUtils/Difference";
import TransformDifference from "../../utils/DateUtils/TransformDifference";

const CommentBlock = ({ comment }) => {
  const { currentUser, dispatch, handlerSetIsOpen, handlerSetCommentDelete } =
    useContext(generalContext);
  const commentContentUpdated = useRef("");

  const handlerReply = () => {
    dispatch({
      type: "reply",
      comment,
    });
  };

  const handlerOpenDeleteModel = () => {
    handlerSetIsOpen(true);
    handlerSetCommentDelete(comment);
  };

  const handlerEdit = () => {
    dispatch({
      type: "edit",
      comment,
    });
  };

  const handlerUpdate = () => {
    let commentMessage = commentContentUpdated.current.value;
    if (commentMessage[0] === "@") {
      commentMessage = commentMessage.substring(
        commentMessage.indexOf(" ") + 1
      );
    }
    dispatch({
      type: "update",
      comment,
      commentContentUpdated: commentMessage,
    });
  };

  const createdAtDynamic = TransformDifference(
    Difference(TransformCreatedAtDate(comment.createdAt))
  );

  return (
    <>
      {comment.isReplyBox ? (
        <ReplyBox
          currentUser={currentUser}
          replyingTo={comment.replyingTo}
          dispatch={dispatch}
        />
      ) : (
        <>
          <div className="commentBlock">
            <Score score={comment.score} />
            <div className="commentContent">
              <div className="topSection">
                <div className="leftSide">
                  <div className="profileImage">
                    <img
                      src={require(`../../${comment.user.image.png}`)}
                      alt={comment.user.username}
                    />
                  </div>
                  <h1 className="userName">{comment.user.username}</h1>
                  {comment.user.username === currentUser.username &&
                    currentUser.username && <p className="currentUser">You</p>}
                  <h3 className="dateOfCreation">{createdAtDynamic}</h3>
                </div>
                <div className="rightSide">
                  {comment.user.username !== currentUser.username &&
                    currentUser.username && (
                      <Button
                        buttonType="reply"
                        existIcon={true}
                        outlined={true}
                        size="14px"
                        handlerClick={handlerReply}
                      >
                        Reply
                      </Button>
                    )}
                  {comment.user.username === currentUser.username &&
                    currentUser.username && (
                      <>
                        <Button
                          buttonType="delete"
                          existIcon={true}
                          outlined={true}
                          size="14px"
                          handlerClick={handlerOpenDeleteModel}
                        >
                          Delete
                        </Button>
                        <Button
                          buttonType="edit"
                          existIcon={true}
                          outlined={true}
                          size="14px"
                          handlerClick={handlerEdit}
                          disabled={comment.isEdit}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                </div>
              </div>
              {comment.isEdit ? (
                <div className="editBox">
                  <textarea
                    defaultValue={
                      comment.replyingTo
                        ? `@${comment.replyingTo} ${comment.content}`
                        : comment.content
                    }
                    ref={commentContentUpdated}
                  />
                  <Button
                    buttonType="edit"
                    existIcon={false}
                    outlined={false}
                    size="14px"
                    handlerClick={handlerUpdate}
                  >
                    Update
                  </Button>
                </div>
              ) : (
                <p className="content">
                  {comment.replyingTo && (
                    <span className="replyingTo">@{comment.replyingTo} </span>
                  )}
                  {comment.content}
                </p>
              )}
            </div>
          </div>
          {comment.replies?.length > 0 && (
            <div className="repliesSection">
              <div className="verticalLine" />
              <div className="replies">
                {comment.replies.map((reply, index) => {
                  let newReply = { ...reply, parentId: comment.id };
                  return <CommentBlock comment={newReply} key={index} />;
                })}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CommentBlock;
