import { OrderContainer,Board } from './styles';
import { Order } from '../types/Order';
import { OrderModal } from '../OrdesModal';
import { useState } from 'react';
import { api } from '../../utils/api';
import { toast } from 'react-toastify';


interface OrderBoardsProps{
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId:string) => void;
  onChangeOrderStatus: (orderId:string,status: Order['status']) => void;
}

export function OrderBoard({title, icon, orders,onCancelOrder,onChangeOrderStatus}:OrderBoardsProps){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading,setIsLoading] = useState(false);

  function handleOpenModal(order:Order){
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  async function handleChangeOrderStatus(){
    setIsLoading(true);

    const status = selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    await api.patch(`/orders/${selectedOrder?._id}`, { status });


    toast.success(`O Pedido da mesa ${selectedOrder?.table} teve status alterado`);
    onChangeOrderStatus(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalVisible(false);

  }

  function handleCloseModal(){
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function  handleCancelOrder(){
    setIsLoading(true);
    await api.delete(`/orders/${selectedOrder?._id}`);


    toast.success(`O Pedido da mesa ${selectedOrder?.table} foi cancelado`);
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);

  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        closeModal={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 &&
        <OrderContainer>
          {orders.map((order) => (
            <button type='button' key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrderContainer>
      }
    </Board>
  );
}
