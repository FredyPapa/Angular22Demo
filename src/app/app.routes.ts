import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'modules',
        loadChildren: () => import('./features/home/routes/home.routes').then(r => r.HOME_ROUTES)
    },
    {
        path: 'login',
        loadComponent: () => import('./core/auth/login/component/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
