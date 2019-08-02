import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private afs: AngularFirestore) { }

  doc$(path): Observable<any> {
    return of(new Error('not implemeted yet...'));
  }

  updateAt(path: string, data: object): Promise<any> {
    throw new Error('not implemeted yet...');
  }

}
