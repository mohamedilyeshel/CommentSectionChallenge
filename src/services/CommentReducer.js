import AddReply from "../api/AddReply";
import DeleteComment from "../api/DeleteComment";
import DeleteReply from "../api/DeleteReply";
import AddComment from "../api/AddComment";
import { v4 as uuidv4 } from "uuid";
import FormatDate from "../utils/DateUtils/FormatDate";

const commentReducer = (comments, action) => {
  let newComments;
  const createComment = (action) => {
    return action.replyingTo
      ? {
          id: uuidv4(),
          content: action.commentMessage,
          createdAt: FormatDate(Date.now()),
          score: 0,
          replyingTo: action.replyingTo.user.username,
          user: {
            image: {
              png: action.currentUser.image.png,
              webp: action.currentUser.image.webp,
            },
            username: action.currentUser.username,
          },
        }
      : {
          id: uuidv4(),
          content: action.commentMessage,
          createdAt: FormatDate(Date.now()),
          score: 0,
          user: {
            image: {
              png: action.currentUser.image.png,
              webp: action.currentUser.image.webp,
            },
            username: action.currentUser.username,
          },
          replies: [],
        };
  };
  switch (action.type) {
    case "newData":
      newComments = [...action.data];
      break;
    case "reply":
      newComments = [...comments];

      let commentIndex = action.comment.parentId
        ? newComments.findIndex(
            (comment) => comment.id === action.comment.parentId
          )
        : newComments.findIndex((comment) => comment.id === action.comment.id);

      const newReply = {
        isReplyBox: true,
        replyingTo: action.comment,
      };

      let replyIndex = newComments[commentIndex].replies?.findIndex(
        (reply) => reply.id === action.comment.id
      );

      if (action.comment.parentId) {
        if (!newComments[commentIndex].replies[replyIndex + 1]?.isReplyBox) {
          newComments[commentIndex].replies?.splice(
            replyIndex + 1,
            0,
            newReply
          );
        }
      } else if (!newComments[commentIndex + 1]?.isReplyBox) {
        newComments.splice(commentIndex + 1, 0, newReply);
      }

      break;
    case "edit":
      newComments = [...comments];
      if (action.comment.parentId) {
        let indexOfParentComment = newComments.findIndex(
          (comment) => comment.id === action.comment.parentId
        );
        let indexOfCommentWillBeEdited = newComments[
          indexOfParentComment
        ].replies?.findIndex((comment) => comment.id === action.comment.id);
        newComments[indexOfParentComment].replies[
          indexOfCommentWillBeEdited
        ].isEdit = true;
      } else {
        let indexOfCommentWillBeEdited = newComments.findIndex(
          (comment) => comment.id === action.comment.id
        );
        newComments[indexOfCommentWillBeEdited].isEdit = true;
      }
      break;
    case "delete":
      newComments = [...comments];
      if (action.comment.parentId) {
        let indexOfParentComment = newComments.findIndex(
          (comment) => comment.id === action.comment.parentId
        );
        let indexOfDeletedReply = newComments[
          indexOfParentComment
        ].replies?.findIndex((comment) => comment.id === action.comment.id);
        newComments[indexOfParentComment].replies?.splice(
          indexOfDeletedReply,
          1
        );
        DeleteReply(
          newComments[indexOfParentComment].replies,
          action.comment.parentId
        );
      } else {
        let indexOfDeletedComment = newComments.findIndex(
          (comment) => comment.id === action.comment.id
        );
        newComments.splice(indexOfDeletedComment, 1);
        DeleteComment(action.comment.id);
      }
      action.handlerSetCommentDelete({});
      action.handlerSetIsOpen(false);
      break;
    case "addReply":
      newComments = [...comments];
      const commentObject = createComment(action);
      let replyingToIndex;
      if (action.replyingTo.parentId) {
        replyingToIndex = newComments.findIndex(
          (comment) => comment.id && comment.id === action.replyingTo.parentId
        );
        let replyIndex = newComments[replyingToIndex].replies?.findIndex(
          (reply) => reply.id && reply.id === action.replyingTo.id
        );
        newComments[replyingToIndex].replies?.splice(
          replyIndex + 1,
          1,
          commentObject
        );
        AddReply(
          newComments[replyingToIndex].replies,
          action.replyingTo.parentId
        );
      } else {
        replyingToIndex = newComments.findIndex(
          (comment) => comment.id && comment.id === action.replyingTo.id
        );
        newComments.splice(replyingToIndex + 1, 1);
        newComments[replyingToIndex].replies.unshift(commentObject);
        AddReply(newComments[replyingToIndex].replies, action.replyingTo.id);
      }
      break;
    case "update":
      newComments = [...comments];
      if (action.comment.parentId) {
        let indexOfParentComment = newComments.findIndex(
          (comment) => comment.id === action.comment.parentId
        );
        let indexOfCommentWillBeEdited = newComments[
          indexOfParentComment
        ].replies?.findIndex((comment) => comment.id === action.comment.id);
        newComments[indexOfParentComment].replies[
          indexOfCommentWillBeEdited
        ].isEdit = false;
        newComments[indexOfParentComment].replies[
          indexOfCommentWillBeEdited
        ].content = action.commentContentUpdated;
      } else {
        let indexOfCommentWillBeEdited = newComments.findIndex(
          (comment) => comment.id === action.comment.id
        );
        newComments[indexOfCommentWillBeEdited].isEdit = false;
        newComments[indexOfCommentWillBeEdited].content =
          action.commentContentUpdated;
      }
      // Im too lazy to make the update api w ta takhrawli fih
      break;
    case "addComment":
      newComments = [...comments];
      const newComment = createComment(action);
      newComments.push(newComment);
      AddComment(newComment);
      break;
    default:
      throw new Error("this action doesnt exist");
  }

  return newComments;
};

export default commentReducer;
