import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  private activateRoute = inject(ActivatedRoute)

  private images:string[] = ['https://placehold.co/600x400.jpg'];

  productForm = this.formBuilder.group({
    title:['', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
    price:[0,[Validators.required,Validators.min(1.0),Validators.max(10000)]],
    description:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
    categoryId:['',[Validators.required]],
  })

  submitted:boolean = false;
  productId!:number;

  ngOnInit():void{
    
    this.activateRoute.params.subscribe({
      next:(params) =>{
        if(params['id']){
          this.productId = params['id'];
          this.findById(this.productId);
        }
      },
    });
    
   /*
   const id = sessionStorage.getItem('id');
   if(id){
    this.productId = Number(id);
    this.findById(this.productId);
   }
    */

   this.loadCategories()
  }

  onSubmit(){
    this.submitted = true;
    if(this.productForm.invalid){
      return;
    }
    
    console.log(this.productForm)

    const category:Category = {id:0}

    const product:Product = {
      //title: this.productForm.controls['title'].value || '',
      title: this.pf['title'].value || '',
      price: this.pf['price'].value || 0,
      description: this.pf['description'].value || '',
      images: this.images,
      categoryId: this.pf['categoryId'].value || '',
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

  findById(id:number){
    this.productService.findById(id).subscribe({
      next: (res)=>{
        console.log(res);

        this.pf['title'].setValue(res.title)
        this.pf['price'].setValue(res.price)
        this.pf['description'].setValue(res.description)
        this.pf['categoryId'].setValue(res.category?.id)
        //
        //this.productForm.patchValue(res as any) // Bad Practice
       /*
       this.productForm.patchValue({
        title: res.title,
        price: res.price,
        description: res.description,
        categoryId: res.category?.id !== undefined ? String(res.category.id) : ''
       });
       */
      },
      error(err){},
      complete(){},
    });
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
