import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServerCallService {
  baseUrl:string="Https://dev.api.eclerk.in/api/";
  constructor(private http:HttpClient) { }
  

  fnGetReq(url){
     return this.http.get(this.baseUrl+url);
  }
  

  fnPostReq(url,data){
    return this.http.post(this.baseUrl+url,data);
  }
 
}

