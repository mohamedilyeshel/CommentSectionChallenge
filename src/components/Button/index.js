import React from "react";
import { IconStyled, ButtonStyled } from "./style/Button";
import { FaReply } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { GiClick } from "react-icons/gi";

const Button = ({
  children,
  buttonType = "normal", // normal, reply, delete, edit
  existIcon = true,
  outlined = false,
  size = "16px",
  handlerClick,
  disabled = false,
}) => {
  return (
    <ButtonStyled
      buttonType={buttonType}
      outlined={outlined}
      size={size}
      onClick={handlerClick}
      disabled={disabled}
    >
      {existIcon && (
        <IconStyled>
          {buttonType === "edit" ? (
            <MdEdit />
          ) : buttonType === "delete" ? (
            <AiFillDelete />
          ) : buttonType === "reply" ? (
            <FaReply />
          ) : (
            <GiClick />
          )}
        </IconStyled>
      )}
      {children}
    </ButtonStyled>
  );
};

export default Button;
