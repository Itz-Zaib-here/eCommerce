import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import{ MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-add-product-pop-up',
  imports: [MatDialogModule,MatFormFieldModule,MatInputModule],
  standalone: true,
  templateUrl: './add-product-pop-up.component.html',
  styleUrl: './add-product-pop-up.component.css'
})
export class AddProductPopUpComponent {
}
