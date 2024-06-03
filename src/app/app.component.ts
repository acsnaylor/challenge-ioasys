import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd), 
      map(() => {
        let child = this.activatedRoute.firstChild; 
        while (child && child.firstChild) {
          child = child.firstChild;
        }
        return child && child.snapshot.data['title'] ? child.snapshot.data['title'] : null;
      })
    ).subscribe((title: string | null) => {
      if (title) {
        this.titleService.setTitle(title);
      }
    });
  }
}
