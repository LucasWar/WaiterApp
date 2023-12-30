import closeIcon from '../../../../assets/images/close-icon.svg';
import { Overlay,ModalBody, Actions,Text } from './styles';
import { useState } from 'react';
import { api } from '../../../../utils/api';
import { toast } from 'react-toastify';

interface DeleteCategoryModallProps{
  visible: boolean;
  idDeleteCategory: string;
  onClose: () => void;
  onReloadCategories: (categoryI:string) => void;
}

export  function DeleteCategoryModal({visible,idDeleteCategory,onClose,onReloadCategories}:DeleteCategoryModallProps){
  if(!visible){
    return null;
  }

  async function handleDelete(){
    await api.delete(`/categories/${idDeleteCategory}`);
    toast.success('Categoria deletada com sucesso');
    onClose();
    onReloadCategories(idDeleteCategory);
  }



  return (
    <Overlay>
      <ModalBody>
        <Text>Deseja realmente apagar essa Categoria ?</Text>
        <Actions>
          <button type='submit' onClick={() => handleDelete()} className='primary'><span>✔</span>Deletar</button>
          <button type='button' onClick={onClose} className='secondary'>Cancelar</button>
        </Actions>

      </ModalBody>
    </Overlay>
  );
}
