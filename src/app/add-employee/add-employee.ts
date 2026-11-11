import { Component, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeStore } from '../../store/employee-store';

interface EmployeeFormModel {
  name: string;
  id: number;
  role: string;
  age: number;
  projects: string;
}

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormField],
  styleUrl: './add-employee.css',
  templateUrl: './add-employee.html',
})
export class AddEmployee {
  isEdit = false;

  constructor(
    private readonly employeeStore: EmployeeStore,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.route.queryParamMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.isEdit = Boolean(id);
      this.showAddEditEmployee(this.isEdit, id);
    });
  }

  protected readonly model = signal<EmployeeFormModel>({
    name: '',
    id: 0,
    role: '',
    age: 0,
    projects: '',
  });

  protected readonly userForm = form(this.model, (employee) => {
    required(employee.name, { message: 'Name is required' });
    required(employee.id, { message: 'Id is required' });
    required(employee.role, { message: 'Role is required' });
    required(employee.age, { message: 'Age is required' });
    required(employee.projects, { message: 'Project is required' });
  });

  submit(): void {
    if (this.userForm().invalid()) {
      return;
    }

    const selectedProject = this.model().projects ?? '';
    const employee: Employee = {
      ...this.model(),
      id: Number(this.model().id),
      age: Number(this.model().age),
      projects: selectedProject ? [selectedProject] : [],
    };

    if (this.isEdit) {
      this.employeeStore.edit(employee);
    } else {
      this.employeeStore.add(employee);
    }

    void this.router.navigate(['/home']);
  }

  showAddEditEmployee(isEdit: boolean, id: number): void {
    this.isEdit = isEdit;

    if (!isEdit || !id) {
      this.model.set({
        name: '',
        id: 0,
        role: '',
        age: 0,
        projects: '',
      });
      return;
    }

    const employee = this.employeeStore.employees().find((item) => item.id === id);

    if (employee) {
      this.model.set({
        name: employee.name,
        id: employee.id,
        role: employee.role,
        age: employee.age,
        projects: employee.projects[0] ?? '',
      });
    }
  }
}

