import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FamilyService } from './services/api.services';
import { HttpClientModule } from '@angular/common/http';
import { ServiceBaseConfiguration } from './services/api.servicesbase';
import { ChildrenComponent } from './children/children.component';
import { ChildComponent } from './children/child/child.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './modules/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageUploadComponent } from './common/image-upload/image-upload.component';
import { FamilyServiceExtensions } from './services/api.services.extensions';

@NgModule({
  declarations: [
    AppComponent,
    ChildrenComponent,
    ChildComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ServiceBaseConfiguration,
    FamilyService,
    FamilyServiceExtensions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
