import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/guards/auth.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {

  get isLoggedIn(): boolean { return this.authService.isLoggedIn; }
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public logout() {
    this.authService.logout();
  }

}
