import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  selector: 'app-product-details',
  styleUrl: './product-details.component.css',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {

  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService)
  public categories = signal<Category[]>([])
  private categoryService = inject(CategoryService)
  private router = inject(Router)

  private images:string[] = ['https://placehold.co/600x400.jpg'];

  productForm = this.formBuilder.group({
    title:['', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
    price:[,[Validators.required,Validators.min(1.0),Validators.max(10000)]],
    description:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
    categoryId:['',[Validators.required]],
  })

  submitted:boolean = false

  ngOnInit():void{
    this.loadCategories()
  }

  onSubmit(){
    this.submitted = true
    console.log(this.productForm)

    const product:Product = {
      title: this.productForm.controls['title'].value || '',
      price: this.productForm.controls['price'].value || 0,
      description: this.productForm.controls['description'].value || '',
      images: this.images,
      categoryId: 1
    }

    console.log(product);
    
    this.productService.save(product).subscribe({
        next: (res) => {
          console.log(res);
        },
        error(err) {},
      });
  }

  cancel(){
    console.log('Cancel...');
    this.router.navigate(['products']);
  }

  loadCategories(){
    this.categoryService.getAll().subscribe({
      next: (res)=>{
        console.log(res);
        this.categories.set(res);
      },
      error(err){},
      complete(){},
    });
  }

  get pf():{[key:string]: AbstractControl}{
    return this.productForm.controls;
  }

}
