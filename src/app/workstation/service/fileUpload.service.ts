import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ApiSettings } from '../generic/const/apiSettings.const';
import { GenericService } from '../generic/generic.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class FileUploadService extends GenericService {
  private uploadFileUrl = ApiSettings.API_CDMP;
  private documentFileUrl = ApiSettings.API_CDMP + '/documents?path'

  constructor(public http: HttpClient) {
    super(http);
  }

  public uploadFile(url: string, id: number, file: File, type: string) {
    let formParams = new FormData();
    formParams.append('file', file);
    formParams.append('type', type);
    return this.upload(this.uploadFileUrl + url + id + "/upload", formParams)
  }
  public dowloadFile(path: string) {
    return this.getFile(this.documentFileUrl, path);

  }
}