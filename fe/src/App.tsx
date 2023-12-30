import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyles, ContainerMenu } from './styles/GlobalStyles';
import { Header } from './components/Header';
import { Sidebar } from './components/SideBar';
import { Outlet } from 'react-router-dom';
import { Orders } from './components/Orders';
export function App(){
  return (
    <>
      <GlobalStyles />
      <ContainerMenu>
        <Sidebar />
        <Header />
      </ContainerMenu>

      <Outlet />
      <ToastContainer position='bottom-center'/>
    </ >
  );
}

