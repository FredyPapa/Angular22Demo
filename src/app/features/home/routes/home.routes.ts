import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('../component/home.component').then(m => m.HomeComponent),
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('../../dashboard/component/dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent)
            },
            {
                path: 'categories',
                loadChildren: () => import('../../categories/routes/categories.routes').then(r => r.CATEGORIES_ROUTES)
            },
            {
                path: 'products',
                loadChildren: () => import('../../products/routes/products.routes').then(r => r.PRODUCTS_ROUTES)
            },
        ],
    }
];