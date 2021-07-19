import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../../model/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    name: ['Test 4', [Validators.required]],
    apellido: ['Mexico', [Validators.required]],
    email: ['test4@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  usuarios: Usuario[] = [];

  constructor(private fb: FormBuilder,
    private router: Router) { }


  registro() {
    const { name, apellido, email, password } = this.miFormulario.value;

    const user: Usuario = {
      'name': name,
      'apellido': apellido,
      'email': email,
      'password': password
    };
    // 
    this.usuarios.push(user);

    // this.tasks.push(task);
    let tasks = [];
    if (localStorage.getItem('usuario') === null) {
      tasks = [];
      tasks.push(user);
      localStorage.setItem('usuario', JSON.stringify(tasks));
    } else {
      tasks = JSON.parse(localStorage.getItem('usuario')!);
      tasks.push(user);
      localStorage.setItem('usuario', JSON.stringify(tasks));
    }

    this.miFormulario.reset();
    //  localStorage.setItem('usuario', JSON.stringify(user));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Usuario Creado',
      showConfirmButton: false,
      timer: 1000
    })

    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3000);


    // this.authService.registro( name, email, password )
    //   .subscribe( ok => {

    //     if ( ok === true ) {
    //       this.router.navigateByUrl('/dashboard');
    //     } else {
    //       Swal.fire('Error', ok, 'error');
    //     }
    //   });



  }



}
