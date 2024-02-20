import { Pipe, PipeTransform } from '@angular/core';

//do folderu pipes
@Pipe({
  name: 'space',
  standalone: true
})
export class SpacePipe implements PipeTransform {

  transform(value: string[] ): string {
    return value.join(' ');
  }

}
