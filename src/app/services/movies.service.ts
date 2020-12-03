import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
 private popularesPage:number = 0;
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }
  /**Ejecutar query */
  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }
  getFeature() {
    const dInit = new Date();
    const dEnd = new Date(dInit.getFullYear(), dInit.getMonth() + 1, 0);
    let dinit = this.datePipe.transform(dInit, "yyyy-MM-dd");
    let dend = this.datePipe.transform(dEnd, "yyyy-MM-dd");
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${dinit}&primary_release_date.lte=${dend}`);
  }
  getPopulares(){
    this.popularesPage ++;
    let query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }
}