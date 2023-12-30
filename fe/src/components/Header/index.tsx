import { useLocation } from 'react-router-dom';
import { urlFind } from '../../utils/urlFind';
import logo from '../../assets/images/logo.svg';
import { Container, Content,Text } from './styles';


export function Header() {
  const location = useLocation();


  return (
    <>


      <Container>

        <Content>
          <Text>
            <div className="page-datails">
              <h1>{urlFind(location.pathname)}</h1>
              <h2>Acompanhe os pedidos dos clientes</h2>
            </div>
            <div className="page-reset">
              <h2>Reiniciar o dia</h2>
            </div>
          </Text>
          {/*<img src={logo} alt="WAITERAPP" />*/}
        </Content>

      </Container>
    </>
  );
}
