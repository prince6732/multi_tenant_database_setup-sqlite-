import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TransportRequestService } from '../../../../core/services/transport-request.service';
import { TransportRequest } from '../../../../shared/interface/interface';
import { SweetalertComponent } from '../../../../shared/components/sweetalert.component';

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
    private router: Router,
    private sweetalertComponent: SweetalertComponent
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

  deleteRequest(request_id: number): void {
    this.sweetalertComponent
      .confirmDelete('Are You Sure! You want to Delete this Request?')
      .then((result) => {
        if (result.isConfirmed) {
          this.transportRequestService.deleteTpReq(request_id).subscribe({
            next: () => {
              this.getAllTransportRequests();
              this.sweetalertComponent.showToast(
                'The Request has been Deleted',
                'success',
                2000
              );
            },
            error: (err) => {
              this.sweetalertComponent.showToast(
                err.error.message,
                'error',
                2000
              );
            },
          });
        }
      });
  }
}
