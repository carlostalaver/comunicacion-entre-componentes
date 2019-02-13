import { Component, OnInit, ViewChild, ElementRef,
         AfterViewInit, Input, OnChanges, SimpleChanges,
         Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('filterElement') filterElementRef: ElementRef; /* esto es HTHL */
  @ViewChild(NgModel) modelRef: NgModel;

  @Input() displayDetail: boolean;
  @Input() hitCount: number;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  hitMessage: string;

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    setTimeout(() => {
      this.valueChange.emit(value);
    }, 50);
  }

  private _hitCountTest: number;
  get hitCountTest(): number {
    return this._hitCountTest;
  }
  @Input()
  set hitCountTest(value: number) {
     this._hitCountTest = value;
  }


  constructor() { }

  ngOnInit() {
  }


  ngAfterViewInit(): void {
    if (this.filterElementRef) {
      this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'Sin coincidencias';
    } else {
      this.hitMessage = 'Coincidencias ' + this.hitCount;
    }
  }
}
