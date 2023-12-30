import { Container, CategoriesContainer, MenuContainer, Footer,FooterContainer,CenteredContainer} from './style';

import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { useState,useEffect } from 'react';
import { Cart } from '../components/Cart';
import { CartItem } from '../types/Cart';
import { Product } from '../types/Product';
import { ActivityIndicator } from 'react-native';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/Category';
import { api } from '../utils/api';


export function Main(){
  const [isTableModalVisible,setIsTableModalVisible] = useState(false);
  const [selectedTable,setSelectedTab] = useState('');
  const [cartItems,setCartItems] = useState<CartItem[]>([]);
  const [isLoading,setIsLoading] = useState(true);
  const [products,setProducts] = useState<Product[]>([]);
  const [categories,setCategories] = useState<Category[]>([]);
  const [isLoadingProducts,setIsLoadingProducts] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categoriesRerponse,productsResponse]) => {
      setCategories(categoriesRerponse.data);
      setProducts(productsResponse.data);
      setIsLoading(false);
      setIsLoadingProducts(false);
    });
  },[]);


  async function handleSelectCategory(categoryId: string){
    const router = !categoryId ? '/products' : `/category/${categoryId}/products`;
    setIsLoadingProducts(true);
    const {data} = await api.get(router);
    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleSaveTable(table:string){
    setSelectedTab(table);
  }

  function handleResetOrder(){
    setSelectedTab('');
    setCartItems([]);
  }

  function handleAddToCart(product:Product){
    if(!selectedTable){
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex((cartItem) => cartItem.product._id === product._id);

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCarItems = [...prevState];
      const item = newCarItems[itemIndex];

      newCarItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCarItems;
    });

  }

  function handleRemoveCartItem(product:Product){
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex((cartItem) => cartItem.product._id === product._id);

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if(item.quantity === 1){
        const newCartItems = [...prevState];
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  }


  return(
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator color="D73035" size="large" />
          </CenteredContainer>

        ):(
          <>
            <CategoriesContainer>
              <Categories categories={categories}  onSelectCategoty={handleSelectCategory} />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color="D73035" size="large" />
              </CenteredContainer>

            ): (
              <>
                {products.length > 0 ?
                  (
                    <MenuContainer>
                      <Menu
                        products={products}
                        onAddToCart={handleAddToCart} />
                    </MenuContainer>

                  ): (
                    <CenteredContainer>
                      <Empty />
                      <Text color='#666666' style={{marginTop: 24}}>Nenhum produto encontrado</Text>
                    </CenteredContainer>
                  )}
              </>
            )}
          </>
        )}

      </Container>
      <Footer>
        <FooterContainer>

          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)} disabled={isLoading}>
              Novo pedido
            </Button>
          )}
          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onRemove={handleRemoveCartItem}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </FooterContainer>
      </Footer>
      <TableModal
        visible = {isTableModalVisible}
        onClose = {() => setIsTableModalVisible(false)}
        onSave = {handleSaveTable}

      />
    </>
  );

}
