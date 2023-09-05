import { createContext, useState, useEffect, useReducer } from "react";
import CommentReducer from "../services/CommentReducer";

const generalContext = createContext();

export const GeneralProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, dispatch] = useReducer(CommentReducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const [commentDelete, setCommentDelete] = useState({});

  useEffect(() => {
    let ignore = false;

    const getCurrentUser = async () => {
      try {
        let data = await fetch("http://localhost:3000/currentUser", {
          method: "GET",
        });
        let currentUser = await data.json();
        setCurrentUser(currentUser);
      } catch (error) {
        setCurrentUser(null);
      }
    };

    if (!ignore) {
      getCurrentUser();
    }

    return () => {
      ignore = true;
    };
  }, []);

  const handlerSetIsOpen = (newIsOpen) => {
    setIsOpen(newIsOpen);
  };

  const handlerSetCommentDelete = (newCommentDelete) => {
    setCommentDelete(newCommentDelete);
  };

  return (
    <generalContext.Provider
      value={{
        currentUser,
        comments,
        dispatch,
        isOpen,
        handlerSetIsOpen,
        commentDelete,
        handlerSetCommentDelete,
      }}
    >
      {children}
    </generalContext.Provider>
  );
};

export default generalContext;
