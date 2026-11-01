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
  editarPosicion = -1;

  guardar(){
    if (this.codigo.trim()== '' || this.nombre.trim() == '' || this.precio == null || this.existencias == null) {
      alert ('Datos incorrectos');
      return;
    }

    if (this.existencias < 0 || this.precio < 0 || !Number.isInteger(this.existencias)){
      alert ('Datos incorrectos');
      return; 
    }

    if (this.editarPosicion == -1){
    const productoNuevo = {
      id: Math.max(0, ...this.productos.map(e => e.id)) + 1,
      codigo: this.codigo,
      nombre: this.nombre,
      precio:  this.precio,
      existencias: this.existencias

    }
      this.productos.push(productoNuevo);
  } else {
    this.productos[this.editarPosicion].codigo = this.codigo;
    this.productos[this.editarPosicion].nombre = this.nombre;
    this.productos[this.editarPosicion].precio = this.precio;
    this.productos[this.editarPosicion].existencias = this.existencias;
  }

    
    this.limpiar();
    this.guardarEnLocalStore();
  }

  limpiar(){
    this.codigo = '';
    this.nombre = '';
    this.precio = null;
    this.existencias = null;
    this.editarPosicion = -1;
  }

  editar(i: number){
    this.editarPosicion = i;
    this.codigo = this.productos[i].codigo;
    this.nombre = this.productos[i].nombre;
    this.precio = this.productos[i].precio;
    this.existencias = this.productos[i].existencias

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
