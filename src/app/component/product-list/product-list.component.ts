import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-product-list',
  styleUrl: './product-list.component.css',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  
  public products = signal<Product[]>([])
  private prodeuctService = inject(ProductService)
  private router = inject(Router)

  ngOnInit(): void {
    this.getAll()
  }

  new(){
    this.router.navigate(['products/details'])
  }

  getAll(){
    this.prodeuctService.getAll().subscribe({
      next: (res) =>{
        console.log(res)
        this.products.set(res)
      },
      error(err){

      },
      complete(){

      },
    });
  }
}
