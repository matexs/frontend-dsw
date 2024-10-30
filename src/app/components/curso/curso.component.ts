import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators,FormsModule } from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TemaService } from '../../services/tema.service';
import { DocenteService } from '../../services/docente.service';

@Component({
  selector: 'app-curso',
  standalone: true,
  templateUrl: './curso.component.html',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterModule]
  
})


export class CursoComponent implements OnInit {
  filteredCursosList: Curso[] = [];
  searchTerm: string = '';


  fechaFin: string = '';
  
  idDocente: number | null = null;

  temas: any[]=[];
  docentes: any[]=[];

  cursos: Curso[] = [];
  cursoForm: FormGroup;
  editing = false;  
  currentCursoId: number | null = null;  

  constructor(private fb: FormBuilder, 
    private cursoService: CursoService,
    private temaService: TemaService,
    private docenteService: DocenteService,
    private router: Router) {
  
    this.cursoForm = this.fb.group({
      docente:['',Validators.required],
      tema: ['',Validators.required],
      fechaInicio:['',Validators.required],
      fechaFin:['',Validators.required],
      precio: [0, [Validators.required]],
      alumnos: this.fb.array([])

    });
  }

  ngOnInit(): void {
    this.getAllCursos();
    this.cargarTemas();
    this.cargarDocentes();
  }

  getAllCursos(): void {
    this.cursoService.getAll().subscribe((data) => {
      this.cursos = data;
    });
  }

  onSubmit(): void {
    if (this.cursoForm.valid) {
      const curso: Curso = this.cursoForm.value;

      if (this.editing && this.currentCursoId) {

        this.cursoService.update(this.currentCursoId, curso).subscribe(() => {
          this.getAllCursos(); 
          this.resetForm(); 
        });
      } else {
        
        this.cursoService.create(curso).subscribe(() => {
          this.getAllCursos();
          this.resetForm();  
        });
      }
    }
  }

  deleteCurso(id: number): void {
    this.cursoService.delete(id).subscribe(() => {
      this.getAllCursos(); 
    });
  }
  
  editCurso(curso: Curso): void {
    this.cursoForm.patchValue({
      tema: curso.tema,
      fechaInicio: curso.fechaInicio,
      fechaFin: curso.fechaFin
    });
    this.editing = true;
    this.currentCursoId = curso.id; 
  }


  resetForm(): void {
    this.cursoForm.reset({
      tema: '',
      fechaInicio:'',
      fechaFin:'',
      docente:'',
      precio: 0,
      alumnos:'',

    });
    this.editing = false; 
    this.currentCursoId = null; 
  }


  cargarTemas(){
    this.temaService.getAll().subscribe((temas)=>{
      this.temas = temas;

    })
  }
  cargarDocentes(){
    this.docenteService.getAll().subscribe((docentes)=>{
      this.docentes = docentes;

    })
  }

  buscarCursosByFechaFin() {
    if (this.fechaFin) {
      this.cursoService.getCursosByFechaFin(this.fechaFin).subscribe(
        (data) => {
          this.cursos = data; 
          this.searchTerm = ''; 
          this.idDocente = null;
        },
        (error) => {
          console.error('Error al obtener los cursos:', error);
        }
      );
    }
  }
  
 getFilteredCursos(): Curso[] {
  
  let filteredCursos = this.cursos.filter(curso => 
    this.searchTerm ? curso.tema.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) : true
  );

  if (this.fechaFin) {
    filteredCursos = filteredCursos.filter(curso => new Date(curso.fechaFin) <= new Date(this.fechaFin));
  }

  return filteredCursos;
}

}
