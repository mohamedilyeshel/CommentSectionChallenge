const AddReply = async (reply, commentId) => {
  try {
    let data = await fetch(`http://localhost:3000/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ replies: reply }),
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

export default AddReply;
