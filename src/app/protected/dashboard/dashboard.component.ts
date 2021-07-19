import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
// import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Libro } from '../../model/libro';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      * {
        margin: 15px;
      }
    `
  ]
})
export class DashboardComponent implements OnInit {


  libro: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    paginas: ['', [Validators.required,]],
    libropdf: ['',],
  });

  usuarioLogeado: string = '';

  libros: Libro[] = [];

  listalibros: Libro[] = [];

  getUsuario() {
    const user = localStorage.getItem('IdUser');
    this.usuarioLogeado = user!;
    return user;
  }


  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) {
    
  }
  ngOnInit(): void {
    this.getUsuario();
    this.getTasks();
  }

  logout() {

    this.router.navigateByUrl('/auth');
    this.authService.logout();

  }


  agregarlibro() {
    const { titulo, descripcion, paginas, ibropdf } = this.libro.value;

    const lib: any = {
      'titulo': titulo,
      'descripcion': descripcion,
      'paginas': paginas,
      'libropdf': ibropdf ||null,
      'user': this.usuarioLogeado
    }
    console.log(lib);
    this.libros.push(lib);
    let libros = [];
    if (localStorage.getItem('libros') === null) {
      libros = [];
      libros.push(lib);
      localStorage.setItem('libros', JSON.stringify(libros));
    } else {
      libros = JSON.parse(localStorage.getItem('libros')!);
      libros.push(lib);
      localStorage.setItem('libros', JSON.stringify(libros));
    }
    this.getTasks();

  }


  getTasks() {
    this.listalibros=[];
    const lista: Libro[] = JSON.parse(localStorage.getItem('libros')!);
    if (localStorage.getItem('libros') === null) {
      this.listalibros = [];
    } else {
      lista.forEach(element => {
        if (element.user== this.usuarioLogeado) {
          
          this.listalibros.push(element);
      }
    });

    }

  }

  deleteTask(libroDel: Libro) {
    for (let i = 0; i < this.listalibros.length; i++) {
      if (libroDel == this.listalibros[i]) {
        this.listalibros.splice(i, 1);
        localStorage.setItem('libros', JSON.stringify(this.listalibros));
      }
    }
  }

}
