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
  filteredUsers: DataUser[] = [];
  searchTerm: string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.loginService.getAuth().subscribe(
      (data: DataUser[]) => {
        this.dataUsers = data;
        this.filteredUsers = data; // Inicialmente, todos los usuarios están filtrados
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

  filterUsers() {
    if (this.searchTerm) {
      this.filteredUsers = this.dataUsers.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.lastNameP.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.lastNameM.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())||
        user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.dataUsers;
    }
  }
}
