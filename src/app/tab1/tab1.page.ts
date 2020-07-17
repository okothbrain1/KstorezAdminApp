//import { Component} from '@angular/core';
import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface ProductData {
  ProductName: string;
  Price: number;
  Description: string;
  //image: blob;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  productList = [];
  productData: ProductData;
  productForm: FormGroup;

  constructor(

    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.productData = {} as ProductData;
  }

  ngOnInit() {

    this.productForm = this.fb.group({
      ProductName: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Description: ['', [Validators.required]]
    })

    this.firebaseService.read_products().subscribe(data => {

      this.productList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          ProductName: e.payload.doc.data()['ProductName'],
          Price: e.payload.doc.data()['Price'],
          Description: e.payload.doc.data()['Description'],
        };
      })
      console.log(this.productList);

    });
  }

  CreateRecord() {
    console.log(this.productForm.value);
    this.firebaseService.create_product(this.productForm.value).then(resp => {
      this.productForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_product(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditProductName = record.ProductName;
    record.EditPrice = record.Price;
    record.EditDescription = record.Description;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['ProductName'] = recordRow.EditProductName;
    record['Price'] = recordRow.EditPrice;
    record['Description'] = recordRow.EditDescription;
    this.firebaseService.update_product(recordRow.id, record);
    recordRow.isEdit = false;
  }

}

