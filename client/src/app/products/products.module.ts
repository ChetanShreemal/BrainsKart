import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MensWearComponent } from './components/mens-wear/mens-wear.component';
import { WomenWearComponent } from './components/women-wear/women-wear.component';
import { KidsWearComponent } from './components/kids-wear/kids-wear.component';
import { ProductUploadComponent } from './components/product-upload/product-upload.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { StoreModule } from '@ngrx/store';
import * as fromState from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './effects/product.effects';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [ProductsComponent, MensWearComponent, WomenWearComponent, KidsWearComponent, ProductUploadComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ProductsRoutingModule,
    StoreModule.forFeature(fromState.stateFeatureKey, fromState.reducers, { metaReducers: fromState.metaReducers }),
    EffectsModule.forFeature([ProductEffects])
  ]
})
export class ProductsModule { }
