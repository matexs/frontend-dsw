import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-alumno',
  standalone:true,
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css'] ,
  imports:[ReactiveFormsModule,CommonModule,FormsModule,RouterModule],

})

  export class AlumnoComponent implements OnInit {
  
    filteredAlumnosList: Alumno[] = [];
    searchTerm: string = ''; 
  
    alumnos: Alumno[] = [];
    alumnoForm: FormGroup;
    editing = false;  
    currentAlumnoId: number | null = null; 
  
    constructor(private fb: FormBuilder, private alumnoService: AlumnoService) {
      
      this.alumnoForm = this.fb.group({
        nombre: ['', Validators.required],
        fechaNac: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
  
      this.getAllAlumnos();
    }
  
    getAllAlumnos(): void {
      this.alumnoService.getAll().subscribe((data) => {
        this.alumnos = data;
      });
    }
  
  
    onSubmit(): void {
      if (this.alumnoForm.valid) {
        const alumno: Alumno = this.alumnoForm.value;
  
        if (this.editing && this.currentAlumnoId) {
        
          this.alumnoService.update(this.currentAlumnoId, alumno).subscribe(() => {
            this.getAllAlumnos(); 
            this.resetForm();  
          });
        } else {
        
          this.alumnoService.create(alumno).subscribe(() => {
            this.getAllAlumnos();
            this.resetForm(); 
          });
        }
      }
    }
  
    deleteAlumno(id: number): void {
      this.alumnoService.delete(id).subscribe(() => {
        this.getAllAlumnos(); 
      });
    }
  
    editAlumno(alumno: Alumno): void {
      this.alumnoForm.patchValue({
        nombre: alumno.nombre,
        fechaNac: alumno.fechaNac,
      });
      this.editing = true; 
      this.currentAlumnoId = alumno.id;
    }
  
    
    resetForm(): void {
      this.alumnoForm.reset({
        nombre: '',
        fechaNac: ''
      });
      this.editing = false;
      this.currentAlumnoId = null; 
    }
   
    getFilteredAlumnos(): Alumno[] {
      return this.alumnos.filter(alumno =>
        alumno.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    
  }
  