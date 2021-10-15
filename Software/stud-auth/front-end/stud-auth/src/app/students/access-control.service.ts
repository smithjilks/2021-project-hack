import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { StudentData } from './student-data';
import { environment } from 'src/environments/environment';
import Pusher from 'pusher-js';

const KEY = environment.pusherAppKey;
const CLUSTER = environment.pushAppCluster;

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {


  private subject: Subject<StudentData> = new Subject<StudentData>();

  private pusherClient: Pusher;

  constructor() {
    this.pusherClient = new Pusher(KEY, { cluster: CLUSTER });

    const channel = this.pusherClient.subscribe('display-channel');

    channel.bind(
      'stud-access',
      (student:{ firstName: string; lastName: string; email: string, regNumber: string, imagePath: string }) => {
        this.subject.next(new StudentData(student.firstName, student.lastName, student.email, student.regNumber, student.imagePath));
      }
    );
  }

  getStudentData(): Observable<StudentData> {
    return this.subject.asObservable();
  }
}
