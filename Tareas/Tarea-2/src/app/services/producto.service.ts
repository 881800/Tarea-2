import { Injectable, inject, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IGame, IProducto } from '../interfaces';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseService<IProducto>{
  protected override source: string = 'productos';
  private itemListSignal = signal<IProducto[]>([]);
  private snackBar = inject(MatSnackBar);
  
  get items$() {
    return this.itemListSignal
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.itemListSignal.set(response);
      },
      error: (error : any) => {
        console.log('error', error);
      }
    });
  }

  public save(item: IProducto) {
    this.add(item).subscribe({
      next: (response: any) => {
        this.itemListSignal.update((producto: IProducto[]) => [response, ...producto]);
      },
      error: (error : any) => {
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('error', error);
        console.error('error', error);
      }
    })
  } 


  public update(item: IProducto){

    this.add(item).subscribe({
  
      next: (response: any) => {
        const updatedItems = this.itemListSignal().map(product => product.id === item.id ? item : product);
  
          this.itemListSignal.set(updatedItems);
      },
      error: (error : any) => {
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('error', error);
        console.error('error', error);
      }
    })
  }

  public delete(producto: IProducto) {
    this.del(producto.id).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().filter((p: IProducto) => p.id != producto.id);
        this.itemListSignal.set(updatedItems);
      },
      error: (error : any) => {
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('error', error);
      }
    })
  }
}