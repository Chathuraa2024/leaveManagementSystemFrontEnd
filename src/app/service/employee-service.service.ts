import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  BASE_URL1 = "http://localhost:8080/api/v1/employee-manage";
  constructor(private http: HttpClient ) { }
  employees: any=[];


  updateEmployee(jsonData: any,username:string) : Observable<any> {
    const url = `${this.BASE_URL1}/update-employee/${username}`;
    return this.http.put(url,jsonData)
  }
  getAllEmployeeCount(): Observable<any>{
    const url = `${this.BASE_URL1}/all-Employee-count`;
    return this.http.get<any>(url)
  }

  updateUserName(jsonData: string, userName: any): Observable<any> {
    const url = `${this.BASE_URL1}/update-user-name/${userName}`;
    return this.http.put(url,jsonData)
  }
}
