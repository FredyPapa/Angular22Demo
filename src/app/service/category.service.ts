import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { environment } from '../../environments/environment';

@Service()
export class CategoryService {

    private uri = `${environment.URL_BASE}/api/v1/categories`
    //private uri = environment.URL_BASE+'/api/v1/categories'

    //Injección de Dependencia
    private http = inject(HttpClient)

    getAll():Observable<Category[]>{
        return this.http.get<Category[]>(this.uri)
    }

    save(category:Category):Observable<Category>{
        return this.http.post<Category>(this.uri,category)
    }

}
