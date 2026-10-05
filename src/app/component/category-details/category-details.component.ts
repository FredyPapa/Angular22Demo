import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
export class CategoryDetailsComponent implements OnInit {

  
  category:Category={
    name:'Nombre',
    image:'Imagen'
  }
  
  private categoryService = inject(CategoryService)
  private router = inject(Router)
  private toastr = inject(ToastrService)
  private swAlerta:boolean = false;

  ngOnInit(): void {
    this.findById(1)
  }
  
  onSubmit(){
    if(this.swAlerta){
      this.toastr.warning('Usted está registrando la categoría'+this.category.name,'Alerta')
      return
    }

    console.log(this.category)
    this.categoryService.save(this.category).subscribe({
        next: (res:Category) => {
          //console.log(res);
          this.toastr.success('La categoría se registró correctamente','Mensaje')
        },
        error:(err) => {
          this.toastr.error('La categoría se no registró','Mensaje')
        },
      });
  }

  findById(id:number){
    this.categoryService.findById(id).subscribe({
        next: (res:Category) => {
          console.log(res);
          this.category = res;
        },
        error(err) {},
      });
  }
  
  cancel(){
    console.log('Cancel')
    this.router.navigate(['categories'])
    
  }
}
