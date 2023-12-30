import closeIcon from '../../../../assets/images/close-icon.svg';
import { Overlay,ModalBody, Actions } from './styles';
import { useState } from 'react';
import { api } from '../../../../utils/api';
import { Categoriry } from '../../../types/Categories';

interface UpdateCategoryModallProps{
  visible: boolean;
  closeModal: () => void;
  isLoading: boolean;
  categoryId: string;
  dataCategory: Categoriry;
}

export  function UpdateCategoryModal({visible, closeModal,isLoading,categoryId,dataCategory}:UpdateCategoryModallProps){
  const [nome,setNome] = useState('');
  const [icone,setIcone] = useState('');




  async function updateCategory(categoryId:string){

    const playLoad = {
      icon: icone? icone : dataCategory.icon,
      name: nome? nome : dataCategory.name,
    };
    await api.patch((`/categories/${categoryId}`),playLoad);
    closeModal();
  }

  if(!visible){
    return null;
  }

  return (
    <Overlay>
      <ModalBody>
        <header>
          <button type='button' onClick={closeModal}>
            <img src={closeIcon} alt="Fecha Modal"/>
          </button>
        </header>
        <form>
          <label>Icone</label>
          <input type="text" onChange={(event) => setIcone(event.target.value)}  defaultValue={`${dataCategory.icon}`}></input>
          <label>Nome</label>
          <input onChange={(event) => setNome(event.target.value)} defaultValue={`${dataCategory.name}`}></input>
          <Actions>
            <button type='submit' className='primary' onClick={() => updateCategory(categoryId)}><span>✔</span> Atualizar</button>
            <button type='button' className='secondary' disabled={isLoading} onClick={closeModal}>
              <span>❌</span>
              <strong>Cancelar Atualização</strong>
            </button>
          </Actions>
        </form>
      </ModalBody>
    </Overlay>
  );
}
