import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//interface for the data to be fetched from orders collection
export interface Orders {
  amount: number;
  cust_email: string;
  cust_name: string;
  cust_phone: string;
  products: string;
  ref: string;
  ship_address: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Products';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_product(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_products() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_product(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_product(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }
}