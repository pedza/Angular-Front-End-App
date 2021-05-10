import { from, Subscriber } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import {Observable} from 'rxjs'

@Injectable()

export class AliveService {

    constructor(private http: HttpClient) {}

    serverUrl = environment.apiServer

    ping(): Observable<any> {

        let url = `${this.serverUrl}/api/alive/isalive`;

        return this.http.get(url)
        
       

    }

    ping2(){
        let url = `${this.serverUrl}/api/alive/isalive`;
         
        let observable = new Observable(subscriber => {
            subscriber.next(
                fetch(url)
                .then(res => res.json())
                .then(data => data.message)
            );
        })

        observable.subscribe(x => console.log(x))
    }

}