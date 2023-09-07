import React, { useEffect, useState, useContext } from "react";
import "./style/CommentSection.css";
import CommentBlock from "../../components/CommentBlock/CommentBlock";
import generalContext from "../../Context/GeneralContext";
import DeleteModel from "../../components/DeleteModel/DeleteModel";
import CommentBox from "../../components/CommentBox/CommentBox";

const CommentSection = () => {
  const { comments, dispatch, isOpen, currentUser } =
    useContext(generalContext);
  const [query, setQuery] = useState({
    loading: false,
    error: {
      exist: false,
      message: "",
    },
  });

  useEffect(() => {
    let ignore = false;

    const fetchComments = async () => {
      try {
        setQuery((query) => {
          return { ...query, loading: true };
        });

        let data = await fetch(
          "https://my-json-server.typicode.com/mohamedilyeshel/CommentSectionChallengeJSONServer/comments",
          {
            method: "GET",
          }
        );

        let commentsFetched = await data.json();
        dispatch({ type: "newData", data: commentsFetched });
        setQuery({
          loading: false,
          error: {
            exist: false,
            message: "",
          },
        });
      } catch (error) {
        setQuery({
          loading: false,
          error: {
            exist: true,
            message: error.message,
          },
        });
      }
    };

    if (!ignore) {
      fetchComments();
    }

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (query.loading || !currentUser) {
    return (
      <div className="commentSection">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (query.error.exist) {
    return (
      <div className="commentSection">
        <h1>{query.error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <div className="commentSection">
        {comments?.map((comment, index) => {
          return <CommentBlock comment={comment} key={index} />;
        })}
        <CommentBox
          currentUser={currentUser}
          replyingTo={null}
          dispatch={dispatch}
        />
      </div>
      {isOpen && <DeleteModel />}
    </>
  );
};

export default CommentSection;
