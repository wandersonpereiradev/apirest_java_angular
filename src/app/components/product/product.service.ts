import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Product } from "./product.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  baseUrl = 'http://localhost:8080/api/produtos'
  baseUrlUnico = 'http://localhost:8080/api/produto'

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}
   
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrlUnico, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)));
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)));
  }

  readById(id: string): Observable<Product>{
    const url = `${this.baseUrlUnico}/${id}`
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product> {
    const url = this.baseUrlUnico
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)));
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrlUnico}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)));
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!");
    return EMPTY;
  }
}
