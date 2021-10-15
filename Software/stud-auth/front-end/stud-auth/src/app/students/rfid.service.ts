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
export class RfidService {

  private subject: Subject<string> = new Subject<string>();

  private pusherClient: Pusher;

  constructor() { this.pusherClient = new Pusher(KEY, { cluster: CLUSTER });

    const channel = this.pusherClient.subscribe('entry-channel');

    channel.bind(
      'stud-entry',
      (data: { rfid: string}) => {
        this.subject.next(data.rfid);
      }
    );
  }

  getRFID(): Observable<string> {
    return this.subject.asObservable();
  }
}
