import { HttpClient } from '@angular/common/http';
import { Injectable, numberAttribute } from '@angular/core';
import { Observable } from 'rxjs';
import { Addemployee } from './addemployee';
import { Employee } from './employee';
import { Updateemployee } from './updateemployee';

@Injectable({
  providedIn: 'root'
})
export class Employeeservice {
  getEmployees() {
    throw new Error('Method not implemented.');
  }
 private baseUrl = 'https://localhost:44345/api/';

  constructor(private httpClient : HttpClient) { }

  getApplicants(): Observable<any> {
      //return this.httpClient.get<Applicant[]>(this.baseUrl + '/employee-list');
      return this.httpClient.get<Employee[]>('https://localhost:44345/api/applicants');
  }
  getEmployee(employeeId :string): Observable<Employee> {
    return this.httpClient.get<Employee>(this.baseUrl + employeeId)
  }
  updateEmployee(employeeIdId:string, employeeRequestRequest: Employee):Observable<Employee> {
    const updateemployeerequest:Updateemployee = {
      firstName: employeeRequestRequest.firstName,
      lastName: employeeRequestRequest.lastName,
      dateOfBirth: employeeRequestRequest.dateOfBirth,
      email: employeeRequestRequest.email,
      phoneNumber: employeeRequestRequest.phoneNumber,
      address: employeeRequestRequest.address,
      gender: employeeRequestRequest.gender,
      id: 0
    }
   return this.httpClient.put<Employee>(this.baseUrl + employeeIdId,updateemployeerequest);
  }
  deleteEmployee(employeeId:string):Observable<Employee> {
   return this.httpClient.delete<Employee>(this.baseUrl + employeeId)
  }
  addEmployee(employeeRequest:Employee):Observable<Employee> {
    const addemployee:Addemployee = {

      firstName:employeeRequest.firstName,
      lastName:employeeRequest.lastName,
      dateOfBirth:employeeRequest.dateOfBirth,
      email:employeeRequest.email,
      phoneNumber:employeeRequest.phoneNumber,
      address:employeeRequest.address,
      gender:employeeRequest.gender
    };
  return this.httpClient.post<Employee>(this.baseUrl + '/employees/add', employeeRequest);
  }
  uploadProfile(applicantId:string,file: File): Observable<any> {
   const formData = new FormData();
   formData.append("profileImage", file);

    return this.httpClient.post(this.baseUrl + '/employees/' + applicantId + '/upload-image',formData, {
    responseType:'text'
   }
   );
  }
  getImagePath(relativePath: string) {
  return '${{this.baseApiUrl}}/${relativePath}';
  }
  edit(id:any){
    console.log(id);
    return this.httpClient.delete<Employee>(this.baseUrl + 'Employees/'+id)
  }
  RegisterPost(object: any) {
    return this.httpClient.post(this.baseUrl + 'Employees', object, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
  }
}