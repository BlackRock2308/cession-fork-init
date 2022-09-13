import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informations-ninea',
  templateUrl: './informations-ninea.component.html',
  styleUrls: ['./informations-ninea.component.scss']
})
export class InformationsNineaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nextPage() {
    
    this.router.navigate(['steps/information_ninea']);
    }


prevPage() {
    
  this.router.navigate(['steps/verification']);
}
}
