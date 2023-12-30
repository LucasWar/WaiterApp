import { api } from '../../../../utils/api';
import { useEffect, useState } from 'react';
import { Categoriry } from '../../../types/Categories';
import { Container,ButtonCreate,ContainerCatecory } from './style';
import { CreateCategoryModal } from '../ModalCreateCategoy';
import { CategoryModal } from '../ModalCategorie';
export function CreteCategories(){

  const [isCategories,setIsCategories] = useState<Categoriry[]>([]);
  const [isModalVisible,setIsModalVisible] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [isCategoryId,setIsCategoryId] = useState('');
  const [categoryData,setIsCategoryData] = useState<Categoriry>();


  const [isModalCreateVisible,setIsModalCreateVisible] = useState(false);


  async function handleOpenModal(categoryId:string){
    await api.get(`/categories/${categoryId}`).then(({data}) => {
      setIsCategoryData(data);
    });
    setIsCategoryId(categoryId);
    setIsModalVisible(true);
  }

  function handleClosenModal(){
    setIsModalVisible(false);
  }

  function reloadCategories(categoryId:string){
    setIsCategories((prevState) => prevState.filter(category => category._id !== categoryId ));
  }

  function handleCloseModalCreate(){
    setIsModalCreateVisible(false);
  }


  useEffect(() => {
    api.get('/categories').then(({data}) =>{
      setIsCategories(data);

    } );
  },[]);

  return(
    <>
      <CategoryModal
        isLoading={isLoading}
        visible={isModalVisible}
        categoryId={isCategoryId}
        dataCategory={categoryData!}
        closeModal={handleClosenModal}
        onReloadCategories={reloadCategories}
      />



      <CreateCategoryModal
        visible={isModalCreateVisible}
        closeModal={handleCloseModalCreate}
        isLoading={isLoading}
      />
      <Container>
        {isCategories.map((category) => (
          <>

            <ContainerCatecory>
              <button onClick={() => handleOpenModal(category._id)}>
                <div>{`${category.icon}`}</div>
                <div>{`${category.name}`}</div>
              </button>
            </ContainerCatecory>
          </>
        ))}
      </Container>
      <ButtonCreate onClick={() => setIsModalCreateVisible(true)}>+</ButtonCreate>
    </>
  );

}
