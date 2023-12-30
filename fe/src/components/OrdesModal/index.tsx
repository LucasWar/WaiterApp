import closeIcon from '../../assets/images/close-icon.svg';
import { Overlay,ModalBody, OrderDatails, Actions } from './styles';
import { Order } from '../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';


interface OrderModalProps{
  visible: boolean;
  order: Order | null;
  closeModal: () => void;
  onCancelOrder: () => void;
  isLoading: boolean;
  onChangeOrderStatus: () => void;
}

export function OrderModal({visible, order, closeModal,onCancelOrder,isLoading,onChangeOrderStatus}:OrderModalProps){
  if(!visible || !order){
    return null;
  }

  const total = order.products.reduce((acc, { product, quantity }) => {
    return acc +  (product.price *  quantity);
  },0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <button type='button' onClick={closeModal}>
            <img src={closeIcon} alt="Fecha Modal"/>
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕐'}
              {order.status === 'IN_PRODUCTION' && '👩‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em produção'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>
        </div>

        <OrderDatails>
          <strong>Items</strong>
          <div className="order-items">
            {order.products.map(({_id, product,quantity}) => (
              <div className="item" key={_id}>
                <img src={`http://localhost:3001/uploads/${product.imagePath}`} alt={product.name} width="60" height="40"/>
                <span className='quantity'>{quantity}x</span>

                <div className="datails">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>

            ))}
          </div>
          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDatails>

        <Actions>
          {order.status !== 'DONE' && (
            <>
              <button type='button' className='primary' disabled={isLoading} onClick={onChangeOrderStatus}>
                <span>
                  {order.status === 'WAITING' && '🕐'}
                  {order.status === 'IN_PRODUCTION' && '✅'}
                </span>
                <strong>
                  {order.status === 'WAITING' && 'Iniciar Produção'}
                  {order.status === 'IN_PRODUCTION' && 'Finalizar pedido'}
                </strong>
              </button>

              <button type='button' className='secondary' onClick={onCancelOrder} disabled={isLoading}>
                <span>❌</span>
                <strong>Cancelar pedido</strong>
              </button>
            </>
          )}
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
