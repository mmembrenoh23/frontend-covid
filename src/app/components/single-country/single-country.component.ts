import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CovidService } from '../services/covid.service';

export class CovidSource {
  code: string;
  country: string;
  population: number;
  cases: number;
  time: string;
  continent: string;
}

@Component({
  selector: 'app-single-country',
  templateUrl: './single-country.component.html',
  styleUrls: ['./single-country.component.css'],
})
export class SingleCountryComponent implements OnInit {
  error: boolean;
  messageError: string;
  covid_data = new CovidSource();

  constructor(
    private activatedRoute: ActivatedRoute,
    private covid: CovidService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //console.log(params.country);
      this.showCovidData(params.country);
    });
  }

  showCovidData(term: string) {
    var covid_;
    covid_ = this.covid.getDataCovidByCountry(term);
console.log(term);;
    covid_.subscribe(
      (data: any) => {

        this.covid_data.country = data[0].country;
        this.covid_data.cases = data[0].cases;
        this.covid_data.code = data[0].code;
        this.covid_data.continent = data[0].continent;
        this.covid_data.population = data[0].population;
        this.covid_data.time = data[0].time;

      },
      (errorServicio) => {
        this.error = true;
        this.messageError = errorServicio.error.message;
      }
    );
  }
}
