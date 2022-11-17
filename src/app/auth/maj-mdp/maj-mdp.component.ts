import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/validators/confirm.validator/confirm.validator.module';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-maj-mdp',
  templateUrl: './maj-mdp.component.html'
})

export class MajMdpComponent {

  password:String;
  form: FormGroup = new FormGroup({});


    constructor(private authService:AuthService,
      private router:Router,private fb: FormBuilder,
      private tokenStorage:TokenStorageService) {
  
      this.form = fb.group({
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]]
      }, { 
        validator: ConfirmedValidator('password', 'confirm_password')
      })
    }

  majMDP(){
    var body={
      idUtilisateur:this.tokenStorage.getUser().idUtilisateur,
      password:this.form.value['password'],
      email:this.tokenStorage.getUser().email,
      updatePassword:false
    }
    console.log(JSON.stringify(body));

    this.authService.majMDP(body).subscribe(
      data=>{
        console.log(data);
        
        this.router.navigate(['login'])
      }
    )
  }

  

    
  get f(){
    return this.form.controls;
  }
   
  submit(){
    console.log(this.form.value);
  }

}
