import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from '../models/icustomer';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly requestBaseUrl = 'https://localhost:32775/api';
  private readonly requestCustomersUrl = `${this.requestBaseUrl}/Customers`;
  private readonly requestOperatorsUrl = `${this.requestBaseUrl}/Operators`;

  constructor(private readonly http: HttpClient) {}

  // Returns a promise of ICustomer[]
  public async fetchCustomers(): Promise<ICustomer[]> {
    return firstValueFrom(this.http.get<ICustomer[]>(this.requestCustomersUrl));
  }

  public async fetchOperators(): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.requestOperatorsUrl));
  }

  public async updateCustomer(customer: ICustomer): Promise<boolean> {
    console.log('Updating Customer:', customer);
    // TODO: Implement API call when update endpoint is available
    // return firstValueFrom(this.http.put<boolean>(`${this.requestCustomersUrl}/${customer.id}`, customer));
    
    // Simulating API response - returns true for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, 500);
    });
  }

  public async updateOperator(operator: any): Promise<boolean> {
    console.log('Updating Operator:', operator);
    // TODO: Implement API call when update endpoint is available
    // return firstValueFrom(this.http.put<boolean>(`${this.requestOperatorsUrl}/${operator.id}`, operator));
    
    // Simulating API response - returns true for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, 500);
    });
  }
}