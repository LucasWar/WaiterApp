import { useEffect,useState } from 'react';
import { api } from '../../../../utils/api';
import { Product } from '../../../types/Product';
import { ProductContainer,Board,Container,ButtonCreate} from './style';

import { CreateProductModal } from '../CreateProductModal';

export function ListProducts(){
  const [isProducts,setIsProducts] = useState<Product[]>([]);
  useEffect(() => {
    api.get('/products').then(({data}) =>{
      setIsProducts(data);
    } );
  },[]);

  const [isVisible,setIsVisible] = useState(false);

  function handleCloseModal(){
    setIsVisible(false);
  }

  return (
    <>
      <CreateProductModal
        visible={isVisible}
        onClose={handleCloseModal}
      />
      <Container>
        {isProducts.length > 0 &&
          <>
            {isProducts.map((isProduct) => (
              <>
                <ProductContainer>
                  <button type='button' key={isProduct._id} style={{backgroundImage: `url(http://127.0.0.1:3001/uploads/${isProduct.imagePath})`}}></button>
                  <div className='infor'>
                    <p className='nameProduct'>{isProduct.name}</p>
                    <p className='priceProduct'>R$ {isProduct.price}</p>
                  </div>
                </ProductContainer>
              </>
            ))}

          </>
        }

      </Container>
      <ButtonCreate onClick={() => setIsVisible(true)}>+</ButtonCreate>
    </>
  );
}
