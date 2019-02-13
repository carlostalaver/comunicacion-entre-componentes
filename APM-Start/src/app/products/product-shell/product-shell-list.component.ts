import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products';
  errorMessage: string;
  products: IProduct[];
  selectedProduct: IProduct | null;
  subscrip: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.subscrip = this.productService.selectedProductChanges$
                                        .subscribe( (data: IProduct) => this.selectedProduct = data);
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = <any>error
      );
    }

  ngOnDestroy(): void {
   this.subscrip.unsubscribe();
  }


  onSelected(product: IProduct) {
    this.productService.changeSelectProduct(product);
  }
}

