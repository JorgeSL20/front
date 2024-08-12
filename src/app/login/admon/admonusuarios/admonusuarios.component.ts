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

  updateUserRole(email: string, newRole: string) {
    this.loginService.updateRoleByEmail(email, newRole).subscribe(
      response => {
        console.log('Rol actualizado:', response);
      },
      error => {
        console.error('Error al actualizar el rol:', error);
      }
    );
  }

  onRoleChange(user: DataUser, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newRole = selectElement.value;
    this.updateUserRole(user.email, newRole);
  }
}

