import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/index.tsx";
import "../App.css";
import * as S from "../styles/search.styles.ts";
import { message } from "antd";

const NotFound = () => {
  const navigate = useNavigate();

  const redirectToSearch = () => {
    navigate("/search");
  };
  let authorizationHeader = localStorage.getItem("authorizationHeader");
  if (!authorizationHeader) {
    message.error("You are not allowed to access this page before logging in.");
    navigate("/");
    return <></>;
  }
  return (
    <S.Container>
      <Header />
      <S.NotFoundContainer>
        <div className="pokeball-not-found-icon"></div>
        <S.Message>Page Not Found</S.Message>
        <S.Description>
          The page you are looking for does not exist.
        </S.Description>
        <S.RedirectButton onClick={redirectToSearch}>
          Go to Main Page
        </S.RedirectButton>
      </S.NotFoundContainer>
    </S.Container>
  );
};
export default NotFound;
