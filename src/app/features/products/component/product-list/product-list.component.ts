import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { GLOBAL } from '../../../../shared/constants/global';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  imports: [
    PaginationModule
  ],
  selector: 'app-product-list',
  styleUrl: './product-list.component.css',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  
  public products = signal<Product[]>([])
  private prodeuctService = inject(ProductService)
  private router = inject(Router)

  public itemsPerPage:number = GLOBAL.ITEMS_BY_PAGE;
  private startItem = signal<number>(0);
  private endtItem = signal<number>(10);

  ngOnInit(): void {
    this.getAll()
  }

  new(){
    this.router.navigate(['modules/products/products/details'])
  }

  edit(product:Product){
    //console.log(product);
    this.router.navigate(['modules/products/products/details',product.id])
    /*
    if(product.id){
      sessionStorage.setItem('id',String(product.id));
      this.router.navigate(['products/details'])
    }
    */
  }

  getAll(){
    this.prodeuctService.getAll().subscribe({
      next: (res) =>{
        console.log(res)
        this.products.set(res)
        //
        this.startItem.set(0)
        this.endtItem.set(this.itemsPerPage)
      },
      error(err){

      },
      complete(){

      },
    });
  }

  public productsItems = computed(()=>{
    const content = this.products();
    const start = this.startItem();
    const end = this.endtItem();

    return content.slice(start,end);
  });

  pageChanged(event: PageChangedEvent): void {
    this.startItem.set((event.page - 1) * this.itemsPerPage)
    this.endtItem.set((event.page) * this.itemsPerPage)
  }
}
