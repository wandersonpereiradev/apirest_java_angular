import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  public produto: Product

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product =>{
      this.produto = product
      console.log(this.produto)
    })
  }

  deleteProduct(): void {
    //this.productService.delete(this.produto.id).subscribe(() => {
    //this.productService.showMessage('Produto excluído com sucesso!')
    //this.router.navigate(['/produtos']);

    this.productService.delete(this.produto.id).subscribe(() => {
    this.productService.showMessage('Produto excluído com sucesso!')
    this.router.navigate(['/produtos']);
    })
  }

  cancel() {
    this.router.navigate(['/produtos']);
  }

}
