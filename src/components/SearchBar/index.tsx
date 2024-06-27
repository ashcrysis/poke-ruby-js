import React from "react";
import { Input } from "antd";

import * as S from "./styles.ts";

interface ISearchBarProps {
  onFilter: (value: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = (props) => {
  const { onFilter } = props;
  return (
    <S.Container>
      <Input
        type="text"
        placeholder="Search..."
        onChange={(event) => onFilter(event.target.value)}
      />
    </S.Container>
  );
};

export default SearchBar;
