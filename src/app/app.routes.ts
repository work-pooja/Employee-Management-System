import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AddEmployee } from './add-employee/add-employee';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'add-employee',
        component: AddEmployee
    }
];
