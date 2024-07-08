import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataUser } from '../../interfaces/dataUser.interface';

@Component({
  selector: 'app-headeradmon',
  templateUrl: './headeradmon.component.html',
  styleUrls: ['./headeradmon.component.css']
})
export class HeaderadmonComponent implements OnInit {
  dataUser: DataUser = {
    name: "",
    lastNameP: "",
    lastNameM: "",
    email: "",
    pregunta: "",
    respuesta:"",
  };
  constructor(private router: Router, private route: ActivatedRoute) { }

  menuVariable: boolean = false;
  menu_icon_variable: boolean = false;

  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }


  ////////////////////////////////
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  navigateToSection(sectionId: string): void {
    this.router.navigate([], {
      fragment: sectionId,
      relativeTo: this.route,
      queryParamsHandling: 'merge'
    });
    this.scrollToSection(sectionId);
  }

  ngOnInit() {

  }
  navegar() {
    this.router.navigate(['/'])

  }

  cerrarSesion(){
    localStorage.clear()
    this.router.navigate(['/'])
  }


}