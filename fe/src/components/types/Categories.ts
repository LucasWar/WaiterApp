export interface Categoriry{
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
