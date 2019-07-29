import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  doc$(arg0: string): any {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  updateAt(path, data) {}
}
