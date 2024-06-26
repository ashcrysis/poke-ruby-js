import React from "react";

import * as S from "./styles.ts";
import UserComponent from "./components/User.tsx";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  return (
    <S.Container>
      <div className="logo" />

      <UserComponent />
    </S.Container>
  );
};

export default Header;
