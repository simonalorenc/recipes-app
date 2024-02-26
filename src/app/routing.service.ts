import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  scrollToRecipesList = new EventEmitter<void>()

  constructor() { }
}
