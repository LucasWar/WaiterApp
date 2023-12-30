export interface Product{
  _id: string;
  name: string;
  description:string;
  imagePath:string;
  price: number;
  ingredients:{
    name: string;
    icon:string;
    id:string;
  },
  category:string;
}
