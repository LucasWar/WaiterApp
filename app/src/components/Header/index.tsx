import { Container,ContentOrder,OrderHeader, Table } from './style';
import { Text } from '../Text';
import { TouchableOpacity } from 'react-native';

interface headerProsp{
  selectedTable: string;
  onCancelOrder: () => void;
}

export function Header({selectedTable,onCancelOrder}:headerProsp){
  return(
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>Bem vindo(a) ao</Text>
          <Text size={24} weight="700">WAITER<Text size={24}>APP</Text></Text>
        </>
      )}

      <ContentOrder>
        <OrderHeader>
          <Text size={24} weight='600'>Pedido</Text>
          <TouchableOpacity onPress={onCancelOrder}>
            <Text color='#D73035' weight='600' size={14}>Cancelar pedido</Text>
          </TouchableOpacity>
        </OrderHeader>
        <Table>
          <Text color='#666666'>Mesa {selectedTable}</Text>
        </Table>
      </ContentOrder>
    </Container>
  );
}
