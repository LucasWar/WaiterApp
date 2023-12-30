export interface Ingredient{
  _id: string;
  name: {
    type: string;
    required: true;
  },
  icon: {
    type: string;
    required: true;
  },
}
