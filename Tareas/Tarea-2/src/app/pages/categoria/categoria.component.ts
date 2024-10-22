import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ICategoria } from '../../interfaces'; 
import { LoaderComponent } from '../../components/loader/loader.component';
import { CategoriaListComponent } from '../../components/categoria/categoria-list/categoria-list.component'; 
import { ModalComponent } from '../../components/modal/modal.component';
import { CategoriaFormComponent } from '../../components/categoria/categoria-form/categoria-form.component'; 

@Component({
  selector: 'app-categoria', 
  standalone: true, 
  imports: [
    LoaderComponent,
    CategoriaListComponent,
    ModalComponent,
    CategoriaFormComponent 
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit {
  public categoriaService: CategoriaService = inject(CategoriaService);
  public modalService: NgbModal = inject(NgbModal);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public areActionsAvailable: boolean = false;

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.categoriaService.getAll(); 
    this.route.data.subscribe(data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  onFormEventCalled(params: ICategoria) { 
    this.categoriaService.save(params); 
    this.modalService.dismissAll();
  }
}
