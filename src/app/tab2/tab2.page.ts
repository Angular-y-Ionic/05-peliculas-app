import { Component, ViewChild } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  paginaActual:number = 0;
  mostrarLoad: boolean = false;
  textoBuscar: string = '';
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Avenger', 'Starwars', 'El señor de los anillos', 'Superman'];
  
  
  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) { }

  buscar(event) {
    this.mostrarLoad = true;
    this.textoBuscar = event.detail.value;
    if (this.textoBuscar === ""){
      this.peliculas = [];
      this.paginaActual = 0;
      this.infinite.disabled = false;
      this.mostrarLoad = false;
      return;
    }
    else {
      this.getBuscaPelicula();
    }
  }
   /**Ver detalle */
   async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
  /**Pelicula para buscar */
  getBuscaPelicula(event?){
    this.paginaActual ++;
    this.moviesService.getBuscaPelicula(this.textoBuscar,this.paginaActual)
        .subscribe(resp => {
          const temp = [...this.peliculas, ...  <Pelicula[]>(resp['results'])];
          if (event) {
            this.infinite.complete();
          }
          if (temp.length === 0) {
            this.infinite.disabled = true;
            return;
          }
          this.peliculas = temp;
          this.mostrarLoad = false;
        });
  }
  loadData(event) {
    this.getBuscaPelicula(event);
  }
}