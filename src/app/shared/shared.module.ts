import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HomeButtonComponent } from './components/home-button/home-button.component';

@NgModule({
  declarations: [HomeButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    HomeButtonComponent
  ],
})
export class SharedModule {}
