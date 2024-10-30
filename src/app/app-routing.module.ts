import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteComponent } from './components/docente/docente.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { CursoComponent } from './components/curso/curso.component';
import { TemaComponent } from './components/tema/tema.component';
import { DetallesCursoComponent } from './components/detalles-curso/detalles-curso.component';
import { DetallesDocenteComponent } from './components/detalles-docente/detalles-docente.component';

export const routes: Routes = [
  { path: 'temas', component: TemaComponent },
  
  { path: 'cursos/:id/detalles', component: DetallesCursoComponent },

  { path: 'docentes/:id/detalles', component: DetallesDocenteComponent },

  { path: '', redirectTo: '/cursos', pathMatch: 'full' }, // redireccion por dfecto
  
  { path: 'cursos', component: CursoComponent },
  { path: 'docentes', component: DocenteComponent },
  { path: 'alumnos', component: AlumnoComponent },

  { path: '**', redirectTo: '/cursos' } // redireccion para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
