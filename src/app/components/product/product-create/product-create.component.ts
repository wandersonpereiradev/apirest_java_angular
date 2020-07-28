import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  produto: Product = {
    nome: '',
    quantidade: null,
    valor: null
  }

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    
  }

  creatProduct(): void {
    this.productService.create(this.produto).subscribe(() => {
      this.productService.showMessage('Produto cadastrado com sucesso');
      this.router.navigate(['/produtos']);
    });
    
  }

  cancel(): void {
    this.router.navigate(['/produtos']);
  }

}
