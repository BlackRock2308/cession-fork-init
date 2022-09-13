import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
   
    }

    nextPage() {
      this.router.navigate(['steps/informations_ninea']);
      }
  

}
