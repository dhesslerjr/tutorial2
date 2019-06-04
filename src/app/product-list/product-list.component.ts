import { Component } from '@angular/core';

import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = products;

  share(prodname:String) {
    window.alert('The ' + prodname + ' has been shared!');
  }

  onNotify(prodname:String) {
    window.alert('You will be notified when the ' + prodname + ' goes on sale.');
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/