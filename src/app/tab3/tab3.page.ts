import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  peliculasGroup: any[] = [];

  constructor(
    private dataLocalService: DataLocalService,
    private moviesService: MoviesService) { }

  async ionViewWillEnter(){
    this.peliculas = await this.dataLocalService.cargarFavoritos();
    this.generos = await this.moviesService.getGeneros();
    this.peliculasPorGenero();
  }
  /**Filtra las peliculas por genero */
  peliculasPorGenero(){
    this.generos.forEach(x => {
      this.peliculasGroup.push({
         genero: x.name,
         peliculas: this.peliculas.filter(peli=>peli.genres.find(gen=> gen.id === x.id))
      });
    });
  }
}