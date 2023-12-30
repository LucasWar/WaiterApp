import styled from 'styled-components';

export const Container = styled.div`
  left: 16px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 5% 0% 5%;

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

export const ContainerCatecory = styled.div`
  display: flex;
  flex-direction: row;
  width: 14rem;
  margin-top: 24px;
  padding-left: 2%;
  button{
    width: 100%;
    background-color: rgb(230,230,230);
    border: 1px solid rgba(204,204,204,0.4);
    height: 128px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;


  }
`;
