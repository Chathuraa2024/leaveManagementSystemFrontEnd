import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators'
import {Injectable} from "@angular/core";
import {UserAuthService} from "../../service/user-auth.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable(
)
export class AuthInterceptor implements HttpInterceptor{

  constructor(private userAuthService: UserAuthService , private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.headers.get('No-Auth') === 'True'){
      return next.handle(req.clone());
    }
    const token = this.userAuthService.getToken()
     req = this.addToken(req,token);
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err.status === 401){
          this.router.navigate(['/login'])
        }else if(err.status === 403){
          this.router.navigate(['/forbidden'])
        }
        return throwError("something went error")
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string){
    return request.clone(
      {
        setHeaders:{
          Authorization : `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }

}
