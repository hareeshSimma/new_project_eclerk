import { Injectable } from '@angular/core';

import { Upload } from '../shared/upload';
import * as _ from "lodash";
import {  Observable, from } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from "@angular/fire/auth";
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }
  private basePath:string = '/api/user/upload';
  uploads:Observable<Upload[]>;

  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload)
      }
    );
  }



  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }
  deleteDp(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}
