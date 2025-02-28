import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from '../models/tema';


@Injectable({
  providedIn: 'root',
})
export class TemaService {
  private apiUrl = 'http://localhost:8080/api/temas';

  constructor(private http: HttpClient) {}


  getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(this.apiUrl);
  }

  
  getById(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.apiUrl}/${id}`);
  }

  
  create(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(this.apiUrl, tema);
  }


  update(id: number, tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${this.apiUrl}/${id}`, tema);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
