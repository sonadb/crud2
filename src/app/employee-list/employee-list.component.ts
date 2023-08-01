import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../employee';
import { Employeeservice } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeelistComponent implements OnInit {

employees:Employee[] = [];

displayedColumns: string[] = ['firstName','lastName','dateOfBirth','email','phoneNumber','address','gender','edit'];

datasource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
@ViewChild(MatPaginator) matPaginator!: MatPaginator;
@ViewChild(MatSort) matSort!: MatSort;
filterString = '';
  constructor(private employeeService: Employeeservice) { }

  ngOnInit(): void {
    // Fetch applicantslist
    this.employeeService.getApplicants()
    .subscribe(
      (successResponse) => {
        this.employees = successResponse;
        this.datasource = new MatTableDataSource<Employee>(this.employees);
        console.log(this.employees)

        if(this.matPaginator) {
          this.datasource.paginator = this.matPaginator;
        }
        if(this.matSort) {
          this.datasource.sort = this.matSort;
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
  filterApplicants(){
 this.datasource.filter = this.filterString.trim().toLowerCase();
  }
  Edit(id:any){
    this.employeeService.edit(id) .subscribe();
  }
}