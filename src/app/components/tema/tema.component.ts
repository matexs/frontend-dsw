import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { TemaService } from '../../services/tema.service';
import { Tema } from '../../models/tema';
import { CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tema',
  standalone:true,
  templateUrl: './tema.component.html',
  imports:[ReactiveFormsModule,CommonModule,FormsModule,RouterModule],
})
export class TemaComponent implements OnInit {
  filteredTemasList: Tema[] = [];
  searchTerm: string = ''; 

  temas: Tema[] = [];
  temaForm: FormGroup;
  editing = false;  
  currentTemaId: number | null = null;  

  constructor(private fb: FormBuilder, private temaService: TemaService) {
    this.temaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllTemas();
  }


  getAllTemas(): void {
    this.temaService.getAll().subscribe((data) => {
      this.temas = data;
     this.filteredTemasList = this.temas;
    });
  }


  onSubmit(): void {
    if (this.temaForm.valid) {
      const tema: Tema = this.temaForm.value;

      if (this.editing && this.currentTemaId) {
        this.temaService.update(this.currentTemaId, tema).subscribe(() => {
          this.getAllTemas();
          this.resetForm();
        });
      } else {
        this.temaService.create(tema).subscribe(() => {
          this.getAllTemas();  
          this.resetForm();
        });
      }
    }
  }

  deleteTema(id: number): void {
    this.temaService.delete(id).subscribe(() => {
      this.getAllTemas(); 
    });
  }

  editTema(tema: Tema): void {
    this.temaForm.patchValue({
      nombre: tema.nombre,
      descripcion: tema.descripcion,
    });
    this.editing = true;
    this.currentTemaId = tema.id;  
  }

  resetForm(): void {
    this.temaForm.reset({
      nombre: '',
      descripcion: ''
    });
    this.editing = false;
    this.currentTemaId = null; 
  }

    getFilteredTemas(): Tema[] {
      return this.temas.filter(tema =>
        tema.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
}
