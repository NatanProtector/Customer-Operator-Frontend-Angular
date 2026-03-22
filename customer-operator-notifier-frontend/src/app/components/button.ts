import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-button',
	standalone: true,
	template: `
		<button
			type="button"
			class="modern-btn"
			[disabled]="disabled || loading"
			(click)="handleClick()"
		>
			<span class="modern-btn__shine"></span>
			<span class="modern-btn__label">{{ loading ? loadingText : label }}</span>
		</button>
	`,
	styles: [
		`
			.modern-btn {
				position: relative;
				border: 0;
				border-radius: 12px;
				padding: 0.72rem 1.15rem;
				font-size: 0.95rem;
				font-weight: 600;
				color: #ffffff;
				letter-spacing: 0.01em;
				cursor: pointer;
				overflow: hidden;
				background: linear-gradient(135deg, #0f6ad8 0%, #0ca678 100%);
				box-shadow: 0 10px 24px rgba(12, 106, 216, 0.28);
				transition: transform 140ms ease, box-shadow 140ms ease, filter 140ms ease;
			}

			.modern-btn:hover:not(:disabled) {
				transform: translateY(-1px);
				box-shadow: 0 14px 30px rgba(12, 106, 216, 0.34);
				filter: saturate(1.08);
			}

			.modern-btn:active:not(:disabled) {
				transform: translateY(0);
			}

			.modern-btn:disabled {
				cursor: not-allowed;
				opacity: 0.7;
			}

			.modern-btn__shine {
				content: '';
				position: absolute;
				inset: 0;
				background: linear-gradient(
					120deg,
					rgba(255, 255, 255, 0) 20%,
					rgba(255, 255, 255, 0.34) 48%,
					rgba(255, 255, 255, 0) 78%
				);
				transform: translateX(-140%);
				transition: transform 420ms ease;
			}

			.modern-btn:hover:not(:disabled) .modern-btn__shine {
				transform: translateX(120%);
			}

			.modern-btn__label {
				position: relative;
				z-index: 1;
			}
		`
	]
})
export class ButtonComponent {
	@Input() label = 'Run request';
	@Input() loading = false;
	@Input() disabled = false;
	@Input() loadingText = 'Loading...';
	@Output() btnClick = new EventEmitter<void>();

	handleClick(): void {
		this.btnClick.emit();
	}
}
