import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ToggleClassService } from '../../../core/services/toggle-class.service';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  toggleStatus: boolean = false;

  ngOnInit(): void {
    initFlowbite();
  }

  constructor(private toggleClassService: ToggleClassService) {
    this.toggleClassService.currentStatus.subscribe(status => {
      this.toggleStatus = status;
    });
  }
}
