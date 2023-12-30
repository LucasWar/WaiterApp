import { itemsNavBar } from './itemsNav';
export function urlFind(url:string){
  const item = itemsNavBar.find((itemNavBar) => itemNavBar.path === url);
  if(item === null){
    return 'teste';
  }
  else{
    return item?.name;
  }
}
