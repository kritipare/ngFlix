import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description',
  standalone: true
})
export class DescriptionPipe implements PipeTransform {

  transform(description: string, maxLen: number, ...args: unknown[]): unknown {
    return `${description.substring(0, maxLen)}...`;
  }

}
