import styled from "styled-components";

export const Container = styled.div`
  width: calc((100% / 12) - 42px);
  margin: 10px;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 5px;
  text-align: center;
  background-color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  color: white;
  transform: scale(1);
  transition: 0.2s;

  &:hover > .pokeball-icon {
    opacity: 1;
    transform: scale(1.1);
  }

  &:hover {
    transform: scale(1.1);
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
  @media (max-width: 1440px) {
    width: calc((100% / 8) - 42px);
  }

  @media (max-width: 1024px) {
    width: calc((100% / 6) - 42px);
  }

  @media (max-width: 768px) {
    width: calc((100% / 4) - 42px);
  }

  @media (max-width: 480px) {
    width: calc((100% / 2) - 42px);
  }
`;
