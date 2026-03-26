import { Component, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICustomer } from '../../models/icustomer';
import { IOperator } from '../../models/ioperator';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-dialog.html',
  styleUrls: ['./edit-dialog.css'],
})
export class EditDialogComponent {
  readonly customer = input<ICustomer | null>(null);
  readonly operator = input<IOperator | null>(null);

  readonly onClose = output<void>();
  readonly onSave = output<ICustomer | IOperator>();

  editedName: string = '';
  editedEmails: string = '';

  constructor() {
    effect(() => {
      if (this.customer()) {
        this.editedName = this.customer()?.name || '';
      } else if (this.operator()) {
        this.editedName = this.operator()?.name || '';
        this.editedEmails = this.operator()?.emails.join(', ') || '';
      }
    });
  }

  save() {
    if (this.customer()) {
      const updatedCustomer: ICustomer = {
        ...this.customer()!,
        name: this.editedName,
      };
      this.onSave.emit(updatedCustomer);
    } else if (this.operator()) {
      const updatedOperator: IOperator = {
        ...this.operator()!,
        name: this.editedName,
        emails: this.editedEmails.split(',').map(email => email.trim()),
      };
      this.onSave.emit(updatedOperator);
    }
    this.close();
  }

  close() {
    this.onClose.emit();
  }
}
