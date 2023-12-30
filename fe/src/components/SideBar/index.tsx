import { ItemMenu } from '../ItemMenu';
import waicon from '../../assets/images/WAIcon.svg';
import {IconBox, Container,IconsMenu} from './style';
export function Sidebar(){
  return(
    <Container>
      <IconBox>
        <img src={waicon}/>
      </IconBox>
      <ItemMenu
        name="Home"
        icon="😀"
        status='active'
      />
      <ItemMenu
        name="Historico"
        icon="😀"
        status='disable'
      />
      <ItemMenu
        name="Cardapio"
        icon="😀"
        status='disable'
      />
      <ItemMenu
        name="Usuários"
        icon="😀"
        status='disable'
      />
    </Container>
  );
}

