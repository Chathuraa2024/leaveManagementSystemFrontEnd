import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-forbidder',
  templateUrl: './forbidder.component.html',
  styleUrl: './forbidder.component.scss'
})
export class ForbidderComponent {
  constructor(private router: Router) {
  }

  goHome() {
    this.router.navigate(['/login']);
  }
}
