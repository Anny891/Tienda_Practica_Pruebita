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

  codigo = '';
  nombre = '';
  precio: number | null = null;
  existencias: number | null = null;

  guardar(){
    if (this.codigo.trim()== '' || this.nombre.trim() == '' || this.precio == null || this.existencias == null) {
      alert ('Datos incorrectos');
      return;
    }

    if (this.existencias < 0 || this.precio < 0 || !Number.isInteger(this.existencias)){
      alert ('Datos incorrectos');
      return; 
    }

    const productoNuevo = {
      id: Math.max(0, ...this.productos.map(e => e.id)) + 1,
      codigo: this.codigo,
      nombre: this.nombre,
      precio:  this.precio,
      existencias: this.existencias

    }

    this.productos.push(productoNuevo);
    this.limpiar();
    this.guardarEnLocalStore();
  }

  limpiar(){
    this.codigo = '';
    this.nombre = '';
    this.precio = null;
    this.existencias = null;
  }

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
