import { Modal, TouchableOpacity,Platform } from 'react-native';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Form, Header, Input, ModalBody, Overlay } from './style';
import { useState } from 'react';

interface TableModalProps{
    'visible': boolean;
    onClose: () => void;
    onSave: (table:string) => void;

}

export function TableModal({visible,onClose,onSave}:TableModalProps){

  const [table,setTable] = useState('');

  function handleSave(){
    setTable('');
    onSave(table);
    onClose();
  }

  return(
    <Modal
      animationType='fade'
      visible={visible}
      transparent
    >
      <Overlay behavior={Platform.OS === 'android' ? 'height':'padding'}>
        <ModalBody>
          <Header>
            <Text weight='600'>Infrome a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color='#666666'/>
            </TouchableOpacity>

          </Header>

          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor="#666666"
              keyboardType='number-pad'
              onChangeText={setTable}
            />
            <Button onPress={handleSave} disabled={table.length === 0}>Salvar</Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
