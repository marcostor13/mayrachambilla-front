import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UsersService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as action from '@actions/setdata.actions'
import { Router } from '@angular/router';



@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {
  
  investments: any[] = []

  constructor(
    private api: ApiService,
    public router: Router,
    private userService: UsersService,
    private store: Store<{ data: any }>,
  ) { }

  ngOnInit(): void {
    this.getInvestments()
  }

  getInvestments(){

    const data = {
      service: 'investments',
      type: 'get',     
    }

    this.api.api(data).subscribe((res: any) => {

      this.api.c('getInvestments Res', res)
      this.investments = res

    }, (error: any) => {
        this.api.c('getInvestments Error', error)
    })

  }

  setData(data: any) {
    this.store.dispatch(action.setdata({ data: data }))
  }

  editInvesment(insvestment){

    this.setData({
      id: insvestment.id      
    })

    this.router.navigate(['/admin/investments/edit-investments'])

  }


}
