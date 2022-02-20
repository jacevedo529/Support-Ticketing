import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { NavigationService } from './core/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'support-ticketing-spa';

  // Observable used to dentermine if the request to navigate is still in progress
  private isSpinnerVisibile$: Observable<boolean> = this.navigationService.isNavigationPending$;

  constructor(
    private navigationService: NavigationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    // Check for authentication

    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Determine if loader should render
    this.isSpinnerVisibile$.subscribe(isSpinnerVisible => {
      isSpinnerVisible ? this.spinner.show('primary') : this.spinner.hide('primary');
    });

  }

}
