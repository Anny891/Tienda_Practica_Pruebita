import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component'
import { ProductoComponent } from './producto-component/producto-component';


export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'producto', component: ProductoComponent},
    {path:'', redirectTo: 'login', pathMatch: 'full'}
];
