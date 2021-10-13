import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { StudentsService } from '../students.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Student } from '../student.model';

import {mimeType} from '../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-init-student',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  private mode = "create";
  isLoading = true;
  private studentId: string;
  private authStatusSub: Subscription;
  student: Student;
  imagePreview: string;
  form: FormGroup;
  private rfidTag: string;

  constructor(
    public studentsService: StudentsService,
    public route: ActivatedRoute,
    private authService: AuthService){

  }

  ngOnInit(){
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

    this.form = new FormGroup({
      firstName: new FormControl(null,
        { validators:[Validators.required, Validators.minLength(3)]}),
      lastName: new FormControl(null,
        { validators:[Validators.required, Validators.minLength(3)]}),
      email: new FormControl(null,
        { validators:[Validators.required, Validators.minLength(3)]}),
      regNumber: new FormControl(null,
        {validators: [Validators.required]}),
      image: new FormControl(null,
        {validators:[Validators.required], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has("studentId")){
        this.mode = "edit";
        if(paramMap.has("studentId")){
          this.studentId = paramMap.get("studentId") || '';

        }

        this.isLoading = true;
        this.studentsService.getStudent(this.studentId).subscribe(studentData =>{
          this.isLoading = false;
          this.student = {
            id: studentData._id,
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            email: studentData.email,
            regNumber: studentData.regNumber,
            imagePath: studentData.imagePath,
            rfidTag: studentData.rfidTag,
          };

          this.form.setValue({
            firstName: this.student.firstName,
            lastName: this.student.lastName,
            email: this.student.email,
            regNumber: this.student.regNumber,
            image: this.student.imagePath,
          })

        });
      }
      else {
        this.mode = "create";
        this.studentId = "";
      }

    });
  }

  onSaveStudent(){

    if(this.form.invalid){
      return
    }

    this.isLoading = true;

    if(this.mode === "create"){
      this.studentsService.addStudent(
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.email,
        this.form.value.regNumber,
        this.form.value.image,
        this.rfidTag);

    }
    else{
      this.studentsService.updateStudent(
        this.studentId,
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.email,
        this.form.value.regNumber,
        this.form.value.image,
        this.rfidTag)
    }

    this.form.reset();
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
