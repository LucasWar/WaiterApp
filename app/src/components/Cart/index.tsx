import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/Cart';
import { ProductContainer,Item,Action,Image,QuantityContainer,ProductDatails,Summary,TotalContainer } from './style';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Button';
import { Product } from '../../types/Product';
import { OrderConfirmModal } from '../OrderConfirmModal';
import { useState } from 'react';
import { api } from '../../utils/api';


interface CartProps{
  cartItems: CartItem[];
  onAdd: (product:Product) => void;
  onRemove: (product:Product) => void;
  onConfirmOrder:()=> void;
  selectedTable: string;
}

export function Cart({cartItems,onAdd,onRemove,onConfirmOrder,selectedTable}:CartProps){
  const [isModalVisible,setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const total = cartItems.reduce((acc, cartItem) =>  {
    return acc + cartItem.quantity * cartItem.product.price;
  },0);

  async function handleConfirmOrder(){
    setIsLoading(true);

    const playload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity
      })),
    };
    await api.post('/orders',playload);
    setIsLoading(false);
    setIsModalVisible(true);

  }

  function handleOk(){
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmModal
        visible={isModalVisible}
        onOk={handleOk}
      />


      {cartItems.length > 0 && (
        <FlatList
          style={{marginBottom:20, maxHeight: 150}}
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          renderItem={({item: cartItem}) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.0.11:3001/uploads/${cartItem.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color='#666666'>{cartItem.quantity}x</Text>

                </QuantityContainer>
                <ProductDatails>
                  <Text size={14} weight="600">{cartItem.product.name}</Text>
                  <Text size={14} color='#666666' style={{marginTop: 4}}>{formatCurrency(cartItem.product.price)}</Text>
                </ProductDatails>
              </ProductContainer>


              <Action>
                <TouchableOpacity
                  style={{marginRight: 24}}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onRemove(cartItem.product)}>
                  <MinusCircle />

                </TouchableOpacity>
              </Action>
            </Item>
          )}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text size={14} weight="600">Total</Text>
              <Text size={14} color='#666666' style={{marginTop: 4}}>{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color='#999'>Seu carrinho está vazio</Text>
          ) }
        </TotalContainer>

        <Button onPress={()=>handleConfirmOrder()} disabled={cartItems.length === 0} loading={false}>
                Confirmar pedido
        </Button>
      </Summary>
    </>

  );
}
