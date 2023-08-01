import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.css']
})
export class EmployeeformComponent implements OnInit {
applicant: any;

  // constructor(private Registerapi:ApplicantsserviceService ) { }

  ngOnInit(): void {
  }
  formModel = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    address: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required ]),

    // ConfirmPassword:new FormControl('',[ Validators.required]),
  });
  SaveData() {
    //debugger
    // this.Registerapi.RegisterPost(this.formModel.value).subscribe(
      (res: any) => {
        if (res.succeeded) {

          console.log('New user created!', 'Registration successful.');
        }
        else {
          console.log("error occured");
          this.formModel.reset();
        }
      }
    // );
  }
}