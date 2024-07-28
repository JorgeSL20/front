import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-headerpublico',
  templateUrl: './headerpublico.component.html',
  styleUrls: ['./headerpublico.component.css']
})
export class HeaderpublicoComponent implements OnInit {
  menuVariable: boolean = false;
  menu_icon_variable: boolean = false;

  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }

  constructor() { }

  ngOnInit() {
  }
  logoblanco: string = "assets/images/logoblanco.png"
 
}
