import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-producto-component',
  imports: [FormsModule],
  templateUrl: './producto-component.html',
  styleUrl: './producto-component.css',
})
export class ProductoComponent {

  constructor (private router: Router) {

    if (localStorage.getItem('sesionTienda') !== 'si'){
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion(){
    localStorage.removeItem('sesionTienda')
    this.router.navigate(['/login']);
  }
}
