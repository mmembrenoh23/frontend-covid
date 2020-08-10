import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CovidService {
  constructor(private client: HttpClient) {}

  getDataCovid() {
    var url: string = 'http://127.0.0.1:8000/api/covid';
    return this.client.get(url).pipe(
      map((data: any) => {
        return data['covid_data'];
      })
    );
  }

  getDataCovidByCountry(query: string) {
    var url: string = 'http://127.0.0.1:8000/api/covid/' + query;

    return this.client.get(url).pipe(
      map((data: any) => {
        return data['covid_data'];
      })
    );
  }

}
