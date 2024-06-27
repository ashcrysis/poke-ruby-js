import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 calc(64px - 8px); // Menos o gap do content para ignorar os espacos externos ao "grid"
`;
export const noDataContainer = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 5px;
  text-align: center;
  background-color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  color: white;

  .ant-empty-description {
    color: white;
  }
`;
