import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Config{
  fileUrl: string;
  jsonfile: string;
}

@Injectable()
export class ConfigService {
  configUrl = '/assets/config-file.json';
  getConfig(): Observable<any> {
    return this.http.get(this.configUrl);
  }

  constructor(
    private http: HttpClient
  ) { }
}
