import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav/nav-bar-component';
import { FooterComponent } from './footer/footer-component';
import { HeaderComponent } from './header/header-component';
import { CardsComponent } from './cards/cards-component';
import { CardService } from './services/card-service';
import { CardDetailComponent } from './cards/card-detail-component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceUtils } from './services/service-utilty';
import { CardListComponent } from './cards/card-list-component';
import { TypesService } from './services/types-service';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    CardsComponent,
    CardDetailComponent,
    CardListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CardService,
    TypesService,
    ServiceUtils
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
