import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';
    product: IProduct | null;
    subs: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit() {
     this.subs = this.productService.selectedProductChanges$.subscribe( (data: IProduct) => this.product = data);
    }

    ngOnDestroy(): void {
      this.subs.unsubscribe();
    }

/*  get product(): IProduct | null {
      return this.productService.currentProduct;
    } */

}
