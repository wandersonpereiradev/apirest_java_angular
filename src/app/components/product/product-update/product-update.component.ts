import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  public produto: Product

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product =>{
      this.produto = product
    })
  }

  updateProduct(): void {
    this.productService.update(this.produto).subscribe(() => {
    this.productService.showMessage('Produto atualizado com sucesso!')
    this.router.navigate(['/produtos']);
    })
  }

  cancel() {
    this.router.navigate(['/produtos']);
  }

}
