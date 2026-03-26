import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';
import { EditDialogComponent } from '../edit-dialog/edit-dialog';
import { ApiService } from '../../services/api';
import { ICustomer } from '../../models/icustomer';
import { IOperator } from '../../models/ioperator';

@Component({
  selector: 'app-database-page',
  imports: [Button, CommonModule, EditDialogComponent],
  templateUrl: './database-page.html',
  styleUrls: ['./database-page.css'], // note plural: styleUrls
})
export class DatabasePage {
  readonly customers = signal<ICustomer[]>([]);
  readonly operators = signal<IOperator[]>([]);
  readonly errorMessage = signal('');
  readonly isLoading = signal(false);
  readonly selectedCustomer = signal<ICustomer | null>(null);
  readonly selectedOperator = signal<IOperator | null>(null);
  readonly isDialogOpen = signal(false);

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

  openCustomerEditDialog = (customer: ICustomer): void => {
    console.log('Editing Customer:', {
      id: customer.id,
      name: customer.name,
      operatorId: customer.operatorId,
      operatorName: customer.operatorName,
    });
    this.selectedCustomer.set(customer);
    this.selectedOperator.set(null);
    this.isDialogOpen.set(true);
  }

  openOperatorEditDialog = (operator: IOperator): void => {
    console.log('Editing Operator:', {
      id: operator.id,
      name: operator.name,
      emails: operator.emails,
    });
    this.selectedOperator.set(operator);
    this.selectedCustomer.set(null);
    this.isDialogOpen.set(true);
  }

  closeDialog = (): void => {
    this.isDialogOpen.set(false);
    this.selectedCustomer.set(null);
    this.selectedOperator.set(null);
  }

  handleSave = async (data: ICustomer | IOperator): Promise<void> => {
    if ('operatorName' in data) {
      // It's a customer
      const success = await this.apiService.updateCustomer(data);
      if (success) {
        // Update the customers array with the modified customer
        const updatedCustomers = this.customers().map(c => 
          c.id === data.id ? data : c
        );
        this.customers.set(updatedCustomers);
        console.log('Customer updated successfully');
      } else {
        alert('Failed to update customer.');
        console.log('Failed to update customer');
      }
    } else {
      // It's an operator
      const success = await this.apiService.updateOperator(data);
      if (success) {
        // Update the operators array with the modified operator
        const updatedOperators = this.operators().map(o => 
          o.id === data.id ? data : o
        );
        this.operators.set(updatedOperators);
        console.log('Operator updated successfully');
      } else {
        alert('Failed to update operator. Please try again.');
        console.log('Failed to update operator');
      }
    }
    this.closeDialog();
  }
}