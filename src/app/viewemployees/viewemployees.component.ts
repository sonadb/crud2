import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee';
import { Employeeservice } from '../employee.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Updateemployee } from '../updateemployee';
import { Addemployee } from '../addemployee';
import { MatFormField } from '@angular/material/form-field';
@Component({
  selector: 'app-viewemployees',
  templateUrl: './viewemployees.component.html',
  styleUrls: ['./viewemployees.component.css']
})
export class ViewemployeesComponent implements OnInit {

employeeId:string | null | undefined | number;
employee: Employee = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  phoneNumber: '',
  gender: '',
  address: '',
  ProfileImageUrl: undefined,
  id: '',

};
  isNewEmployee = false;
  header = '';
  displayProfileImageUrl = '';
  profileUpload: any;
  @ViewChild('employeeDetailsForm') employeeDetailsFormDetailsForm?: NgForm;
  employeeDetailsForm: any;

  constructor(private readonly employeeService: Employeeservice,
    private readonly route: ActivatedRoute,
    private snackbar:MatSnackBar,
    private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
       this.employeeId = params.get('id');
       if(this.employeeId) {
        if(this.employeeId.toLowerCase() === 'Add'.toLowerCase()) {
        //-> New Student Functionality
          this.isNewEmployee = true;
          this.header = 'Add New Applicant';
          this.employeeService.getEmployee(this.employeeId)
          .subscribe(
            (successResponse) => {
              this.employee = successResponse;
            }
          );
          this.setImage();
        } else {
          //-> Existing Applicant Functionality
          this.isNewEmployee = false;
          this.header = 'Edit Applicant';
        }

         this.employeeService.getEmployee(this.employeeId)
        .subscribe(
          (successResponse) => {
            this.employee= successResponse;
            this.setImage();
          },
          (errorResponse) => {
            this.setImage();
          }
        )
       }
      }
    );
  }
  onUpdate():  void {
    {

        }
      this.employeeService.updateEmployee(this.employee.id, this.employee)
   .subscribe(
    (successResponse) => {

      //Show a notification
       this.snackbar.open('Employee Accepted',undefined,{
        duration: 2000
       });
    },
    (errorResponse) => {
      //Log it
      console.log(errorResponse);
    }
   );
  }

     onDelete(): void {
      this.employeeService.deleteEmployee(this.employee.id)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Employee Rejected',undefined,{
            duration:2000
          });
          setTimeout(() => {
            this.router.navigateByUrl('applicants');
          }, 2000);
        },
        (errorResponse) => {
          //Log

        }
      );
     }
     onAdd(): void {
     if(this.employeeDetailsForm?.form.valid){
     }

      this.employeeService.addEmployee(this.employee)
      .subscribe(
        (successResponse) => {
          // Submit form data to Api
       this.snackbar.open('Emlpoyee Added Successfully',undefined,{
       duration:2000
        } );
        },
        (errorResponse) => {
          //Log
        }

      );
     }


     uploadProfile(event:any): void {
     if(this.employeeId) {
      const file:File = event.target.files[0];
      this.employeeService.uploadProfile(this.employee.id,file)
      .subscribe(
        (successResponse) => {
      this.employee.ProfileImageUrl = successResponse;
      this.setImage();

      //Show a notification
      this.snackbar.open('Profile Uploded Successfully',undefined,{
        duration: 2000
       });

        },
        (errorResponse) => {

        }
      )
     }
     }
     private setImage(): void {
      if(this.employee.ProfileImageUrl) {
     this.displayProfileImageUrl = this.employeeService.getImagePath(this.employee.ProfileImageUrl);

      }else {
        //Display a default
        this.displayProfileImageUrl = '../../assets/Images/userlogin.jpg'
      }
     }
}