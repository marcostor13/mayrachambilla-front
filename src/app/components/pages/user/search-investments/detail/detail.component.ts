import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { UsersService } from 'src/app/services/users.service';

import { Store, select } from '@ngrx/store';
import * as action from '@actions/setdata.actions'
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  isLoad: Boolean = false
  user: any;
  users$: Observable<User[]>
  user$: Observable<User>
  data:any = {}
  isVisible: Boolean = false
  step = 1
  response: String = ''
  invalid: Boolean = false
  amount: Number

  constructor(
    private api: ApiService,
    public router: Router,
    private userService: UsersService,
    private store: Store<{ data: any }>,
    private modal: NzModalService,
    private afAuth: AngularFireAuth,
  ) {

    let x = 0

    this.store.pipe(select('data')).subscribe((data: any) => {      
      if(x==0){
        this.api.c('DATA', data)

        this.data = data
  
        if (!data.id) {
          this.router.navigate(['/user/search-investments'])
        }
        x++
      } 
    })

    this.validateSession()

   }

  ngOnInit(): void {
  }

  validateSession() {
    this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user.uid))
    ).subscribe((user: any) => {
      this.user = user
      this.api.c('USER', user)      
    })


  }

  setData(data: any) {
    this.store.dispatch(action.setdata({ data: data }))
  }

  getPercent(total){
    return 20;
  }

  getInvertido(total) {
    return total*20/100;
  }

  invertir(){
    this.getProfile()
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Debe completar su información antes de invertir</i>',
      nzContent: '',
      nzOkText: 'Ir a datos de usuario',
      nzOnOk: () => this.router.navigate(['/user/profile'])
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.saveRequest()    
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getProfile() {

    this.isLoad = true
    const data = {
      service: 'general/profiles/uid/' + this.user.uid,
      type: 'get',
    }

    this.api.api(data).subscribe((res: any) => {
      this.api.c('getProfile RES', res)
      if (res.length > 0) {
        this.showModal()
      }else{
        this.showConfirm()
      }

      this.isLoad = false
    }, (error: any) => {
      this.api.c('Error getProfile', error)
      this.isLoad = false
    })

  }

  saveRequest(){

    this.isLoad = true
    this.response = ''
    this.invalid = false

    const data = {
      service: 'investments-request',
      type: 'post',
      data: {
        uid: this.user.uid,
        investmentid: this.data.id,
        amount: this.amount
      }
    }

    this.api.api(data).subscribe((res: any) => {
      this.api.c('Save profile RES', res)
      this.isLoad = false

      this.sendMail(this.user.displayName, this.data.data.title)
      
      if(res.message == 'OK'){
        this.step = 2
      }else{
        this.invalid = true
        this.response = res.message
      }

    }, (error: any) => {
      this.api.c('Error Save Profile', error)
      this.isLoad = false
    })


  }


  sendMail(username, title){

   

    const data = {
      service: 'nodemailer',
      type: 'post',
      data: {
        dest: 'marcostor13@mail.com',
        fromname: 'Mayra Chambilla',
        from: 'marcostor13@mail.com',
        subject: 'Nueva Solicitud de Inversión',
        type: '1',
        data: {
          username: username,
          title: title
        }
        
      }
    }

    this.api.api(data).subscribe((res: any) => {
      this.api.c('Save profile RES', res)
      
      if (res.message == 'OK') {
        this.step = 2
      } else {
        
        this.response = res.message
      }

    }, (error: any) => {
      this.api.c('Error Save Profile', error)
      this.isLoad = false
    })
  }

  
}
