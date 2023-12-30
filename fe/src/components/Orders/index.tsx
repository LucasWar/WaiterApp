import { Order } from '../types/Order';
import { OrderBoard } from '../OrdesBoard';
import { Container } from './styles';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import socketIo from 'socket.io-client';


export function Orders(){
  const [orders,setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket  = socketIo('http://localhost:3001',{
      transports:['websocket'],

    });
    socket.on('order@new',(order) => {
      setOrders(prevState => prevState.concat(order));
    });
  },[]);

  useEffect(() => {
    api.get('/orders').then(({data}) =>{
      setOrders(data);
    } );
  },[]);

  const WAITING = orders.filter((order) =>
    order.status ===  'WAITING'
  );

  const IN_PRODUCTION = orders.filter((order) =>
    order.status ===  'IN_PRODUCTION'
  );

  const DONE = orders.filter((order) =>
    order.status ===  'DONE'
  );


  function handleCancelOrder(orderId:string){
    setOrders((prevState) => prevState.filter(order => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']){
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId
        ? {...order, status}
        : order
    )));
  }

  console.log(WAITING);

  return (
    <Container>
      <OrderBoard
        icon="🕑"
        title="Fila de espera"
        orders={WAITING}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrderBoard
        icon="👨‍🍳"
        title="Em preparo"
        orders={IN_PRODUCTION}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrderBoard
        icon="✅"
        title="Pronto"
        orders={DONE}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />

    </Container>
  );
}
