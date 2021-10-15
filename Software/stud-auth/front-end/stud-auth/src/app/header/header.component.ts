import { Component, OnInit, OnDestroy } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  userType = "non-admin";
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userType = this.authService.getUserType();
    })
  }

  onLogout(){
    this.authService.logout();
  }


  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
