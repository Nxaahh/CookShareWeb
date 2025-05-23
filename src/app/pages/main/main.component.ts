import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Database, ref, get } from '@angular/fire/database';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RouterModule, Router } from '@angular/router'; // <-- Add Router here

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterModule, // <-- Add this line
  ],
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  recetas: any[] = [];
  todasLasRecetas: any[] = [];
  loading = true;

  constructor(private db: Database, private router: Router) {}

  async ngOnInit() {
    try {
      const recetasRef = ref(this.db, 'recipes');
      const snapshot = await get(recetasRef);
      if (snapshot.exists()) {
        // Cambia esta línea:
        // this.todasLasRecetas = Object.values(snapshot.val());
        // Por esto:
        this.todasLasRecetas = Object.entries(snapshot.val()).map(([id, receta]: any) => ({
          id,
          ...receta
        }));
        this.recetas = [...this.todasLasRecetas];
      } else {
        this.todasLasRecetas = [];
        this.recetas = [];
      }
    } catch (e) {
      this.todasLasRecetas = [];
      this.recetas = [];
    }
    this.loading = false;
  }

  filtrarRecetas(tipo: string) {
    if (!tipo) {
      this.recetas = [...this.todasLasRecetas];
    } else {
      this.recetas = this.todasLasRecetas.filter(r =>
        (r.categoria || r.tipo || '').toLowerCase() === tipo.toLowerCase()
      );
    }
  }

  verDetalle(receta: any) {
    // Suponiendo que cada receta tiene un campo 'id' o 'id_receta'
    const id = receta.id || receta.id_receta;
    if (id) {
      this.router.navigate(['/receta', id]);
    }
  }
}
