import { Component } from '@angular/core';
import { SweetalertComponent } from '../../../../shared/components/sweetalert.component';
import { UsersService } from '../../../../core/services/users.service';
import { Users } from '../../../../shared/interface/interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightPipe } from '../../../../shared/pipes/highlight.pipe';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightPipe],
  templateUrl: './user-table.component.html',
})
export class UserTableComponent {
  users!: Users[];
  currentUser!: Users[] | null;
  editModal: Users | null = null;
  showCompletionModal = false;
  filteredUsers: Users[] = [];
  searchQuery: string = '';

  constructor(
    private userService: UsersService,
    private sweetalertComponent: SweetalertComponent
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filterUsers();
      },
      error: (e) => console.error(e),
    });
  }

  // Filter clintse by name based on the input
  filterUsers(): void {
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  deleteUser(id: number): void {
    this.sweetalertComponent
      .confirmDelete('Are You Sure! You Want to Delete this User?')
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(id).subscribe({
            next: () => {
              this.getAllUsers();
              this.sweetalertComponent.successMessage(
                'Deleted!',
                'The User has been Deleted.'
              );
            },
            error: (error) => {
              console.error('Error deleting User', error);
              this.sweetalertComponent.errorMessage(
                'Error!',
                'There was an error Deleting the User.'
              );
            },
          });
        }
      });
  }

  openModal(): void {
    this.editModal = null;
    this.showCompletionModal = true;
  }

  openEditModal(user: Users): void {
    this.editModal = user;
    this.showCompletionModal = true;
  }

  closeModal(e: boolean): void {
    this.showCompletionModal = false;
    if (e) {
      this.getAllUsers();
    }
  }
}
