import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 64px;

  position: sticky;
  top: 0;
  z-index: 1;

  background-color: #a13232;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;

export const UserContainer = styled.div`
  cursor: pointer;
`;

export const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  & > img {
    width: 48px;
  }
`;
