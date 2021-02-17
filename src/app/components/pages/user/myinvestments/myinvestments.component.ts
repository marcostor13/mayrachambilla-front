import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from 'src/app/services/users.service';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { Store } from '@ngrx/store';
import * as action from '@actions/setdata.actions'

@Component({
  selector: 'app-myinvestments',
  templateUrl: './myinvestments.component.html',
  styleUrls: ['./myinvestments.component.scss']
})
export class MyinvestmentsComponent implements OnInit {

  isLoad: Boolean = false
  user: any;
  users$: Observable<User[]>
  user$: Observable<User>
  investments: any[] = []

  constructor(
    public router: Router,
    private api: ApiService,
    private userService: UsersService,
    private afAuth: AngularFireAuth,
    private store: Store<{ data: any }>,
  ) { }

  ngOnInit(): void {
    this.validateSession()
  }

  validateSession() {
    this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user.uid))
    ).subscribe((user:any)=>{
      this.api.c('USER', user)
      this.user = user
      this.getInvestments()
    })
  }

  setData(data: any) {
    this.store.dispatch(action.setdata({ data: data }))
  }

  detailInvestment(investment) {

    const newInvestment = {
      id: investment.data.investmentid,
      data: investment.data.dataInvestment
    }
    this.setData(newInvestment)
    this.router.navigate(['/user/search-investments/detail'])
  }


  getInvestments() {
    this.isLoad = true
    const data = {
      service: 'investments-request-by-user/'+this.user.uid,
      type: 'get',
    }

    this.api.api(data).subscribe((res: any) => {

      this.api.c('getInvestments Res', res)
      this.investments = res
      this.isLoad = false

    }, (error: any) => {
      this.api.c('getInvestments Error', error)
    })
  }




}
