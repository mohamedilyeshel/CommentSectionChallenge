const DeleteReply = async (reply, commentId) => {
  try {
    let data = await fetch(
      `https://my-json-server.typicode.com/mohamedilyeshel/CommentSectionChallengeJSONServer/comments/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ replies: reply }),
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

export default DeleteReply;
