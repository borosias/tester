import { Component } from '@angular/core';
import { take } from 'rxjs';

import { ConvertType } from './models/convert-type';
import { CurrencyConfig } from './models/currency-config';
import { CurrencyOption } from './models/currency-option';

import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tester';

  public currencyOptions: CurrencyConfig = {
    to: {
      amount: 0,
      currency: 'UAH',
    },
    from: {
      amount: 0,
      currency: 'UAH',
    },
  };

  public initalRates: Record<string, number> = {};

  public readonly supportedCurrencies: string[] = [
    'UAH',
    'USD',
    'EUR'
  ];

  constructor (private currencyService: CurrencyService) {
    this.getInitialRates();
  }

  public handleCurrencyChange(currency: string, from: ConvertType): void { 
    this.setConvertedValues({ currency }, from)
  }

  public handleAmountChange(amount: number, from: ConvertType): void { 
    this.setConvertedValues({ amount }, from)
  }

  private getInitialRates(initCurrency = 'UAH'): void {
    this.supportedCurrencies
      .filter(currency => currency !== initCurrency)
      .forEach(currency => {
        this.currencyService
          .getCurrencyValue(currency)
          .pipe(take(1))
          .subscribe(({ rates }) => {
              this.initalRates[currency] = rates[initCurrency]
            })
      });
  }

  private setConvertedValues(values: Partial<CurrencyOption>, from: ConvertType): void {
    this.currencyOptions[from] = {
      ...this.currencyOptions[from],
      ...values,
    }

    const applyTo = this.getOppositeType(from);
    const { amount, currency } = this.currencyOptions[from];

    if (!currency || !this.currencyOptions[applyTo].currency) return;

    this.currencyService
      .getCurrencyValue(currency)
      .pipe(take(1))
      .subscribe(({ rates }) => {
        const convertingCurrency = this.currencyOptions[applyTo].currency;

        this.currencyOptions[applyTo].amount = Math.floor(rates[convertingCurrency] * amount * 100) / 100; 
      });
  }

  private getOppositeType(type: ConvertType): ConvertType {
    return type === 'from' ? 'to' : 'from';
  }
}
