import { Component, computed, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../model/category';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { GLOBAL } from '../../../../shared/constants/global';

@Component({
  imports: [
    ModalModule,
    PaginationModule
  ],
  providers: [
    BsModalService
  ],
  selector: 'app-category-list',
  styleUrl: './category-list.component.css',
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  public modalRef?: BsModalRef;
  public categorySelected?:Category;
  
  public categories = signal<Category[]>([])
  public itemsPerPage:number = GLOBAL.ITEMS_BY_PAGE;
  private startItem = signal<number>(0);
  private endtItem = signal<number>(10);

  private categoryService = inject(CategoryService)
  private router = inject(Router)
  private toastr = inject(ToastrService)
  private modalService = inject(BsModalService)



  ngOnInit(): void {
    this.getAll()
  }

  new(){
    this.router.navigate(['modules/categories/categories/details'])
  }

  getAll(){
    this.categoryService.getAll().subscribe({
      next: (res) => {
        console.log(res)
        //this.categories=res
        this.categories.set(res)
        //
        this.startItem.set(0)
        this.endtItem.set(this.itemsPerPage)
      },
      error: (err) => {
        this.toastr.error('Error al listar las categorías','Mensaje')
      },
      complete(){

      },
    });
  }

  delete(category: Category) {
    //confirm('Demo 1') // No usar
    Swal.fire({
      title: 'Alerta',
      text: `Confirma la eliminación del producto ${category.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(category.id).subscribe({
          next: (res) => {
            //console.log(res);
            //this.getAll()
            this.categories.update((prevCategories) =>
              prevCategories.filter((c) => c.id !== category.id),
            );
            /*
            Swal.fire({
              title: 'Aviso',
              text: 'Categoría eleminada con éxito.',
              icon: 'success',
            });*/
            //throw new Error('El ID de la categoría es obligatorio.');

            this.toastr.success('La categoría se registró con éxito','Mensaje')

          },
          error: (err) => {
            //console.log(err);
            /*
            Swal.fire({
              title: 'Aviso',
              text: `Error al eleminar la catetegoría ${category.name}`,
              icon: 'error',
            });*/
            this.toastr.error('Error al eliminar la categoría', 'Error');
          },
        });
      }
    });
  }

  view(category: Category, template: TemplateRef<void>) {
    this.categorySelected = category;
    this.modalRef = this.modalService.show(template);
  }

  public categoriesItems = computed(()=>{
    const content = this.categories();
    const start = this.startItem();
    const end = this.endtItem();

    return content.slice(start,end);
  });

  pageChanged(event: PageChangedEvent): void {
    this.startItem.set((event.page - 1) * this.itemsPerPage)
    this.endtItem.set((event.page) * this.itemsPerPage)
  }

}

