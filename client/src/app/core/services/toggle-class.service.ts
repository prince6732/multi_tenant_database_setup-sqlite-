import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToggleClassService {
  private toggleStatus = new BehaviorSubject<boolean>(false);
  currentStatus = this.toggleStatus.asObservable();

  toggle() {
    this.toggleStatus.next(!this.toggleStatus.value);
  }
}
