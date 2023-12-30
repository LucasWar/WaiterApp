import closeIcon from '../../../../assets/images/close-icon.svg';
import { Overlay,ModalBody, Actions } from './styles';
import { useState } from 'react';
import { api } from '../../../../utils/api';
import { toast } from 'react-toastify';

interface CreateIngredientModallProps{
  visible: boolean;
  closeModal: () => void;
  isLoading: boolean;

}

export  function CreateIngredient({visible, closeModal,isLoading}:CreateIngredientModallProps){
  const [nome,setNome] = useState('');
  const [icone,setIcone] = useState('');

  async function createIngredient(){

    const playLoad = {
      icon: icone,
      name: nome,
    };
    await api.post(('/ingredient'),playLoad);
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
        <form onSubmit={createIngredient}>
          <label>Icone</label>
          <input type="text" onChange={(event) => setIcone(event.target.value)}></input>
          <label>Nome</label>
          <input onChange={(event) => setNome(event.target.value)}></input>
          <Actions>
            <button type='submit' className='primary'><span>✔</span> Cadastrar</button>
            <button type='button' className='secondary' disabled={isLoading} onClick={closeModal}>
              <span>❌</span>
              <strong>Cancelar Cadastro</strong>
            </button>
          </Actions>
        </form>
      </ModalBody>
    </Overlay>
  );
}
