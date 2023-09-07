const DeleteComment = async (commentId) => {
  try {
    let data = await fetch(
      `https://my-json-server.typicode.com/mohamedilyeshel/CommentSectionChallengeJSONServer/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );
    return await data.json();
  } catch (error) {
    return {
      error: {
        exist: true,
        message: error.message,
      },
    };
  }
};

export default DeleteComment;
