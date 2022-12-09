import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recup-mdp',
  templateUrl: './recup-mdp.component.html',
  styleUrls: ['../login/app.login.component.scss']

})
export class RecupMdpComponent {
  email: string;

  constructor(private authService: AuthService,
    private router: Router) { }

  recupMDP(email) {
    this.authService.recupMDP(email).subscribe(
      data => {
        this.router.navigate(['login/maj_pwd'])
      }
    )
  }

}
