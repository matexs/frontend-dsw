import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators,FormsModule } from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { RouterModule,Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-detalles-curso',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './detalles-curso.component.html',
  styleUrl: './detalles-curso.component.css'
})
export class DetallesCursoComponent implements OnInit{
  curso:any;
  alumnoId:number | null = null ;
  alumnosDisponibles: any[] =[];

  constructor(private cursoService: CursoService,
    private alumnoService: AlumnoService,
    private route: ActivatedRoute
  ){}


    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.obtenerCurso(id);
      this.cargarEstudiantesDisponibles();}

  
  obtenerCurso(id:number):void{
    this.cursoService.getById(id).subscribe(
      (data) => {
        this.curso = data;

      },
      (error) => {console.error('Error al obtener los detalles del curso:',error);
    }
    );
  }

  cargarEstudiantesDisponibles(): void {
    
    this.alumnoService.getAll().subscribe(
      (data) => {
        this.alumnosDisponibles = data;
      },
      (error) => {
        console.error('Error al obtener los estudiantes disponibles:', error);
      }
    );
  }

  inscribirAlumnoEnCurso(): void {
    if (this.alumnoId !== null && this.curso) {
      this.cursoService.inscribirAlumno(this.curso.id, this.alumnoId).subscribe(
        () => {
          alert('Estudiante inscrito exitosamente');
          this.obtenerCurso(this.curso.id); 
        },
        (error) => {
          console.error('Error al inscribir estudiante:', error);
        }
      );
    }
  }

  removerAlumnoEnCurso(alumnoId: number): void {
    this.cursoService.removerAlumno(this.curso.id, alumnoId).subscribe(
      () => {
        alert('Alumno removido exitosamente');
        this.obtenerCurso(this.curso.id); 
      },
      (error) => {
        console.error('Error al remover alumno:', error);
      }
    );
  }
}
  

