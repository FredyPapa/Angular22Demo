import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';
import { Router } from '@angular/router';

@Component({
  imports: [
    CommonModule,
    FormsModule
  ],
  standalone: true,
  selector: 'app-category-details',
  styleUrl: './category-details.component.css',
  templateUrl: './category-details.component.html',
})
export class CategoryDetailsComponent {

  category:Category={
    name:'Nombre',
    image:'Imagen'
  }

  private categoryService = inject(CategoryService)
  private router = inject(Router)
  
  onSubmit(){
    console.log(this.category)
    this.categoryService.save(this.category).subscribe({
        next: (res:Category) => {
          console.log(res);
        },
        error(err) {},
      });
  }
  

  cancel(){
    console.log('Cancel')
    this.router.navigate(['categories'])
    
  }
}
