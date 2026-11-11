import { Injectable, signal } from '@angular/core';

export interface Employee {
  name: string;
  role: string;
  id: number;
  age: number;
  projects: string[];
}

const EMPLOYEES: Employee[] = [
  { name: 'John Doe', role: 'Software Engineer', id: 1, age: 30, projects: ['Project A', 'Project B'] },
  { name: 'Jane Smith', role: 'Product Manager', id: 2, age: 35, projects: ['Project C'] },
  { name: 'Alice Johnson', role: 'UX Designer', id: 3, age: 28, projects: ['Project D', 'Project E'] },
];

@Injectable({
  providedIn: 'root',
})
export class EmployeeStore {
  readonly employees = signal<Employee[]>(EMPLOYEES);

  add(employee: Employee): void {
    this.employees.update((current) => [...current, employee]);
  }

  delete(id: number): void {
    this.employees.update((employees) => employees.filter((employee) => employee.id !== id));
  }

  edit(updatedEmployee: Employee): void {
    this.employees.update((employees) =>
      employees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee)),
    );
  }

}
