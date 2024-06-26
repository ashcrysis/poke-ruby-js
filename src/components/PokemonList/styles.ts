import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 calc(64px - 8px); // Menos o gap do content para ignorar os espacos externos ao "grid"
`;
