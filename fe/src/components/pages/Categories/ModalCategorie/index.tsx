import closeIcon from '../../../../assets/images/close-icon.svg';
import { Overlay,ModalBody, Actions } from './styles';
import { useState } from 'react';
import { api } from '../../../../utils/api';
import { Categoriry } from '../../../types/Categories';
import { toast } from 'react-toastify';

interface UpdateCategoryModallProps{
  visible: boolean;
  closeModal: () => void;
  isLoading: boolean;
  categoryId: string;
  dataCategory: Categoriry;
  onReloadCategories: (categoryId:string) => void;
}

export  function CategoryModal({visible, closeModal,isLoading,categoryId,dataCategory,onReloadCategories}:UpdateCategoryModallProps){
  const [nome,setNome] = useState('');
  const [icone,setIcone] = useState('');

  async function handleDelete(){
    await api.delete(`/categories/${categoryId}`);
    toast.success('Categoria deletada com sucesso');
    closeModal();
    onReloadCategories(categoryId);
  }


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
            <button type='submit' className='primary' onClick={() => updateCategory(categoryId)}><span>✔</span>Salvar</button>
            <button type='button' className='secondary' disabled={isLoading} onClick={() => handleDelete()}>
              <span>❌</span>
              <strong>Deletar Categoria</strong>
            </button>
          </Actions>
        </form>
      </ModalBody>
    </Overlay>
  );
}
