import React, { useContext } from "react";
import Button from "../Button/index";
import "./style/DeleteModel.css";
import generalContext from "../../Context/GeneralContext";

const DeleteModel = () => {
  const { dispatch, handlerSetIsOpen, handlerSetCommentDelete, commentDelete } =
    useContext(generalContext);

  const handlerDeleteComment = () => {
    dispatch({
      type: "delete",
      comment: commentDelete,
      handlerSetCommentDelete,
      handlerSetIsOpen,
    });
  };

  const handlerCancel = () => {
    handlerSetIsOpen(false);
    handlerSetCommentDelete({});
  };

  return (
    <div className="modelBox">
      <div className="deleteModel">
        <h1>Delete comment</h1>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="modelButtons">
          <Button
            buttonType="normal"
            existIcon={false}
            outlined={false}
            size="14px"
            handlerClick={handlerCancel}
          >
            No, cancel
          </Button>
          <Button
            buttonType="delete"
            existIcon={false}
            outlined={false}
            size="14px"
            handlerClick={handlerDeleteComment}
          >
            Yes, delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
