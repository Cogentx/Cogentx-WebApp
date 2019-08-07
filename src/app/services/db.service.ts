import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private afs: AngularFirestore) { }

  collection$(path, queryFn?) {
    return this.afs
      .collection(path, queryFn) // afs makes a reference to the Firestore collection
      .snapshotChanges() // returns Observable of the collection of Firestore docs
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            console.log('data', data);

            const id = a.payload.doc.id;
            console.log('id', id);
            // const data = a.payload.doc.data();
            // const id = a.payload.doc.id;
            const returnObj = {id, ...data};
            console.log('returnObj', returnObj);
            return returnObj;
          });
        })
      );
  }

  doc$(path): Observable<any> { // maps the id to the doc itself; similar to collection$ above but only dealing with one object
    return this.afs
      .doc(path) // locate doc based on path
      .snapshotChanges() // return doc as an Observable
      .pipe(
        map(doc => {
          return {id: doc.payload.id, ...doc.payload.data()}; // retrieves all the fields of the doc
        })
      );
  }

  /**
   * @param  path 'collection' or 'collection/docID'
   * @param  data new data
   *
   * Creates or updates data on a collection or document.
   */
  updateAt(path: string, data: object): Promise<any> {
    const segments = path.split('/').filter(v => v);

    // Odd is always a Collection; Even is always Document
    const isCollection: boolean = (segments.length % 2 ? true : false);
    // const isDocument: boolean = (isCollection === true ? false : true);

    if (isCollection) {
      return this.afs.collection(path).add(data);
    } else {
      return this.afs.doc(path).set(data, { merge: true });
    }
  }

  delete(path: string) {
    return this.afs.doc(path).delete();
  }

}
