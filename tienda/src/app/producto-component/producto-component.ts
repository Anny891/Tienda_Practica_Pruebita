import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'

interface nuevoProducto {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  existencias: number;
}

@Component({
  selector: 'app-producto-component',
  imports: [FormsModule],
  templateUrl: './producto-component.html',
  styleUrl: './producto-component.css',
})
export class ProductoComponent {

  productos: nuevoProducto[] = [];


  guardarEnLocalStore(){
    localStorage.setItem('productosTienda', JSON.stringify(this.productos));
  }

  constructor (private router: Router) {

    if (localStorage.getItem('sesionTienda') !== 'si'){
      this.router.navigate(['/login']);
    }

    const datos = localStorage.getItem('productosTienda');

    if (datos !== null){
      this.productos = JSON.parse(datos);
    }
  }

  cerrarSesion(){
    localStorage.removeItem('sesionTienda')
    this.router.navigate(['/login']);
  }
}
