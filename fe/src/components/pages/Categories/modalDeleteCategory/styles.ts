import styled from 'styled-components';

export const Overlay = styled.div`
  left: 0px;
  top: 0px;
  background: rgba(0,0,0,0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBody = styled.div`
  background: #fff;
  width: 480px;
  border-radius: 8px;
  padding: 32px;
  align-items: center;
  justify-content: center;
  input{
    display: flex;
    padding: 6px;
    border-radius: 16px;
    margin-bottom: 5px;
    width: 100%;
    text-align: center;
  }
  header{
    display: flex;
    align-items: center;
    justify-content: right;
    strong{
      font-size: 24px;
    }
    button{
      display: flex;
      border: 0;
      background: transparent;
    }
  }
`;

export const OrderDatails = styled.div`
  margin-top: 32px;
  > strong{
    font-weight: 500;
    font-size: 14px;
    opacity: 0.8;
  }
  .order-items{
    margin-top: 16px;

    .item{
      display: flex;
      & + .item{
        margin-top: 16px;
      }
      img{
      border-radius: 6px;
      }
      .quantity{
        font-size: 14px;
        color: #666;
        display: block;
        min-width: 20px;
        margin-left: 12px;
      }
      .datails{
        margin-left: 4px;
        strong{
          display: block;
          margin-bottom: 4px;
        }
        span{
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
  .total{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    span{
      font-size: 14px;
      font-weight: 500;
      opacity: 0.8;
    }
  }
`;

export const  Actions = styled.footer`
  display: flex;
  flex-direction: column;

  .primary{
    background: red;
    border-radius: 48px;
    border: 0;
    color: #fff;
    padding: 11px 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    margin-top: 8px;
  }

  .secondary{
    padding: 14px 24px;
    color: #D73035;
    font-weight: bold;
    border: 0;
    background-color: transparent;
    margin-top: 8px;
  }
`;

export const Text = styled.p`
  font-size: 20px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
`;
