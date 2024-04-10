import { Component} from '@angular/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})

export class CalendarComponent {
  calendarOptions: any = {
    plugins: [dayGridPlugin, interactionPlugin],
  };

  ngOnInit(){
  }
  constructor() {
  }

}
