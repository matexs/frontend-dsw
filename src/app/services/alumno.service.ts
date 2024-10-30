import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';


@Injectable({
  providedIn: 'root',
})

export class AlumnoService {

  
  private apiUrl = 'http://localhost:8080/api/alumnos';

  constructor(private http: HttpClient) {}

  
  getAll(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }


  getById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`);
  }

  create(tema: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, tema);
  }
 
  update(id: number, tema: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, tema);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  } 
}
