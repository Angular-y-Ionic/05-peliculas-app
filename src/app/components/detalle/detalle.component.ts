import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, RespuestaCredits, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  exist: boolean = false;
  oculto = 150;
  slideActores={
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween:-5
  };
  
  constructor(
    private moviesService: MoviesService,
    private modalCtrl : ModalController,
    private dataLocalService: DataLocalService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.getPeliculaDetalle();
    this.getActoriresDetalle();
  }
  getPeliculaDetalle() {
    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe(resp => {
        this.pelicula = resp;
        this.exist = this.dataLocalService.existePelicula(this.pelicula);
      });
  }
  getActoriresDetalle() {
    this.moviesService.getActoriresDetalle(this.id)
      .subscribe(resp => {
        this.actores = resp.cast;
      });
  }
  regresar(){
    this.modalCtrl.dismiss();
  }
  async favorito(){
    this.exist = this.dataLocalService.guardarPelicula(this.pelicula);
    const toast = await this.toastCtrl.create({
      message: this.exist ? 'Agregado a favoritos' :'Removido de favoritos',
      duration: 800,
      translucent: true,
      mode: 'ios',
      position: 'top',
    });
    toast.present();

  }
}