import {
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddProductPopUpComponent } from '../../pages/add-product-pop-up/add-product-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { products } from '../../models/model';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products',
  imports: [NgFor, HttpClientModule, FormsModule, NgIf, ReactiveFormsModule],
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef | undefined;

  productList = signal<products[]>([]);
  product: products = new products();
  productForm: FormGroup = new FormGroup({});
  ProductSrv: ProductsService;
  products = [
    {
      productId: 0,
      productName: '',
      shortName: '',
      category: '',
      sku: '',
      price: 0,
      thumbnailImageUrl: '',
      deliveryTimeSpan: '',
    },
  ];
  searchId: string = '';
  data: any;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private productSrv: ProductsService
  ) {
    this.ProductSrv = productSrv;
    this.initializeForm();
  }

  ngOnInit(): void {
    console.log('ngOnInit: calling API...');
    this.getAllProducts();
  }
  getAllProducts() {
    this.http.get('/api/Products?pageNumber=1&pageSize=1000').subscribe({
      next: (response: any) => {
        console.log('API response:', response);
        this.products = response?.products || response || []; // fallback
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }
  searchById() {
    if (this.searchId.trim()) {
      this.http
        .get(`api/Products/getSingleProduct?id=${this.searchId}`)
        .subscribe({
          next: (res) => (this.data = res),
          error: (err) => {
            this.data = null;
            console.error('Not found', err);
          },
        });
    } else {
      this.data = null;
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductPopUpComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      // Handle the result (e.g., save the new project)
    });
  }
  openModal() {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'block';
    }
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
  closeModal() {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'none';
      this.productForm.reset();
      document.body.style.overflowX = 'auto'; // Restore background scrolling
    }
  }
  initializeForm() {
    this.productForm = new FormGroup({
      productId: new FormControl(this.product.productId, Validators.required),
      productName: new FormControl(
        this.product.productName,
        Validators.required
      ),
      shortName: new FormControl(this.product.shortName, Validators.required),
      category: new FormControl(this.product.category, Validators.required),
      sku: new FormControl(this.product.sku),
      price: new FormControl(this.product.price),
      thumbnailImageUrl: new FormControl(this.product.thumbnailImageUrl),
      deliveryTimeSpan: new FormControl(this.product.deliveryTimeSpan),
    });
  }
  saveProduct() {
    debugger;
    this.productSrv.saveProduct(this.productForm.value).subscribe(
      (res: products) => {
        console.log('Product saved successfully:', res);
        debugger;
        this.productList.update((products) => [...products, res]);
        this.productForm.reset();
        this.closeModal();
        this.getAllProducts();
      },
      (error) => {
        console.error('Error saving product:', error);
        // Handle error appropriately, e.g., show a notification
      }
    );
  }
    updateProduct() {
    debugger;
    this.productSrv.updateProduct(this.productForm.value).subscribe(
      (res: products) => {
        console.log('Product saved successfully:', res);
        debugger;
        this.productList.update((products) => [...products, res]);
        this.productForm.reset();
        this.closeModal();
        this.getAllProducts();
      },
      (error) => {
        console.error('Error saving product:', error);
        // Handle error appropriately, e.g., show a notification
      }
    );
  }
  deleteProduct(productId: number) {
    debugger;
    const confirmation = confirm(
      `Are you sure you want to delete product with ID ${productId}?`
    );
    if (confirmation) {
      this.http
        .delete(`/api/Products/deleteProduct?id=${productId}`)
        .subscribe({
          next: () => {
            console.log(`Product with ID ${productId} deleted successfully.`);
            this.getAllProducts();
          },

          error: (err) => {
            console.error('Error deleting product:', err);
          },
        });
    }
  }
  EditProduct(product: number) {
    debugger;
    this.http
      .get(`/api/Products/getSingleProduct?id=${product}` as string)
      .subscribe((res) => {
        this.product = res as products;
        this.initializeForm();
        this.openModal();
        console.log('Product data for editing:', this.product);
      });
  }
}
