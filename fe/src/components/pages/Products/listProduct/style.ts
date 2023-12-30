import styled from 'styled-components';

export const Board = styled.div`
  padding: 16px;
  border: 1px solid rgba(204,204,204,0.4);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  flex: 1;

  > header{
    padding: 8px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;

  }
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin-top: 24px;
  padding-left: 13px;
  button{
    width: 100%;
    border: 1px solid rgba(204,204,204,0.4);
    height: 128px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    transition: all 1s;
    &:hover{
      transform: scale(1.1);
    }
    strong{
      font-weight: 800;
      color: red;
    }

    span{
      font-size: 14px;
      color: white;
    }

    & + button{
      margin-top: 24px;
    }
  }
  .infor{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    p{
      font-weight: 800;

    }
  }
`;

export const Container = styled.div`
  left: 16px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 10% 0% 10%;

`;

export const ButtonCreate = styled.button`
  background: #006400;
  padding: 10px 18px;
  font-size: 25px;
  border: 0;
  color: white;
  border-radius: 16px;
  float: right;
  margin-right: 1rem;
  transition: 0.5s;
  &:hover{
    background: #002600;
  }
`;
