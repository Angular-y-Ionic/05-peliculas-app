import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];
  constructor(private storage: Storage) { 
    this.cargarFavoritos();
  }
  existePelicula(pelicula: PeliculaDetalle): boolean{
    return (this.peliculas.find(x=>x.id === pelicula.id) !== undefined);
  }
  guardarPelicula(pelicula: PeliculaDetalle): boolean {
    let msg = false
    let exist = (this.peliculas.find(x=>x.id === pelicula.id) === undefined);
    // Existe
    if(!exist){ 
      this.peliculas = this.peliculas.filter(x=> x.id !== pelicula.id);
    }
    else{
      this.peliculas.push(pelicula);
      msg = true;
    }
    this.storage.set('peliculas', this.peliculas);
    return msg;
  }
  async cargarFavoritos(){
    let peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }
}