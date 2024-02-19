import { Pipe, PipeTransform } from '@angular/core';

//do folderu pipes
@Pipe({
  name: 'space',
  standalone: true
})
export class SpacePipe implements PipeTransform {

  transform(value: string[]): string[] {
    return value .map(item => ' ' + item);  //niepotrzena spacja przed map? taka kolejność nie dodda przed pierwszym elementem spacji? 
  }

}
