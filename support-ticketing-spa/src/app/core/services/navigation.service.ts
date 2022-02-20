import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

// Service to determine if the navigation is still pending. Meant to work with resolvers

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  public isNavigationPending$: Observable<boolean> = this.router.events.pipe(
    filter((event: any) => this.isConsideredEvent(event)),
    map((event: RouterEvent) => this.isNavigationStart(event)),
    distinctUntilChanged()
  );

  private isConsideredEvent(event: RouterEvent): boolean {
    return this.isNavigationStart(event)
      || this.isNavigationEnd(event);
  }

  private isNavigationStart(event: RouterEvent): boolean {
    return event instanceof NavigationStart;
  }

  private isNavigationEnd(event: RouterEvent): boolean {
    return event instanceof NavigationEnd
      || event instanceof NavigationCancel
      || event instanceof NavigationError;
  }
}
