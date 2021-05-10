import { Component } from '@angular/core';
import {AliveService} from './services/alive.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: any;
  
    constructor(private aliveService: AliveService) {}

    pingIsAlive(){
      this.aliveService.ping().subscribe({
        next: data => console.log(data.message),
        error: err => console.warn(err.error),
        complete: () => {
          console.log("ok")
        }
        })
      
      }

      ping2IsAlive(){
        this.aliveService.ping2()
      }
    }

