import { Component, signal } from '@angular/core';
import { Button } from '../button/button';
import { ApiService } from '../../services/api';
import { ICustomer } from '../../models/icustomer';
import { IOperator } from '../../models/ioperator';

@Component({
  selector: 'app-database-page',
  imports: [Button],
  templateUrl: './database-page.html',
  styleUrls: ['./database-page.css'], // note plural: styleUrls
})
export class DatabasePage {
  readonly customers = signal<ICustomer[]>([]);
  readonly operators = signal<IOperator[]>([]);
  readonly errorMessage = signal('');
  readonly isLoading = signal(false);

  constructor(private readonly apiService: ApiService) {}

  fetchData = async (): Promise<void> => {
    await Promise.all([this.fetchCustomerData(), this.fetchOperatorData()]);
  }

  fetchCustomerData = async (): Promise<void> => {
    this.errorMessage.set('');
    this.isLoading.set(true);
    this.customers.set([]);

    try {
      const data = await this.apiService.fetchCustomers();
      this.customers.set(data);
    } catch (error: any) {
      this.errorMessage.set(error?.message || 'Unknown error');
    } finally {
      this.isLoading.set(false);
    }
  }

  fetchOperatorData = async (): Promise<void> => {
    this.errorMessage.set('');
    this.isLoading.set(true);
    this.operators.set([]);

    try {
      const data = await this.apiService.fetchOperators();
      this.operators.set(data);
    } catch (error: any) {
      this.errorMessage.set(error?.message || 'Unknown error');
    } finally {
      this.isLoading.set(false);
    }
  }
}