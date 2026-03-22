import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from '../models/icustomer';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly requestCustomersUrl = 'https://localhost:32769/api/Customers';
  private readonly requestOperatorsUrl = 'https://localhost:32769/api/Operators';

  constructor(private readonly http: HttpClient) {}

  // Returns a promise of ICustomer[]
  public async fetchCustomers(): Promise<ICustomer[]> {
    return firstValueFrom(this.http.get<ICustomer[]>(this.requestCustomersUrl));
  }

  public async fetchOperators(): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.requestOperatorsUrl));
  }
}