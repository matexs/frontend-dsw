import { Tema } from './tema';
import { Docente } from './docente';
import { Alumno } from './alumno';

export interface Curso {
  id: number;
  tema: Tema;
  fechaInicio: Date;
  fechaFin: Date;
  docente: Docente;
  precio: number;
  alumnos: Alumno[];
}
