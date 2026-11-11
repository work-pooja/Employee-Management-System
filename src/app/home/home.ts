import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Employee, EmployeeStore } from '../../store/employee-store';

@Component({
  imports: [MatTableModule, RouterLink, MatIconModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  constructor(
    private readonly employeeStore: EmployeeStore,
    private readonly router: Router,
  ) {}

  displayedColumns: string[] = ['name', 'role', 'id', 'age', 'projects', 'actions'];

  get dataSource() {
    return this.employeeStore.employees();
  }

  delete(id: number): void {
    this.employeeStore.delete(id);
  }

  edit(employee: Employee): void {
    void this.router.navigate(['/add-employee'], {
      queryParams: { id: employee.id },
    });
  }
}
