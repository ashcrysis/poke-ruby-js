import styled from "styled-components";

export const Container = styled.div`
  width: 150px;
  height: 150px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 5px;
  text-align: center;
  background-color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  color: white;
  transform: scale(1);

  &:hover > .pokeball-icon {
    opacity: 1;
    width: 25px;
    height: 25px;
  }

  &:hover {
    transform: scale(1.1);
    transition: 0.2s;
  }

  & > h2 {
    font-size: 100%;
  }

  & > img {
    max-width: 100px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
