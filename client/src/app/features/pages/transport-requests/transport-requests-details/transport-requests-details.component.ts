import { Component } from '@angular/core';
import { TransportRequest } from '../../../../shared/interface/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TransportRequestService } from '../../../../core/services/transport-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transport-requests-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transport-requests-details.component.html',
})
export class TransportRequestsDetailsComponent {
  tpRequest: TransportRequest | null = null;
  request_id!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transportRequestService: TransportRequestService
  ) {
    this.request_id = this.route.snapshot.paramMap.get('request_id')!;
  }

  ngOnInit(): void {
    this.getTpReqByReqId();
  }

  getTpReqByReqId(): void {
    this.transportRequestService.getTPReqByReqId(this.request_id).subscribe({
      next: (data: any) => {
        this.tpRequest = data.transportRequest;
      },
      error: (e) => console.error(e),
    });
  }

  createTransport(request_id: string): void {
    this.router.navigate(['activate-transport', request_id]);
  }
  
}
