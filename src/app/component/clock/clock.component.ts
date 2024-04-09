import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent implements OnInit{

  @ViewChild('hrHand',{static:false}) hrHand?:ElementRef;
  @ViewChild('minHand',{static:false}) minHand?:ElementRef;
  @ViewChild('secHand',{static:false}) secHand?:ElementRef;

  localeDate:string=new Date().toLocaleDateString();
  dateAndTime :any=[]
  ngOnInit(): void {
    this.extractDate(this.localeDate)
    setInterval(()=>{
      const date = new Date();
      this.updateClock(date);
    },1000);
  }


  private updateClock(date: Date) {
    if (this.secHand) {
      this.secHand.nativeElement.style.transform = 'rotate(' +
        date.getSeconds() * 6 + 'deg)';
    }
    if (this.minHand) {
      this.minHand.nativeElement.style.transform = 'rotate(' +
        date.getMinutes() * 6 + 'deg)';
    }
    if (this.hrHand) {
      this.hrHand.nativeElement.style.transform = 'rotate(' +
        (date.getHours() * 30 + date.getMinutes() * 0.5 + 'deg)')
    }
  }

  extractDate(dateString: string) {
    this.dateAndTime = dateString.split(',')
  }
}
