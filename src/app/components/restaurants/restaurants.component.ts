import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import {environment} from 'src/environments/environment'

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  allRestaurants: any;


  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getAllRestaurants()
  }

  getAllRestaurants(){
    this.restaurantService.getRestaurants().subscribe({
      next: res => this.allRestaurants = res,
      error: err => console.warn(err.error)
    })
  }

}
