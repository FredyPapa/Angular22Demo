import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { environment } from '../../environments/environment';

@Service()
export class ProductService {
    private uri = environment.URL_BASE+'/api/v1/products'

    //Injección de Dependencia
    private http = inject(HttpClient)

    getAll():Observable<Product[]>{
        return this.http.get<Product[]>(this.uri)
    }

    save(product:Product):Observable<Product>{
        return this.http.post<Product>(this.uri,product)
    }
}
