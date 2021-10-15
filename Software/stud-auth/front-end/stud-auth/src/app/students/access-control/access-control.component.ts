import { Component, OnInit } from '@angular/core';
import { AccessControlService } from '../access-control.service';
import { StudentData } from '../student-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent implements OnInit {
  isLoading = true;

  public student: StudentData;

  private studentDataSubscription: Subscription;

  constructor(private accessControlService: AccessControlService) {
    this.studentDataSubscription = accessControlService
      .getStudentData()
      .subscribe((student: StudentData) => {
        this.student = student;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
  }

  onRefresh(){
    this.isLoading = true;
  }

}
