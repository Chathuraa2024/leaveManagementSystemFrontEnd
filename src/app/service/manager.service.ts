import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  BASE_URL = "http://localhost:8080/api/v1/manager-control";
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );
  constructor(private http: HttpClient ) { }

  public getAllEmployee(): Observable<any>{
    const url = `${this.BASE_URL}/viewAll`;
    return this.http.get(url)
  }

  public  getAllEmployeePagination(page: number,size: number): Observable<any>{
    const url = `${this.BASE_URL}/viewAll/${page}/${size}`;
    return this.http.get(url)
  }
  public addEmployee(jsonData: any): Observable<any>{
    const url = `${this.BASE_URL}/add-employee`;
    console.log(jsonData)
    return this.http.post(url,jsonData)
  }
  public updateEmployee(jsonData: any,id: string){
    console.log(jsonData)
    const url = `${this.BASE_URL}/update-employee/${id}`;
    console.log(url);
    return this.http.put(url,jsonData);
  }
  public  deleteEmployee(id:string): Observable<any>{
    const url = `${this.BASE_URL}/delete-employee/${id}`;
    return this.http.delete(url,{responseType: 'text'})
  }

  public getEmployeeById(userName: string): Observable<any>{
    const url = `${this.BASE_URL}/get-employee-by-id/${userName}`;
    return this.http.get(url);
  }



}
