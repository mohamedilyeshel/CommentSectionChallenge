import styled from "styled-components";

const ButtonStyled = styled.button`
  background-color: ${({ outlined, buttonType }) =>
    outlined
      ? "transparent"
      : buttonType === "normal"
      ? "var(--neutralGrayishBlue)"
      : buttonType === "delete"
      ? "var(--primarySoftRed)"
      : "var(--primaryModerateBlue)"};
  color: ${({ outlined, buttonType }) =>
    !outlined
      ? "var(--neutralWhite)"
      : buttonType === "normal"
      ? "var(--neutralGrayishBlue)"
      : buttonType === "delete"
      ? "var(--primarySoftRed)"
      : "var(--primaryModerateBlue)"};
  font-family: "Rubik", sans-serif;
  font-size: ${({ size }) => size};
  font-weight: 500;
  border: 0;
  padding: ${({ outlined }) => (outlined ? "0.5em 0.7em" : "0.7em 1.4em")};
  text-transform: ${({ outlined }) => (outlined ? "capitalize" : "uppercase")};
  gap: 0.5em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.3em;

  &:hover {
    color: ${({ outlined }) => outlined && "var(--primaryLightGrayishBlue)"};
    background-color: ${({ outlined }) =>
      !outlined && "var(--primaryLightGrayishBlue)"};
  }
`;

const IconStyled = styled.div`
  font-size: 0.8em;
  position: relative;
  top: 1px;
`;

export { ButtonStyled, IconStyled };
