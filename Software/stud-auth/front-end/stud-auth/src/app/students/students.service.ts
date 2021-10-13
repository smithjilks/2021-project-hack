import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Student } from './student.model';

const BACKEND_URL = environment.apiUrl + "/students/"

@Injectable({
  providedIn: 'root'
})

export class StudentsService {

  constructor(private http: HttpClient, private router: Router){}

  addStudent(firstName: string, lastName: string, email: string, regNumber: string, image: File, rfidTag: string){

    const studentData = new FormData;
    studentData.append("firstName",firstName);
    studentData.append("lastName", lastName);
    studentData.append("email", email);
    studentData.append("regNumber", regNumber);
    studentData.append("image", image, firstName + "_" + lastName)
    studentData.append("rfidTag", rfidTag);

    this.http.post<{message : string, student: Student}>(BACKEND_URL, studentData)
    .subscribe((responseData) => {
      this.router.navigate(["/"]);
    });


  }

  updateStudent(id: string, firstName: string, lastName: string, email: string, regNumber: string, image: File, rfidTag: string){

    let studentData : FormData | Student;

    if(typeof(image)=== 'object'){
      studentData = new FormData();
      studentData.append('id', id);
      studentData.append("firstName",firstName);
      studentData.append("lastName", lastName);
      studentData.append("email", email);
      studentData.append("regNumber", regNumber);
      studentData.append("image", image, firstName + "_" + lastName);
      studentData.append("rfidTag", rfidTag);

    } else{

      studentData = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        regNumber: regNumber,
        imagePath: image,
        rfidTag: rfidTag
      }
    }

    this.http.put(BACKEND_URL + id, studentData)
    .subscribe( response => {
      this.router.navigate(["/"]);   //navigate user to messages
    })
  }

  getStudent(id: string){
    return this.http.get<{
      _id: string,
      firstName: string,
      lastName: string,
      email: string,
      regNumber: string,
      imagePath: string,
      rfidTag: string,
    }>
    (BACKEND_URL + id);

  }

  deleteStudent(studentId: string){
    return this.http.delete(BACKEND_URL + studentId);

  }
}
