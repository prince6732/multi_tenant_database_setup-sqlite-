import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { ToggleClassService } from '../../../core/services/toggle-class.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  toggleStatus: boolean = false;
  user!: User;
  isProfileDropdownOpen = false;

  constructor(
    public tokenStorageService: TokenStorageService,
    private router: Router,
    private toggleService: ToggleClassService
  ) {
    this.toggleService.currentStatus.subscribe(status => {
      this.toggleStatus = status;
    });
  }

  ngOnInit(): void {
    if (this.tokenStorageService.isAuthenticated()) {
      this.user = this.tokenStorageService.getUser();
    }
    document.addEventListener(
      'click',
      this.closeDropdownOnOutsideClick.bind(this)
    );
  }

  ngOnDestroy(): void {
    document.removeEventListener(
      'click',
      this.closeDropdownOnOutsideClick.bind(this)
    );
  }

  toggleProfileDropdown(event: Event): void {
    event.stopPropagation();
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  closeDropdownOnOutsideClick(event: MouseEvent): void {
    const dropdownMenu = document.getElementById('profile-dropdown-menu');
    const dropdownToggle = document.getElementById('profile-trigger');
    const target = event.target as HTMLElement;

    if (
      dropdownMenu &&
      dropdownToggle &&
      !dropdownMenu.contains(target) &&
      !dropdownToggle.contains(target)
    ) {
      this.isProfileDropdownOpen = false;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/']);
  }

  toggle() {
    this.toggleService.toggle();
  }
}
