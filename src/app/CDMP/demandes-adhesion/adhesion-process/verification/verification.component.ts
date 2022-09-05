import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/workstation/model/product';
import { ProductService } from 'src/app/workstation/service/product/product.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  product: Product;
  form: FormGroup;


  constructor(private productService:ProductService,    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.productService.getProductObs().subscribe(product => this.product = product);
    
    this.form = this.formBuilder.group({
      ninea: ['', Validators.required],
      rccm: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nineaFile: ['', Validators.required],
      rccmFile: ['', [Validators.required]],
  });
  }

}
