import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ICategoria } from '../../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaService } from '../../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { CategoriaFormComponent } from '../categoria-form/categoria-form.component';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    CategoriaFormComponent
  ],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.scss'
})
export class CategoriaListComponent {
  @Input() itemList: ICategoria[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: ICategoria = {};
  private categoriaService = inject(CategoriaService);
  public modalService = inject(NgbModal);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetailModal(item: ICategoria, modal: any) {
    this.selectedItem = { ...item };
    modal.show();
  }

  onFormEventCalled(params: ICategoria) {
    this.categoriaService.update(params);
    this.modalService.dismissAll();
  }

  deleteCategoria(categoria: ICategoria) {
    this.categoriaService.delete(categoria);
  }
}
