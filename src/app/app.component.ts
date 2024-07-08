import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputValue: string = '';
  outputValue: string = ''; // Asegúrate de que esta línea está presente en tu código.

  handleInput(): void {
    this.outputValue = "Output: " + this.inputValue;
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  title = '404';
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica si la URL no coincide con ninguna ruta existente
        if (!this.activatedRoute.firstChild) {
          this.router.navigate(['/404']);
        }
      }
    });
  }
}
