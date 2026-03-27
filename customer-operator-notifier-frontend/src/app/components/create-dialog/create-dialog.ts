import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICustomer } from '../../models/icustomer';
import { IOperator } from '../../models/ioperator';

type CreateEntityType = 'customer' | 'operator';
type NewCustomer = Pick<ICustomer, 'name' | 'operatorId'>;
type NewOperator = Omit<IOperator, 'id'>;

@Component({
  selector: 'app-create-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-dialog.html',
  styleUrl: './create-dialog.css',
})
export class CreateDialogComponent {
  readonly createType = input.required<CreateEntityType>();
  readonly operators = input<IOperator[]>([]);

  readonly onClose = output<void>();
  readonly onCreate = output<NewCustomer | NewOperator>();

  name = '';
  operatorId = '';
  emails = '';

  save = (): void => {
    const trimmedName = this.name.trim();
    if (!trimmedName) {
      alert('Name is required.');
      return;
    }

    if (this.createType() === 'customer') {
      const trimmedOperatorId = this.operatorId.trim();

      if (!trimmedOperatorId) {
        alert('Please select an operator.');
        return;
      }

      this.onCreate.emit({
        name: trimmedName,
        operatorId: trimmedOperatorId,
      });
      this.close();
      return;
    }

    const parsedEmails = this.emails
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email.length > 0);

    if (parsedEmails.length === 0) {
      alert('At least one email is required for an operator.');
      return;
    }

    this.onCreate.emit({
      name: trimmedName,
      emails: parsedEmails,
    });
    this.close();
  }

  close = (): void => {
    this.onClose.emit();
  }

}
