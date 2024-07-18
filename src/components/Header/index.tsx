import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles.ts";
import UserComponent from "./components/User.tsx";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/search");
  };

  return (
    <S.Container>
      <div className="logo" onClick={handleLogoClick} /> <UserComponent />
    </S.Container>
  );
};

export default Header;
