import { Component, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Button } from '../button/button';

interface Customer {
  id: string;
  name: string;
  operatorId: string;
  operatorName: string;
}

@Component({
  selector: 'app-database-page',
  imports: [Button],
  templateUrl: './database-page.html',
  styleUrl: './database-page.css',
})
export class DatabasePage {
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
