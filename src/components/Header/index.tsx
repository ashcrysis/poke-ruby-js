import React from "react";

import * as S from "./styles.ts";
import UserComponent from "./components/User.tsx";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  return (
    <S.Container>
      <h1>PokeRubyJS</h1>

      <UserComponent />
    </S.Container>
  );
};

export default Header;
