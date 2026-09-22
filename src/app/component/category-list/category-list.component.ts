import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../model/category';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-category-list',
  styleUrl: './category-list.component.css',
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {

  public categories = signal<Category[]>([])
  private categoryService = inject(CategoryService)
  private router = inject(Router)

  ngOnInit(): void {
    this.getAll()
  }

  /*
  categories:Category[]=[]
  constructor(private categoryService:CategoryService){
    this.getAll();
  }
  */

  new(){
    this.router.navigate(['categories/details'])
  }

  getAll(){
    this.categoryService.getAll().subscribe({
      next: (res) =>{
        console.log(res)
        //this.categories=res
        this.categories.set(res)
      },
      error(err){

      },
      complete(){

      },
    });
  }
}
