import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { DataUser } from '../../interfaces/dataUser.interface';

@Component({
  selector: 'app-admonusuarios',
  templateUrl: './admonusuarios.component.html',
  styleUrls: ['./admonusuarios.component.css']
})
export class AdmonusuariosComponent implements OnInit {
  dataUsers: DataUser[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.loginService.getAuth().subscribe(
      (data: DataUser[]) => {
        this.dataUsers = data;
      },
      error => {
        console.error('Error al obtener los datos de los usuarios:', error);
      }
    );
  }

  eliminarUsuario(email: string) {
    this.loginService.deleteUser(email).subscribe(
      response => {
        console.log(response); // Maneja la respuesta según tu lógica
        // Actualiza la lista de usuarios después de eliminar uno
        this.getUserData();
      },
      error => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }
}
