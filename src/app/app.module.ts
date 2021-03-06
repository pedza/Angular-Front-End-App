import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { AliveService } from './services/alive.service';
import { HomeComponent } from './components/home/home.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AppRoutingModule } from './app-routing.modules';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminPanelService } from './services/admin-panel.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MapMunicipalityPipe } from './pipes/map-municipality.pipe';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { MapMealTypePipe } from './pipes/map-mealType.pipe';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantMenuComponent } from './components/restaurant-menu/restaurant-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminPanelComponent,
    HeaderComponent,
    FooterComponent,
    MapMunicipalityPipe,
    RestaurantDetailsComponent,
    MapMealTypePipe,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    AliveService,
    AdminPanelService,
    RestaurantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
