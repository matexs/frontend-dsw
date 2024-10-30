import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente';

const API_URL = 'http://localhost:8080/api/docentes'; 

@Injectable({
  providedIn: 'root',
})
export class DocenteService {
  constructor(private http: HttpClient) {}

  
  getAll(): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${API_URL}`); 
  }

  
  getById(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${API_URL}/${id}`);
  }


  create(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(API_URL, docente);
  }

  
  update(id: number, docente: Docente): Observable<Docente> {
    return this.http.put<Docente>(`${API_URL}/${id}`, docente);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
