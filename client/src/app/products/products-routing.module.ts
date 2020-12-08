import { ProductsComponent } from './products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MensWearComponent} from "./components/mens-wear/mens-wear.component";
import {WomenWearComponent} from "./components/women-wear/women-wear.component";
import {KidsWearComponent} from "./components/kids-wear/kids-wear.component";
import {ProductUploadComponent} from "./components/product-upload/product-upload.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {AdminGuard} from "../root/guards/admin.guard";

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'men', component: MensWearComponent },
  { path: 'women', component: WomenWearComponent },
  { path: 'kids', component: KidsWearComponent },
  { path: 'upload', component: ProductUploadComponent, canActivate : [AdminGuard] },
  { path: ':id', component: ProductDetailsComponent },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
