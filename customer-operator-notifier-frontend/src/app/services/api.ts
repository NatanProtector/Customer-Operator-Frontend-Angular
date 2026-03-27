import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from '../models/icustomer';
import { IOperator } from '../models/ioperator';
import { firstValueFrom } from 'rxjs';

type NewCustomer = Pick<ICustomer, 'name' | 'operatorId'>;
type NewOperator = Omit<IOperator, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly requestBaseUrl = 'https://localhost:5006/api';
  private readonly requestCustomersUrl = `${this.requestBaseUrl}/Customers`;
  private readonly requestOperatorsUrl = `${this.requestBaseUrl}/Operators`;
  private readonly requestAddCustomerUrl = `${this.requestBaseUrl}/Customers`;
  private readonly requestAddOperatorUrl = `${this.requestBaseUrl}/Operators`;
  

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

  public async addCustomer(customer: NewCustomer): Promise<boolean> {
    console.log('Adding Customer:', customer);
    return firstValueFrom(this.http.post<any>(this.requestAddCustomerUrl, customer));

  }

  public async addOperator(operator: NewOperator): Promise<boolean> {
    console.log('Adding Operator:', operator);
    return firstValueFrom(this.http.post<any>(this.requestAddOperatorUrl, operator));
  }
}