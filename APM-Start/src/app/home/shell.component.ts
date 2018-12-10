import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pm-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  sub: Subscription;
  pageTitle: string = 'Products';
  monthCount: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.sub = this.productService.selectedProductChanges$.subscribe(selectedProduct => {
      if (selectedProduct) {
        const start = new Date(selectedProduct.releaseDate);
        const now = new Date();
        this.monthCount = now.getMonth() - start.getMonth()
          + (12 * (now.getFullYear() - start.getFullYear()));
      } else {
        this.monthCount = 0;
      }
    });
  }

}
