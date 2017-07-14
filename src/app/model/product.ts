import { Injectable } from '@angular/core';

export interface ProductCart {
  product: string;
  quantity: number;
}

@Injectable()
export class Product {
  public id: number;
  public name: string;
  public price: number;

  private static getProductQntyById(ids: Array<ProductCart>, id: number) {
    const array = ids.filter((i) => {
      return parseInt(i.product, 10) === id;
    });
    return array.length ? array[0].quantity : 1;
  }

  public static getProductById(id: number, products: Array<Product>): Product {
    return products.find((p) => {
      return p.id === id;
    });
  }

  public static getProductsTotalPrice(ids: Array<ProductCart>, products: Array<Product>): number {
    const intIds = ids.map((item: ProductCart) => {
      return parseInt(item.product, 10);
    });

    const pIds = products.filter((p) => {
      return intIds.indexOf(p.id) >= 0;
    });
    return pIds.reduce((sum, current) => {
      return sum + current.price * Product.getProductQntyById(ids, current.id);
    }, 0);
  }
}

