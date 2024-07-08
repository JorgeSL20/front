import { Component, OnInit } from '@angular/core';
import { DataUser } from '../../interfaces/dataUser.interface';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  dataUser: DataUser = {
    name: "",
    lastNameP: "",
    lastNameM: "",
    email: "",
    pregunta:"",
    respuesta:"",
  };

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    const idUser = localStorage.getItem('token');
    if (idUser !== null) {
      this.loginService.getDataUser(idUser).subscribe(data => {
        this.dataUser = data;
      });
    }
  }
}
