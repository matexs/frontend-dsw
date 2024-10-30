import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators,FormsModule } from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso';
import { RouterModule,Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DocenteService } from '../../services/docente.service';

@Component({
  selector: 'app-detalles-docente',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './detalles-docente.component.html',
  styleUrl: './detalles-docente.component.css'
})

export class DetallesDocenteComponent implements OnInit {

  docente: any;
  cursoId: number | null = null;
  cursosVigentes: Curso[] = [];

  constructor(
    private cursoService: CursoService,
    private docenteService: DocenteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDocente(id);
    this.cargarCursosVigentes(id);
  }

  cargarDocente(idDocente: number): void {
    this.docenteService.getById(idDocente).subscribe(
      (data) => {
        this.docente = data;
      },
      (error) => {
        console.error('Error al obtener los detalles del docente:', error);
      }
    );
  }

  cargarCursosVigentes(idDocente: number): void {
    this.cursoService.getCursosVigentesByDocente(idDocente).subscribe(
      (data) => {
        this.cursosVigentes = data;
      },
      (error) => {
        console.error('Error al obtener los cursos vigentes:', error);
      }
    );
  }
}
