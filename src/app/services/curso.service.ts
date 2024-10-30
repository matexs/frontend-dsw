import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';


@Injectable({
  providedIn: 'root',
})
export class CursoService {

  private apiUrl = 'http://localhost:8080/api/cursos';


  constructor(private http: HttpClient) {}

  
  getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  
  getById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }


  create(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  
  update(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso);
  }

  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  } 

  getCursosByFechaFin(fechaFin : string): Observable <any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/fin/${fechaFin}`);

  }

  getCursosVigentesByDocente(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/docente/${id}/curso-vigente`);

  }

  inscribirAlumno(cursoid: number, alumnoid: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cursoid}/inscripcion/${alumnoid}`, {});
}

  removerAlumno(cursoid: number, alumnoid: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cursoid}/remover-inscripcion/${alumnoid}`, {});
}

  
}
