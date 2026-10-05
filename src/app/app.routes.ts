import { Routes } from '@angular/router';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { HomeComponent } from './component/home/home.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { CategoryDetailsComponent } from './component/category-details/category-details.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'categories',
        component: CategoryListComponent
    },
    {
        path: 'categories/details',
        component: CategoryDetailsComponent
    },
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'products/details',
        component: ProductDetailsComponent
    },
    {
        path: 'products/details/:id',
        component: ProductDetailsComponent
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
