import { CriteriaComponent } from './../shared/criteria/criteria.component';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList
} from '@angular/core';

import { Observable} from 'rxjs/Observable';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel, NgForm } from '@angular/forms';
import { ProductParameterService } from './product-parameter.service';
import { Subject } from 'rxjs/Subject';
import { take, publish, refCount, share, multicast } from 'rxjs/operators';


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;
  filteredProducts: IProduct[];
  products: IProduct[];
  includeDetail: boolean = true;
  parentListFilter: string;


  @ViewChild(NgModel) filterInput: NgModel; /* Esto retorna una referencia de angular a la cual
                                               usando el metodo valueChange puede suscribirme y cada que el usuario realice una
                                               modificacion en el input se ejecutará el codigo en la funcion observable, es como
                                               la funcion setter solo que con observables */
  @ViewChild(NgForm) laForma: NgForm; /* Esto retorna una referencia de angular siempre y cuando en la
                                        palntilla haya una etiqueta form*/
  @ViewChildren('filterElement, nameElement') inputElementRefs: QueryList<ElementRef>;
  @ViewChildren(NgModel) ngModels: QueryList<NgModel>;

  @ViewChild('filterCriteria') filterComponent: CriteriaComponent; // retorna la referencia al componente CriteriaComponent
  // hace lo mismo  que la linea anterior
  // @ViewChild(CriteriaComponent)  filterComponent2: CriteriaComponent;

  constructor(private productService: ProductService,
              private productParameterService: ProductParameterService ) {}

  get showImage(): boolean {
    return this.productParameterService.showImage;
  }
  set showImage(value: boolean) {
    this.productParameterService.showImage = !this.productParameterService.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.filterComponent.listFilter = this.productParameterService.filterBy;
        this.products = products;
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  ngAfterViewInit(): void {
  /*console.log('filterInput ', this.filterInput);
    console.log('laForma ', this.laForma);
    console.log('inputElementRefs ', this.inputElementRefs);
    console.log('ngModels ', this.ngModels);
 */


/*     if (this.filterComponent.modelRef) {
      this.filterInput.valueChanges.subscribe(value => {
        this.performFilter(this.productParameterService.filterBy);
      });
    }
    this.parentListFilter = this.filterComponent.listFilter; */
  }

  toggleImage(): void {
    // this.showImage = !this.showImage;
    this.productParameterService.showImage = !this.productParameterService.showImage;
  }


  performFilter(filterBy?: string): void {
    if (filterBy ) {
        this.filteredProducts = this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
        this.filteredProducts = this.products;
    }
  }

  onValueChange(value: string) {
    this.productParameterService.filterBy = value;
    this.performFilter(value);
  }

  /*     onFilterChange(filter: string): void {
        this.listFilter = filter;
        this.performFilter(this.listFilter);
      } */
}
