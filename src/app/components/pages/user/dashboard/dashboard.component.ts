import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from 'src/app/services/users.service';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoad: Boolean = false
  user: any;
  users$: Observable<User[]>
  user$: Observable<User>


  constructor(
    public router: Router,
    private api: ApiService,
    private userService: UsersService,
    private afAuth: AngularFireAuth
  ) {

  }

  ngOnInit(): void {
    this.validateSession()
  }

  validateSession() {
    this.user$ = this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user.uid))
    )
  }





}
