import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  standalone: true
})
export class ImagePipe implements PipeTransform {

  transform(poster_path: string, ...args: unknown[]): unknown {
    return `https://image.tmdb.org/t/p/w500/${poster_path}`;
  }

}
