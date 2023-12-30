import { BoxItem } from './style';

interface ItemMemuProps{
  name: string;
  icon: string;
  status: string;
}
export function ItemMenu({name,icon,status}:ItemMemuProps){
  return(
    <BoxItem style={status == 'active'?{color: 'red'}:{}}>
      <p>{icon}</p>
      <p>{name}</p>
    </BoxItem>
  );
}
