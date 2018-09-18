import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

import { User } from '../models/user';
import { PlanetService } from '../services/planet.service';
import { AlertService } from '../services/alert.service';

@Component({
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss']
  }
)
export class SearchComponent implements OnInit {
    currentUser: User;
    planetData = [];
    planetDetail = null;
    duplicatePlanetData = [];
    searchText: string = '';
    _timeout: any = null;
    searchCount: number = 0;
    firstSearch: boolean = false;
    lastOneMinute: Date;
    constructor(private planetService: PlanetService,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.planetService.getAllPlanets().subscribe((planetData) => {
            this.planetData = planetData.results;
            this.duplicatePlanetData = this.planetData.map(x => Object.assign({}, x));
        })
    }

    showPlanetDetails(planet) {
        this.planetDetail = planet;
    }

    searchPlanet(){
        this.planetDetail = null;
        this.alertService.error('');
        if (!this.firstSearch) {
            this.lastOneMinute = new Date();
        }
        this.firstSearch = true;

        if (new Date().getTime() - this.lastOneMinute.getTime() >= 1*60*1000) {
            this.lastOneMinute = new Date();
            this.searchCount = 0;
        }

        if(this._timeout){
           clearTimeout(this._timeout);
        }

        if (this.searchText.length > 0) {
            this._timeout = setTimeout(() => {
                this.searchCount = this.searchCount + 1;
                if (this.currentUser['name'] != 'Luke Skywalker' && this.searchCount > 15) {
                    this.alertService.error('You have searched more than 15 times in last one minute');
                    return;
                }
                this.planetData =  this.planetData.filter((obj) => {
                    return Object.keys(obj).some((key) => {
                        if (key == 'name') {
                            return obj[key].toLowerCase().includes(this.searchText.toLowerCase());
                        }
                    });
                });
            }, 2000);
        }else {
            this.planetData = this.duplicatePlanetData;
        }
    }
}