import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Container,OkButton } from './style';
interface orderConfirmeModalProps{
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmModal({visible,onOk}:orderConfirmeModalProps){
  return (
    <Modal
      visible={visible}
      animationType='fade'
    >
      <Container>
        <CheckCircle />
        <Text size={20} weight='600' color='#fff' style={{marginTop: 12}}>Pedido Confirmado</Text>
        <Text color='#fff' opacity={0.9} style={{marginTop: 12}}>Pedido Ja entrou para fila de produção</Text>
        <OkButton onPress={onOk}>
          <Text color='#D73035' weight='600'>OK</Text>
        </OkButton>
      </Container>

    </Modal>
  );
}
