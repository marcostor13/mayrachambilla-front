import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from 'src/app/services/users.service';
import { filter, finalize, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { Store } from '@ngrx/store';
import * as action from '@actions/setdata.actions'
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLoad: Boolean = false
  user: any;
  users$: Observable<User[]>
  user$: Observable<User>
  investments: any[] = []
  invalid: Boolean = false

  type: string = 'naturalperson'
  response: String = ''

  form: any = {

    uid: '',

    naturalperson: {
      fatherslastname:'',
      motherslastname:'',
      name:'',
      dninumber:'',
      dateofbirth:'',
      countryofbirth:'',
      countryofresidence:'',
      phone:'',
      address:'',
      dnifront:'',
      dniback:''
    },

    legalperson: {
      company:{
        businessname: '',
        ruc: '',
        fiscaladdress: '',
        ructab: '',
        validityofpowers: '',
      },
      legalrepresentative:{
        fatherslastname: '',
        motherslastname: '',
        name: '',
        dninumber: '',
        dateofbirth: '',
        countryofbirth: '',
        countryofresidence: '',
        phone: '',
        address: '',
        dnifront: '',
        dniback: ''
      }
    }

  }

  uploadsText = {

    naturalperson: {
      dnifront: '',
      dniback: ''
    },
    legalperson: {
      company:{
        ructab: '',
        validityofpowers: '',
      },
      legalrepresentative: {
        dnifront: '',
        dniback: ''
      }
    }

  }

  profile: Array<any>[];


  constructor(
    public router: Router,
    private api: ApiService,
    private userService: UsersService,
    private afAuth: AngularFireAuth,
    private store: Store<{ data: any }>,
    private storage: AngularFireStorage
  ) {

  }

  ngOnInit(): void {
    this.validateSession()
    
  }

  validateSession() {
    this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user.uid))
    ).subscribe((user:any)=>{
      this.user = user
      this.api.c('USER', user)
      this.form.uid = user.uid
      this.getProfile()
    })
    

  }

  setData(data: any) {
    this.store.dispatch(action.setdata({ data: data }))
  }

  toogle(){
    this.response = ''
    this.type = (this.type == 'naturalperson') ? 'legalperson': 'naturalperson'
  }

  saveProfile(){

    this.api.c('FORM', this.form)

    this.isLoad = true
    this.response = ''
    this.invalid = false

    if (this.validation() !== false){   
      
      const dataForm:any = {}      
      dataForm[this.type] = this.form[this.type]
      
      const data = {
        service: 'general/profiles',
        type: this.profile && this.profile.length > 0 ? 'patch' : 'post',
        data: {
          data: {
            uid: this.user.uid,
            data: dataForm
          }
        }        
      }

      this.api.api(data).subscribe((res:any)=>{
        this.api.c('Save profile RES', res)
        this.isLoad = false
        this.response = res.message
      }, (error:any)=>{
        this.api.c('Error Save Profile', error)
        this.isLoad = false
      })


    }else{
      this.isLoad = false
      this.response = 'Debe completar todos los campos'
      this.invalid = true
    }

  }

  getProfile(){    

    this.isLoad = true
    this.response = ''
    this.invalid = false

    const data = {
      service: 'general/profiles/uid/'+this.user.uid,
      type: 'get',
    }

    this.api.api(data).subscribe((res: any) => {
      this.api.c('getProfile RES', res) 
      this.profile = res    
      if (res.length > 0 && res[0].data.data.naturalperson){
        this.form.naturalperson = res[0].data.data.naturalperson
      }

      if (res.length > 0 && res[0].data.data.legalperson) {
        this.form.legalperson = res[0].data.data.legalperson
      }
      this.isLoad = false
    }, (error: any) => {
        this.api.c('Error getProfile', error)
      this.isLoad = false    
    })


    
  }

  validation(){  
  
    let res:boolean = true;
    for (var [key, value] of Object.entries(this.form[this.type])) {

      if(this.type == 'legalperson'){
        for (var [key2, value2] of Object.entries(value)) {
          if (value2 == '') {
            res = false
          }
        } 
      }else{
        if(value == ''){
          res = false
        }
      }
    }
    return res

  }


  uploadDocument(event, field) {

    let type = field.split('-')[0]
    let key = field.split('-')[1]
    let key2
    if(field.split('-').length > 2){
      key2 = field.split('-')[2]
    }

    this.isLoad = true
    const file = event.target.files[0]
    this.uploadsText[type][key] = file.name
    const filePath = `profiledocuments/${new Date().getTime()}_${file.name}`
    const fileRef = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, file)
    // observe percentage changes
    // this.uploadPercent = task.percentageChanges()
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {   
          if (url) {
            if(key2){
              this.form[type][key][key2] = url
            }else{
              this.form[type][key] = url
            }            
            this.isLoad = false
          }
        })
      })
    ).subscribe()
  }

  

  











}
