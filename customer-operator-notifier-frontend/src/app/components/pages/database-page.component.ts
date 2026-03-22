import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Button } from '../button/button';

interface Customer {
  id: string;
  name: string;
  operatorId: string;
  operatorName: string;
}

@Component({
  selector: 'app-database-page',
  standalone: true,
  imports: [Button],
  template: `
    <section class="database-page">
      <h1>Database</h1>
      <p>Fetch customers from the API and display their operator mapping.</p>

      <app-button
        label="Fetch Data"
        [loading]="isLoading()"
        (btnClick)="fetchData()"
      />

      @if (errorMessage()) {
        <p class="error">{{ errorMessage() }}</p>
      }

      @if (customers().length > 0) {
        <table class="customers-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Operator Name</th>
            </tr>
          </thead>
          <tbody>
            @for (customer of customers(); track customer.id) {
              <tr>
                <td>{{ customer.name }}</td>
                <td>{{ customer.operatorName }}</td>
              </tr>
            }
          </tbody>
        </table>
      } @else if (!isLoading()) {
        <p class="note">No customer data loaded yet.</p>
      }
    </section>
  `,
  styles: [
    `
      .database-page {
        max-width: 900px;
        margin: 2rem auto;
        padding: 0 1rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }

      h1 {
        margin: 0 0 0.75rem;
        font-size: 2rem;
      }

      p {
        margin: 0 0 1rem;
      }

      .note {
        color: #495057;
      }

      .error {
        color: #c92a2a;
        font-weight: 600;
      }

      .customers-table {
        margin-top: 0.85rem;
        width: 100%;
        border-collapse: collapse;
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid #dee2e6;
        background: #ffffff;
      }

      .customers-table th,
      .customers-table td {
        padding: 0.9rem 1rem;
        text-align: left;
      }

      .customers-table thead {
        background: #f8f9fa;
      }

      .customers-table tbody tr + tr {
        border-top: 1px solid #e9ecef;
      }

      .customers-table tbody tr:hover {
        background: #f8fbff;
      }
    `
  ]
})
export class DatabasePageComponent {
  readonly requestUrl = 'https://localhost:32769/api/Customers';
  readonly customers = signal<Customer[]>([]);
  readonly errorMessage = signal('');
  readonly isLoading = signal(false);

  constructor(private readonly http: HttpClient) {}

  fetchData = (): void => {
    this.errorMessage.set('');
    this.isLoading.set(true);
    this.customers.set([]);

    this.http.get<Customer[]>(this.requestUrl).subscribe({
      next: (data) => {
        this.customers.set(data);
        this.isLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.set(error.message);
        this.isLoading.set(false);
      }
    });
  }
}
