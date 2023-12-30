import { FlatList } from 'react-native';

import { Text } from '../Text';
import { ProductContainer,Image,ProductDatails,Separator,AddToCartButton } from './style';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductsModal';
import { useState } from 'react';
import { Product } from '../../types/Product';

interface MenuProps{
  onAddToCart: (product:Product) => void;
  products: Product[];
}


export function Menu({onAddToCart,products} : MenuProps ){
  const [isModalVisible,setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product:Product){
    setModalVisible(true);
    setSelectedProduct(product);
  }
  return(
    <>
      <ProductModal visible={isModalVisible} onClose={() => setModalVisible(false)} product={selectedProduct} onAddToCart={onAddToCart}  />

      <FlatList
        data={products}
        style={{marginTop: 32}}
        contentContainerStyle={{paddingHorizontal: 24}}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({item: product}) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <Image
              source={{
                uri: `http://192.168.0.11:3001/uploads/${product.imagePath}`,
              }}
            />
            <ProductDatails>
              <Text weight='600'>{product.name}</Text>
              <Text size={14} color="#666666" style={{marginVertical: 8}}>{product.description}</Text>
              <Text size={14} weight='600'>{formatCurrency(product.price)}</Text>
            </ProductDatails>
            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>

        )}
      />
    </>
  );
}
