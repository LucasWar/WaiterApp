import styled from 'styled-components';

export const Text = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  .page-reset{
    h2{
      padding-right: 80px;
      font-weight: 600;
      font-size: 16px;
      opacity: 0.9;
      margin-top: 6px;
      cursor: pointer;
      color: red;
    }
  }
`;


export const Container = styled.header`

  margin-left: 50px;
  width: 100%;
  max-width: 1100px;
  display: flex;
  height: 72px;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-datails{
    h1{
      font-size: 29px;
    }

    h2{
      font-weight: 400;
      font-size: 16px;
      opacity: 0.9;
      margin-top: 6px;
    }
  }

`;

