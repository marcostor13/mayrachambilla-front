import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { FormInvestment } from './../../../../../interfaces/form-investment'

@Component({
  selector: 'app-edit-investments',
  templateUrl: './edit-investments.component.html',
  styleUrls: ['./edit-investments.component.scss']
})
export class EditInvestmentsComponent implements OnInit {

  textImage: String = 'Imagen'
  isLoad: boolean = false

  id: String;

  form: FormInvestment = {
    title: '',
    summary: '',
    ubication: '',
    minimumAmount: '',
    totalInversion: '',
    duration: '',
    profitability: '',
    startAcquisition: '',
    endAcquisition: '',
    generalInformation: {
      globalSupportInvestmentPlatform: '',
      marketValue: '',
      acquisitionvalue: '',
      commissionForSale: '',
      taxes: '',
    },
    attractivePoints: {
      locationAndValueProposition: '',
      experiencedInvestorLeader: '',
      administrativeAndLegalManagement: '',
      propertyTitle: '',
    },
    projectManager: {
      name: '',
      position: '',
      documentType: '',
      documentNumber: '',
      documentImage: '',
    },
    images: []
  }
  

  images:any[]=[]

  formInvalid: Boolean = false; 
  response: String = ''

  data$: Observable<any>

  uploadPercent:any;
  textImageFiles:any = 'Seleccione una imagen'
  

  constructor(

    private api: ApiService,
    private store: Store<{ data: any }>,
    private storage: AngularFireStorage, 
    private router: Router

  ) {
    this.data$ = this.store.pipe(select('data'))

    this.store.pipe(select('data')).subscribe((data:any)=>{
      if(data.id){
        this.id = data.id
        this.getDataInvestment(data.id)
      }     

      if (!data.id && window.location.pathname == '/admin/investments/edit-investments'){
        // this.router.navigate(['/admin/investments'])
      }

    })
    
   }

  ngOnInit(): void {
  }


  handleUpload(e){

    this.api.c('Handle Upload', e)

  }

  getDataInvestment(id){
    const data = {
      service: 'investments/'+id,
      type: 'get',
    }

    this.api.api(data).subscribe((res: any) => {
      this.api.c('getInvestments Res', res)
      this.form = res.data
    }, (error: any) => {
      this.api.c('getInvestments Error', error)
    })
  }

  resetForm(){
    this.form = {
      title: '',
      summary: '',
      ubication: '',
      minimumAmount: '',
      totalInversion: '',
      duration: '',
      profitability: '',
      startAcquisition: '',
      endAcquisition: '',
      generalInformation: {
        globalSupportInvestmentPlatform: '',
        marketValue: '',
        acquisitionvalue: '',
        commissionForSale: '',
        taxes: '',
      },
      attractivePoints: {
        locationAndValueProposition: '',
        experiencedInvestorLeader: '',
        administrativeAndLegalManagement: '',
        propertyTitle: '',
      },
      projectManager: {
        name: '',
        position: '',
        documentType: '',
        documentNumber: '',
        documentImage: '',
      }, 
      images: []
    }
  }



  saveInformation(){

    let data;

    if(this.id){
      data = {
        service: 'investments/'+this.id,
        type: 'patch',
        data: {
          data: this.form
        }
      }
    }else{
      data = {
        service: 'investments',
        type: 'post',
        data: {
          data: this.form
        }
      }
    }

    this.api.api(data).subscribe((res: any)=>{

      this.api.c('saveInformation Res', res)
      if(res.message){
        this.response = res.message
      }

      if (!this.id){
        this.resetForm()
      }

    }, (error:any) =>{
        this.api.c('saveInformation Error', error)
    })
   
  }

  deleteImage(i){
    this.images.splice(i, 1);
    this.form.images = this.images
  }


  //Image 

  uploadImage(event) {
    this.isLoad = true
    const file = event.target.files[0]
    const filePath = `imagesproperties/${new Date().getTime()}_${file.name}`
    const fileRef = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, file)
    // observe percentage changes
    this.uploadPercent = task.percentageChanges()
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          if (url) {
            this.api.c('URL', url)
            this.images.push(url)

            this.form.images = this.images
            this.isLoad = false
          }
        })
      })
    ).subscribe()
  }

  uploadDocument(event) {
    this.isLoad = true
    const file = event.target.files[0]
    this.textImage = file.name
    const filePath = `proyectmanagerdocuments/${new Date().getTime()}_${file.name}`
    const fileRef = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, file)
    // observe percentage changes
    this.uploadPercent = task.percentageChanges()
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {

          let res:any = {
            documentImage: url
          }

          if (url) {  
            this.form.projectManager = res
            this.isLoad = false
          }
        })
      })
    ).subscribe()
  }




}
