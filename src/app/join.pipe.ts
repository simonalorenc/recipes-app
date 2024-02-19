import { Pipe, PipeTransform } from '@angular/core';

//do folderu pipes, czy potrzeba space.pipe imo to lepsze tylko moze spaceJoin (nie wiem jaka konwencja nazwy)
@Pipe({
  name: 'join',
  standalone: true
})
export class JoinPipe implements PipeTransform {

  transform(value: string[] ): string {
    return value.join(' ');
  }
}
