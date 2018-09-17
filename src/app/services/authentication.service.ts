import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    usersList: any = [];
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        let obj = this.usersList.find(x => x.name === username && x.birth_year == password);
            if (obj) {
                localStorage.setItem('currentUser', JSON.stringify(obj));
                return true;
            }else {
                this.logout();
                return false;
            }
    }

    getAllUsers() {
        this.http.get<any>(`${environment.apiUrl}people/`).subscribe(users => {
            this.usersList = users.results;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}