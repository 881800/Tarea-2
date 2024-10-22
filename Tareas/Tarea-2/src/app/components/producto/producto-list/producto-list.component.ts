import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { IProducto } from '../../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from '../../../services/game.service';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ProductoFormComponent } from '../producto-form/producto-form.component';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ProductoFormComponent
  ],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.scss'
})
export class ProductoListComponent {
  @Input() itemList: IProducto[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: IProducto = {};
  private gameService = inject(ProductoService);
  public modalService = inject(NgbModal);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetailModal(item: IProducto, modal:any) {
    this.selectedItem = {...item};
    modal.show(); 
  }

  onFormEventCalled (params: IProducto) {
    this.gameService.update(params);
    this.modalService.dismissAll();
  }

  deleteGame(game: IProducto) {
    this.gameService.delete(game);
  }
}
