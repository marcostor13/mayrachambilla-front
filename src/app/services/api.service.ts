import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private baseUrl = 'https://us-central1-mayra-chambilla.cloudfunctions.net/webApi/'
  // private baseUrl = 'https://localhost:3000/'
  private baseUrl = 'https://api.mayrachambilla.ml/'

  constructor(private http: HttpClient) {}

  api(data:any) {
   
    if(data.type == 'get'){
      return this.http.get(`${this.baseUrl + data.service}`)      
    }else if(data.type == 'post'){
      return this.http.post(`${this.baseUrl + data.service}`, data.data)
    } else if (data.type == 'patch') {
      return this.http.patch(`${this.baseUrl + data.service}`, data.data)
    } else if (data.type == 'delete') {
      return this.http.delete(`${this.baseUrl + data.service}`)
    }
  }


  c(title:string, message:any) {
    console.log('%c' + title + '%c=>', "background-color: purple; color:white;font-family:system-ui;font-size:10pt;font-weight:bold;padding: 4px", "background-color: white; color:purple;font-size:10pt;font-weight:bold;padding: 4px", message);
  }


}
