import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  & form span.ant-typography {
    color: white;
  }
  & form span.ant-typography.ant-typography-danger {
    color: red;
  }
  & form input.ant-input-disabled {
    color: white;
  }
`;

export const Greyed = styled.div`
  cursor: pointer;
  width: calc((100% / 4) - 42px);
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
  height: "340px", color: "white"
  @media (max-width: 1440px) {
    width: calc((100% / 1) - 42px);
  }
`;
export const GreyedPad = styled.div`
  cursor: pointer;
  width: calc((100% / 4) - 42px);
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
  padding: "24px 32px" @media (max-width: 1440px) {
    width: calc((100% / 1) - 42px);
  }
`;

export const C = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 50px;

  & form span.ant-typography {
    color: white;
  }

  & form input.ant-input-disabled {
    color: white;
  }
`;

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

export const PokeballNotFound = styled.div`
  width: 300px;
  height: 300px;
  background-image: url(${require("../assets/notFoundImage.png").default});
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
`;

export const Message = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
`;

export const Description = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  color: white;
`;

export const RedirectButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ffcc00;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff9900;
  }
`;
