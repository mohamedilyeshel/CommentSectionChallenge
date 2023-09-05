const AddComment = async (comment) => {
  try {
    let data = await fetch(`http://localhost:3000/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: comment.content,
        createdAt: comment.createdAt,
        score: comment.score,
        user: {
          image: {
            png: comment.user.image.png,
            webp: comment.user.image.webp,
          },
          username: comment.user.username,
        },
        replies: [],
      }),
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

export default AddComment;
