import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  myEmployeeApiUrl: string = 'http://localhost:3000/EmployeeDetails';
  constructor(private http: HttpClient) { }

  // Add To Data in APi Url
  postEmployeeList(empObj: any): Observable<any> {
    return this.http.post(this.myEmployeeApiUrl, empObj)
  }

  // Get To Data in APi Url
  getEmpEmployeeList() {
    return this.http.get(this.myEmployeeApiUrl)
  }

  // Delete To Data in APi Url
  deleteEmpEmployeeList(id: any) {
    return this.http.delete(`http://localhost:3000/EmployeeDetails/${id}`)
  }

  //Update To Data in APi Url
  updateEmpEmployeeList(id: any,empObj:any) {
    return this.http.put(`http://localhost:3000/EmployeeDetails/${id}`,empObj)
  }

  demo(){
    console.log("Hello");
  }

  getData(){
    return this.http.get('http://localhost:3000/EmployeeDetails')
  }
}
