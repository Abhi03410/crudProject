import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeFormComponent } from './add-employee-form/add-employee-form.component';
import { EmployeeService } from './shared/service/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private dialLog: MatDialog, private employeeService: EmployeeService) { }
  displayedColumns: string[] = [ 'id', 'fname', 'lname','email','dob','gender','education','company','experience','package','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  ngOnInit(): void {
    this.getEmployeeList();
  }
  onOpenEmployeeFormComponent() {
    const dialogRef = this.dialLog.open(AddEmployeeFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList() {
    this.employeeService.getEmpEmployeeList().subscribe({
      next: (response:any) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  applyFilter(eve:any){
    const filterValue = eve.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // delete Employee 
  deleteEmp(id:any){
    console.log(id);
    this.employeeService.deleteEmpEmployeeList(id).subscribe({
      next: (response:any) => {
        console.log(response);
        this.getEmployeeList();
        alert(' Employee deleted successfully');
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  updateEmp(empDetails:any){
    // console.log(empDetails);
  const dialogRef =  this.dialLog.open(AddEmployeeFormComponent,{
      data:empDetails
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.getEmployeeList();
        }
      }
    })
  }
}
