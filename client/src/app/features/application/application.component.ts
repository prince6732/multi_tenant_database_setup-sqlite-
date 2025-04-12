import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './application.component.html',
})
export class ApplicationComponent implements OnInit {
  isLoggedIn = false

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    if (this.tokenStorageService.isAuthenticated()) {
      this.router.navigate(['/uf-admin']);
      this.isLoggedIn = true
    }
  }

}
