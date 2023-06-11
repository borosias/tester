import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.css']
})
export class CurrencyInputComponent {
  @Input() public selectedCurrency: string = '';
  @Input() public currencyAmount: number = 0;
  
  @Input() public currencies: string[] = [];
  @Input() public title: string = '';

  @Output() currencyAmountChange = new EventEmitter<number>();
  @Output() selectedCurrencyChange = new EventEmitter<string>();

}
