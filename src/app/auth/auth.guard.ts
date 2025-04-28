import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.authService.isAuthenticated()) {
            const userRole: string = this.authService.getRole();
            const allowedRoles = next.data["allowedRoles"];

            if (allowedRoles && allowedRoles.includes(userRole)) {
                return true;
            } else if (!allowedRoles) {
                return true;
            } else {
                this.router.navigate(['forbidden']);
                return false;
            }
        }
        this.router.navigate(['auth/login']);
        return false;
    }
}