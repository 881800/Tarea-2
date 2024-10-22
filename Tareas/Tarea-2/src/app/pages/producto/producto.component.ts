import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IProducto } from '../../interfaces';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductoListComponent } from '../../components/producto/producto-list/producto-list.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ProductoFormComponent } from '../../components/producto/producto-form/producto-form.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    LoaderComponent,
    ProductoListComponent,
    ModalComponent,
    ProductoFormComponent
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent implements OnInit{
  public productoService: ProductoService = inject(ProductoService);
  public modalService: NgbModal = inject(NgbModal);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public areActionsAvailable: boolean = false;

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.productoService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  onFormEventCalled (params: IProducto) {
    this.productoService.save(params);
    this.modalService.dismissAll();
  }
}
