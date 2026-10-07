import { Routes } from '@angular/router';
import { CategoryHomeComponent } from '../component/category-home/category-home.component';

export const CATEGORIES_ROUTES: Routes = [
    {
        path: '',
        //component: CategoryHomeComponent,
        loadComponent: () => import('../component/category-home/category-home.component').then(m => m.CategoryHomeComponent),
        children:[
            {
                path: 'categories',
                //component: CategoryListComponent
                loadComponent: () => import('../component/category-list/category-list.component').then(m => m.CategoryListComponent)
            },
            {
                path: 'categories/details',
                //component: CategoryDetailsComponent
                loadComponent: () => import('../component/category-details/category-details.component').then(m => m.CategoryDetailsComponent)
            },
        ],   
    }
];
