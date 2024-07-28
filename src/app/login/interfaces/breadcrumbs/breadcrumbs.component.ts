import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  template: `
    <div>
      <a routerLink="/" class="texto-home">Home</a>
      <ng-container *ngFor="let breadcrumb of breadcrumbs; let last = last">
        <span> / </span>
        <ng-container *ngIf="last; else breadcrumbLink">
          <span>{{ breadcrumb.label }}</span>
        </ng-container>
        <ng-template #breadcrumbLink>
          <a routerLink="{{ breadcrumb.url }}" class="text-decoration-none text-dark">{{ breadcrumb.label }}</a>
        </ng-template>
      </ng-container>
    </div>
  `,
})
export class BreadcrumbsComponent {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      breadcrumbs.push({ label: routeURL, url: url });
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}

interface Breadcrumb {
  label: string;
  url: string;
}