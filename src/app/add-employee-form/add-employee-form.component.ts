import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../shared/service/employee.service';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrl: './add-employee-form.component.css'
})
export class AddEmployeeFormComponent implements OnInit {
  myEmployeeForm: FormGroup;
  education: string[] = ["matric", "intermediate", "bachelor", "master", "phd"];
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddEmployeeFormComponent>, private employeeService: EmployeeService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.myEmployeeForm = this.fb.group({
      fname: this.fb.control(''),
      lname: this.fb.control(''),
      email: this.fb.control(''),
      dob: this.fb.control(''),
      gender: this.fb.control(''),
      education: this.fb.control(''),
      company: this.fb.control(''),
      experience: this.fb.control(''),
      package: this.fb.control(''),
    })
  }

  ngOnInit(): void {
    this.myEmployeeForm.patchValue(this.data);
  }

  onEmployeeSubmitForm() {
    // console.log(this.myEmployeeForm.value);
    if (this.data) {
      // update
      const id = this.data.id;
      this.employeeService.updateEmpEmployeeList(id, this.myEmployeeForm.value).subscribe({
        next: (res) => {
          console.log(res);
          alert(' Employee updated successfully');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
          alert('Error while updating employee');
        }
      })
    } else {
      // create
      const empObj = this.myEmployeeForm.value;
      this.employeeService.postEmployeeList(empObj).subscribe({
        next: (res) => {
          console.log(res);
          alert(' Employee Added Successfully');
          this.dialogRef.close(true);
        },
        error: (res) => {
          console.log(res);
        }
      })
    }
  }

  onCancel() {
    this.dialogRef.close(); // Close the dialog without passing any data
  }
}
