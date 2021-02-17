import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHeader: Boolean = false
  pathname: String = window.location.pathname

  constructor(public authService: AuthService, public auth: AngularFireAuth, public router: Router) { 
    this.validateSession()
  }

  ngOnInit(): void {
    
  }

  validateSession() {

    if(window.location.pathname != '/citas'){
      this.auth.onAuthStateChanged((user: any) => {
        if (!user) {
          this.router.navigate(['/auth/login'])        
        } 
      })
    }


  }

  toogleMenu(){
    this.menuHeader = this.menuHeader ? false: true
  }

}
