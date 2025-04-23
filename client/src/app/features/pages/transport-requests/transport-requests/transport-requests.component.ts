import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TransportRequestService } from '../../../../core/services/transport-request.service';
import { TransportRequest } from '../../../../shared/interface/interface';

@Component({
  selector: 'app-transport-requests',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './transport-requests.component.html',
})
export class TransportRequestsComponent implements OnInit {
  transportRequest: TransportRequest[] = [];

  constructor(
    private transportRequestService: TransportRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllTransportRequests();
  }

  // get all transport requests
  getAllTransportRequests(): void {
    this.transportRequestService.getTransportRequest().subscribe({
      next: (data) => {
        this.transportRequest = data;
      },
      error: (e) => console.error(e),
    });
  }

  viewTpReqByReqId(event: Event, request_id: string) {
    if (!(event.target as HTMLElement).closest('button')) {
      this.router.navigate(['transport-requests/show', request_id]);
    }
  }
}
