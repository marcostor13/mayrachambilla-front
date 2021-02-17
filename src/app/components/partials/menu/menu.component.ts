import { Component, OnInit } from '@angular/core';
import {  faIdCardAlt, faTachometerAlt, faUsers, faUserMd, faBookMedical, faFilePrescription, faMicroscope, faLaptopMedical, faCalendarAlt  } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from 'src/app/services/users.service';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  faIdCardAlt = faIdCardAlt
  faTachometerAlt = faTachometerAlt
  faUsers = faUsers
  faUserMd = faUserMd
  faBookMedical = faBookMedical
  faFilePrescription = faFilePrescription
  faMicroscope = faMicroscope
  faLaptopMedical = faLaptopMedical
  faCalendarAlt = faCalendarAlt

  imageUser:String = '/assets/img/icons/user.svg'
  path: String = window.location.pathname

  isLoad: Boolean = false
  user: any;

  constructor(
    public router: Router,
    private api: ApiService,
    private userService: UsersService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {

    this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user.uid))
    ).subscribe((user:any)=>{      
      this.user = user
    })

  }

  

}
