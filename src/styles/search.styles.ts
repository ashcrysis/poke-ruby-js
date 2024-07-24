import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  & form span.ant-typography {
    color: white;
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
