import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeaveServiceService {
  BASE_URL1 = "http://localhost:8080/api/v1/leave-manage";
  BASE_URL2 = "http://localhost:8080/api/v1/manager-control";
  BASE_URL3 = "http://localhost:8080/api/v1/leave-balance";
  constructor(private http: HttpClient ) { }
  leaves: any = [];
  leaveEmployee: any=[]
  leaveEmployeeHome: any=[]
  getLeaveRequest() : Observable<any> {
    const url = `${this.BASE_URL1}/get-all-leave`;
    return this.http.get(url)
  }
  putAcceptRequest(status : boolean, id: number) : Observable<any>{
    const url = `${this.BASE_URL1}/update-accept-leave/${id}`;
    return this.http.put(url,status);
  }
  getAEmployeeDetails(userName: string): Observable<any>{
    const url = `${this.BASE_URL2}/get-employee-by-id/${userName}`;
    return this.http.get(url)
  }
  getALeaveDetails(id: number): Observable<any>{
    const url = `${this.BASE_URL1}/get-leaver/${id}`;
    return this.http.get(url)
  }
  getLeaveListToday(date: any): Observable<any>{
    const url = `${this.BASE_URL1}/all-total-leaves-today/${date}`;
    return this.http.get(url)
  }
  getDetailByLeaveBalance(userName: string){
    const url = `${this.BASE_URL3}/get-leaveBalance-by-id/${userName}`;
    return this.http.get(url);
  }
  getTotalLeavesByEmployee(userName: string){
    const url = `${this.BASE_URL3}/total-leave/${userName}`;
    return this.http.get(url);
  }
  public addLeave(jsonData: string) : Observable<any> {
      const url = `${this.BASE_URL1}/add-leave`;
      return this.http.post(url,jsonData)
  }
  public  getAllLeaveByUserName(userName: string): Observable<any>{
    const url = `${this.BASE_URL1}/get-detail-by-username/${userName}`;
    return this.http.get(url)
  }
  public getLeaveDetailsByUsername(userName: string,page: number,size: number): Observable<any>{
    const url = `${this.BASE_URL1}/get-leave-detail-by-username/${userName}/${page}/${size}`
    return this.http.get(url);
  }
  public deleteLeaveRequest(id: number): Observable<any>{
    const url = `${this.BASE_URL1}/delete-leave/${id}`
    return this.http.delete(url);
  }
  public  getCountAllEmployeeLeave(): Observable<any>{
    const url = `${this.BASE_URL1}/count-of-employee-per-day`
    return this.http.get<any>(url);
  }
  getCountDayEmployeeLeave(date:any): Observable<any> {
    const url = `${this.BASE_URL1}/count-by-leave-per-day/${date}`
    return this.http.get(url);
  }
  editLeave(jsonData: string, id: number): Observable<any> {
    const url = `${this.BASE_URL1}/edit-leave/${id}`
    return this.http.put(url,jsonData);
  }
}
