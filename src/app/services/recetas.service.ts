import { Injectable } from '@angular/core';
import {  Database, ref as dbRef, set } from '@angular/fire/database';


export interface Receta {
  id_receta: string;
  titulo: string;
  descripcion: string;
  tiempoEstimado: string;
  categoria: string;
  ingredientes: string[];
  pasos: string[];
  imagenReceta: string;
  id_usuario: string;
  fechaPublicacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  constructor(private database: Database) {}

  async guardarReceta(receta: Receta): Promise<void> {
    const recetasRef = dbRef(this.database, `recipes/${receta.id_receta}`);
    return set(recetasRef, receta);
  }
  
  
}