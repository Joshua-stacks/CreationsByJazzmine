export interface IProductOptions {
  [key: string]: string[] | boolean;
}

export interface IProduct {
  name: string;
  category: string;
  price: string;
  image_src: string;
  min: number;
  max: number;
  options: IProductOptions;
  _id: string;
}

export interface Item {
  item: IProduct;
  count: number;
}
