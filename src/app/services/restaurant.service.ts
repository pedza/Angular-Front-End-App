import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment'
import {Observable} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  serverUrl = environment.apiServer

  constructor(private http: HttpClient) { }

  getRestaurants() : Observable<any> {
    let url = `${this.serverUrl}/api/Restaurants/GetRestaurants`
    return this.http.get(url);
  }

  getRestaurantMenu(id: string) : Observable<any> {
    let url = `${this.serverUrl}/api/Restaurants/GetRestaurantMenuItems?id=${id}`
    return this.http.get(url)
  }

}
