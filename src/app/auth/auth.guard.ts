import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


export const AuthGuard = () => {

  const authService = inject(AuthService)
  const router = inject(Router)
  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login'])
    return false;
  }
};
