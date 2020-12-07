import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroImagen'
})
export class FiltroImagenPipe implements PipeTransform {

  transform(peliculas: any[]): unknown {
    return peliculas.filter(x=> {
      return x.backdrop_path;
    });
  }

}
