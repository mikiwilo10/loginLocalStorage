import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../../model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }


  login() {

    const { email, password } = this.miFormulario.value;

    // this.authService.login( email, password )
    //   .subscribe( ok => {

    //     if ( ok === true ) {
    //       this.router.navigateByUrl('/dashboard');
    //     } else {
    //       Swal.fire('Error', ok, 'error');
    //     }
    //   });
    // this.authService.login( email, password )
    // .subscribe( ok => {
    const user: Usuario[] = JSON.parse(localStorage.getItem('usuario')!);

    // console.log(user);
    user.forEach(element => {
    

      if (email === element.email && password == element.password) {
        localStorage.setItem('IdUser', element.name);
        this.router.navigateByUrl('/dashboard');
       // return false;
      } else {
       // Swal.fire('Error', 'clave erronea', 'error');
      }

    });

  }

}
