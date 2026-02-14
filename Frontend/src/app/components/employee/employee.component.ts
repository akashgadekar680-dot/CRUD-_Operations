import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild('myModal') model!: ElementRef;

  employeelist: Employee[] = [];
  empservice = inject(EmployeeService);

  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setFormState();
    this.getEmployees();
  }

  /** Open Bootstrap Modal */
  openModal() {
    const empModal = document.getElementById('myModal');
    if (empModal) {
      empModal.classList.add('show');
      empModal.style.display = 'block';
    }
  }

  /** Close Bootstrap Modal */
  closeModal() {
    this.setFormState(); // reset form with defaults
    if (this.model) {
      this.model.nativeElement.classList.remove('show');
      this.model.nativeElement.style.display = 'none';
    }
  }

  /** Fetch All Employees */
  getEmployees() {
    this.empservice.getAllEmployees().subscribe((res) => {
      this.employeelist = res;
    });
  }

  /** Initialize / Reset Form */
  setFormState() {
    this.employeeForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // 10 digit mobile
      salary: ['', Validators.required],
      status: [false]
    });
  }

  /** Add / Update Employee */
  onSubmit() {
    if (this.employeeForm.invalid) {
      alert('⚠️ Please Fill All Required Fields');
      return;
    }

    if (this.employeeForm.value.id === 0) {
      // Add Employee
      this.empservice.addEmployee(this.employeeForm.value).subscribe({
        next: () => {
          alert('✅ Employee Added Successfully');
          this.getEmployees();
          this.setFormState();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error while adding employee:', err);
          alert('❌ Something went wrong while adding.');
        }
      });
    } else {
      // Update Employee
      this.empservice.updateEmployee(this.employeeForm.value).subscribe({
        next: () => {
          alert('✅ Employee Updated Successfully');
          this.getEmployees();
          this.setFormState();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error while updating employee:', err);
          alert('❌ Something went wrong while updating.');
        }
      });
    }
  }

  /** Edit Employee */
  onEdit(employee: Employee) {
    this.openModal();
    this.employeeForm.patchValue(employee);
  }

  /** Delete Employee */
  onDelete(employee: Employee) {
    const isConfirm = confirm(`Are you sure you want to delete ${employee.name}?`);
    if (isConfirm) {
      this.empservice.deleteEmployee(employee.id).subscribe({
        next: () => {
          alert('🗑️ Employee Deleted Successfully');
          this.getEmployees();
        },
        error: (err) => {
          console.error('Error while deleting employee:', err);
          alert('❌ Something went wrong while deleting.');
        }
      });
    }
  }
}
