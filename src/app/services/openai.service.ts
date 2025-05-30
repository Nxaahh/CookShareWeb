import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  private apiUrl = 'http://localhost:3002/api/openai';
  constructor(private http: HttpClient) {}
  ask(prompt: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { prompt });
  }
}