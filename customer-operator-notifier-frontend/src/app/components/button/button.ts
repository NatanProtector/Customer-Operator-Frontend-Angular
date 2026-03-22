import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
	@Input() label = 'Run request';
	@Input() loading = false;
	@Input() disabled = false;
	@Input() loadingText = 'Loading...';
	@Output() btnClick = new EventEmitter<void>();

	handleClick(): void {
		this.btnClick.emit();
	}
}
