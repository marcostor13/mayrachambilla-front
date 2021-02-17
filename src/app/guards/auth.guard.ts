import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  user$: Observable<User>

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UsersService,
    private router: Router
  ){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.afAuth.user.pipe(
      map(user=>{
        if(!user){
          this.router.navigate(['/auth/login'])
          return false
        }else{
          return true
        }
      })
    )

  }
  
}
