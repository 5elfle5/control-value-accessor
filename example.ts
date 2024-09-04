
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
  selector: 'app-text-input',
  template: `
    <p-iconField iconPosition="right">
      <input
        type="text"
        [value]="value"
        pInputText
        class="w-[600px]"
        [ngClass]="{
          error: hasError
        }"
        (input)="onInputChange($event)"
        (blur)="onTouched()"
      />
    </p-iconField>
    @if(hasError) {
    <div>
      <span class="validation-error" *ngIf="control?.hasError('required')">
        <span class="pi pi-exclamation-circle"></span>
        This field is required.
      </span>
    </div>
    }
  `,
  standalone: true,
  imports: [CommonModule, InputTextModule, IconFieldModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() control: AbstractControl | null = null;

  private _value: any = '';

  public hasError = false;

  get value() {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.onChange(val);
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  onInputChange(event: any) {
    this.value = event.target.value;
    if (this.control) {
      this.validate();
    }
  }

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = () => {
      fn();
      if (this.control) {
        this.validate();
      }
    };
  }

  setDisabledState?(): void {}

  validate() {
    this.hasError =
      (this.control?.invalid &&
        (this.control?.dirty || this.control?.touched)) ??
      false;
  }
}
