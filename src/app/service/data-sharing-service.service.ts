import { Injectable } from '@angular/core';
import {ChartData} from "chart.js";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {
  private dataSubject = new BehaviorSubject<any>(null); // Initialize with null or default data
  data: any;
  constructor() {}
  setData(data: any) {
    this.data = data;
  }
  getData() {
    return this.data
  }}
