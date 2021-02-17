import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UsersService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as action from '@actions/setdata.actions'
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';



@Component({
  selector: 'app-investments-request',
  templateUrl: './investments-request.component.html',
  styleUrls: ['./investments-request.component.scss']
})
export class InvestmentsRequestComponent implements OnInit {

  requests: any[] = []

  isVisible: boolean = false
  response: string = ''
  amount: number
  currentProject: any
  currentUserRequest: any
  isLoad:boolean = false
  confirmAmount: any = ''
  isConfirmate: boolean = false

  constructor(
    private api: ApiService,
    public router: Router,
    private userService: UsersService,
    private store: Store<{ data: any }>,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.getRequest()
  }

  getRequest() {

    const data = {
      service: 'investments-request',
      type: 'get',
    }

    this.api.api(data).subscribe((res: any) => {
      this.api.c('getRequest Res', res)
      this.requests = res
    }, (error: any) => {
        this.api.c('getRequest Error', error)
    })

  }

  setData(data: any) {
    this.store.dispatch(action.setdata({ data: data }))
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Debe completar su información antes de invertir</i>',
      nzContent: '',
      nzOkText: 'Ir a datos de usuario',
      nzOnOk: () => this.router.navigate(['/user/profile'])
    });
  }

  showModal(isConfirmate): void {
    this.response = ''
    this.isVisible = true;
    this.isConfirmate = isConfirmate
  }

  handleOk(): void {
    this.confirmInvestment()
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  detailProject(dataRequest, isConfirmate){
    this.isLoad = true
    this.api.c('currentProject', dataRequest)
    this.currentProject = dataRequest

    this.confirmAmount = dataRequest.data.amount

    const data = {
      service: 'general/profiles/uid/' + dataRequest.data.dataUser.uid,
      type: 'get',
    }

    this.api.api(data).subscribe((res: any) => {
      this.api.c('getProfile RES', res)      
      this.showModal(isConfirmate)
      this.currentUserRequest = res

      
      

      this.isLoad = false
    }, (error: any) => {
      this.api.c('Error getProfile', error)
      this.isLoad = false
    })

  }

  confirmInvestment(){

    this.api.c('confirmAmount', this.confirmAmount)

    this.isLoad = true
   
    const data = {
      service: 'investments-request-update-state/' + this.currentProject.id,
      type: 'patch',
      data: {
        state: 'confirm',
        amount: this.confirmAmount
      }
    }

    this.api.api(data).subscribe((res: any) => {
      this.api.c('confirmInvestment RES', res)
      this.response = 'Inversión Confirmada'
      
      this.getRequest()
      this.isLoad = false
    }, (error: any) => {
        this.api.c('Error confirmInvestment', error)
      this.isLoad = false
    })

  }
  


}
