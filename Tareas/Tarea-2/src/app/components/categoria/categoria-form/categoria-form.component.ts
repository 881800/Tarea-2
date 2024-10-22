import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategoria } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.scss'
})
export class CategoriaFormComponent {
  @Input() title: string = '';
  @Input() toUpdateCategoria: ICategoria = {};
  @Output() callParentEvent: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();

  addEdit()  {
    this.callParentEvent.emit(this.toUpdateCategoria);
  }
}
