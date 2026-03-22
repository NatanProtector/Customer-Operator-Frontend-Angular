import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from '../models/icustomer';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly requestUrl = 'https://localhost:32769/api/Customers';

  constructor(private readonly http: HttpClient) {}

  // Returns a promise of ICustomer[]
  public async fetchCustomers(): Promise<ICustomer[]> {
    return firstValueFrom(this.http.get<ICustomer[]>(this.requestUrl));
  }
}