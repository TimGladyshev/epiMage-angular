import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { Batch } from '../models/Batch';
import { Sample } from '../models/Sample';
import { catchError } from 'rxjs/operators';
import { stringResponse } from '../models/string-reponse';
import { User } from '../models/User';
import { UpLoad } from '../models/Upload';

const BATCH_URL = 'http://104.237.9.13:8080/epi/upload/';
const UPLOAD_URL = 'http://104.237.9.13:8080/epi/file/';
const GLOBALS_URL = 'http://104.237.9.13:8080/epi/stats/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsForm = {
  headers: new HttpHeaders({ 'content-Type': 'multipart/form-data'})
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  uploadSample(batchId:string, sample:Sample | undefined): Observable<string[]> {
    return this.http.post<string[]>(`${BATCH_URL}${batchId}/add`, sample, httpOptions);
  }

  initBatch(userId:string): Observable<Batch> {
    return this.http.get<Batch>(`${BATCH_URL}${userId}/init`, httpOptions);
  }

  upLoadCSV(userId:string, file:File): Observable<any> {
    var formData: any = new FormData();
    formData.append("file", file);
    return this.http.post<any>(`${UPLOAD_URL}${userId}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.manageError)
    )
  }

  annotate(upploadId:string, file:File): Observable<any> {
    var formData: any = new FormData();
    formData.append("file", file);
    return this.http.post<any>(`${UPLOAD_URL}${upploadId}/annotate`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.manageError)
    )
  }

  shareUpload(uploadId:string): Observable<any> {
    return this.http.post<any>(`${BATCH_URL}${uploadId}/share`, httpOptions);
  }


  downloadFile(fileName:string): Observable<any> {
		return this.http.get(`${UPLOAD_URL}${fileName}/download`, {responseType: 'blob'});
  }

  deleteUpload(userId:string, uploadId:string): Observable<any> {
    return this.http.delete(`${UPLOAD_URL}${userId}/${uploadId}/delete`, httpOptions);
  }

  getGlobals(): Observable<any> {
    return this.http.get<any>(`${GLOBALS_URL}`);
  }

  manageError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}


