import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
 private popularesPage:number = 0;
 generos: Genre[] = [];
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }
  /**Ejecutar query */
  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
   // console.log(query);
    return this.http.get<T>(query);
  }
  getFeature() {
    const dInit = new Date();
    const dEnd = new Date(dInit.getFullYear(), dInit.getMonth() + 1, 0);
    let dinit = this.datePipe.transform(dInit, "yyyy-MM-dd");
    let dend = this.datePipe.transform(dEnd, "yyyy-MM-dd");
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${dinit}&primary_release_date.lte=${dend}`);
  }
  /**Populares */
  getPopulares(){
    this.popularesPage ++;
    let query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }
  /**Obtiene el detalle de la pelicula */
  getPeliculaDetalle(id: string){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=a`);
  }
  /**Obtiene los actores de la pelicula */
  getActoriresDetalle(id: string){
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=a`);
  }
  /**Busca pelicula */
  getBuscaPelicula(texto: string, page: number){
    return this.ejecutarQuery(`/search/movie?query=${texto}&page=${page}`);
  }
  /**Cargar generos */
  getGeneros(): Promise<Genre[]>{
    return new Promise(resolve=>{
      this.ejecutarQuery(`/genre/movie/list?a=a`)
          .subscribe(resp=>{
              this.generos = resp['genres'];
              resolve(this.generos);
          });
    });
  }
}