import { AuthService } from './../../../services/auth.service';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IProduct } from '../../../interfaces';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() title: string  = '';
  @Input() products: IProduct[] = [];
  @Output() callModalAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callDeleteAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  public AuthService: AuthService = inject(AuthService);
}