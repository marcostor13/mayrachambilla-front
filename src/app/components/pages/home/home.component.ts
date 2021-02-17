import { Component, HostListener, OnInit } from '@angular/core';
import { faWhatsapp, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight, faSearchDollar, faUserPlus, faHeadset, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { Animations } from './home-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [Animations.enterStateLeftRight, Animations.enterState, Animations.zoomImage]
})
export class HomeComponent implements OnInit {

  logo1: String = '/assets/img/logo_b.svg'
  logo2: String = '/assets/img/logo.svg'
  faWhatsapp = faWhatsapp
  faChevronRight = faChevronRight
  faSearchDollar = faSearchDollar
  faUserPlus = faUserPlus
  faHeadset = faHeadset
  faChartLine = faChartLine
  faInstagram = faInstagram
  faLinkedin = faLinkedin
  headerActive: boolean = false
  investments: any
  responsiveOptions: Array<any> = []
  zoomImageEvent: boolean = false

  constructor(
    private api: ApiService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1
      },      
    ];
   }

  ngOnInit(): void {
    this.getInvestments()
  }


  //LISTENERS

  @HostListener('document:scroll', ['$event']) // for window scroll events
  onScroll($event: any) {
    const scroll = $event.srcElement.children[0].scrollTop  
    this.headerActive = (scroll > 40) ? true:false    
  }

  getInvestments() {
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

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }




}
