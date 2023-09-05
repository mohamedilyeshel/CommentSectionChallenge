const DeleteComment = async (commentId) => {
  try {
    let data = await fetch(`http://localhost:3000/comments/${commentId}`, {
      method: "DELETE",
    });
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
