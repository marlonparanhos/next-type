import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  > ul {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    list-style: none;
    gap: 4px;

    > li a {
      text-decoration: none;
      font-size: 18px;
    }
  }
`;
