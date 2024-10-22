import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategoria, IProducto } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { LoaderComponent } from '../../loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.scss'
})
export class ProductoFormComponent {
  getCategoriId(){
    return this.toUpdateProducto.categoria ? this.toUpdateProducto.categoria.id || '' : '';
  }
  setCategoryId(value: string){
    if(this.toUpdateProducto.categoria){
      this.toUpdateProducto.categoria.id = Number(value);
    }else{
      this.toUpdateProducto.categoria = {id: Number(value)} as ICategoria;}
  
  }
  @Input() title: string = '';
  @Input() toUpdateProducto: IProducto = {};
  @Output() callParentEvent: EventEmitter<IProducto> = new EventEmitter<IProducto>();

  constructor(public categoriaService: CategoriaService) { 
    this.categoriaService.getAll();
  }
  addEdit()  {
    this.callParentEvent.emit(this.toUpdateProducto);
  }
}
