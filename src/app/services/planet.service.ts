import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class PlanetService {

    constructor(private http: HttpClient) {
    
    }

    getAllPlanets() {
        return this.http.get<any>(`${environment.apiUrl}planets`);
    }
}