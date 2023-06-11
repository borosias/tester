import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs';

import { CurrencyPriceResponse } from '../models/currency-price';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor (private http: HttpClient) {}

  private readonly url: string = 'https://api.exchangerate.host/latest';

  public getCurrencyValue(currency: string): Observable<CurrencyPriceResponse> {
    return this.http.get<CurrencyPriceResponse>(`${this.url}?base=${currency}`);
  }
}
