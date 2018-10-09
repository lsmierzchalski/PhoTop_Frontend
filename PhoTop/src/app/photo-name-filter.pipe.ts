import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from './_models/photo';

@Pipe({
  name: 'photoNameFilter'
})
export class PhotoNameFilterPipe implements PipeTransform {

  transform(photo: Photo[], searchTerm: string): any {
    if (!photo || !searchTerm) {
      console.log(searchTerm);
      console.log(photo);
      return photo;
    }
    console.log(searchTerm);
    console.log(photo);
    return photo.filter(photos =>

      photos.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

  }
}
