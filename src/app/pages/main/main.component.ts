import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Database, ref, get } from '@angular/fire/database';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RouterModule, Router } from '@angular/router'; // <-- Add Router here
import { FormsModule } from '@angular/forms'; // Añade esta línea

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterModule,
    FormsModule // Añade FormsModule aquí
  ],
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  recetas: any[] = [];
  todasLasRecetas: any[] = [];
  loading = true;

  // Variables para búsqueda y filtro
  busquedaNombre: string = '';
  busquedaTipo: string = '';
  tiposReceta: string[] = [
    'Postres',
    'Platos principales',
    'Bebidas',
    'Entrantes',
    'Sopas',
    'Ensaladas'
  ];

  constructor(private db: Database, private router: Router) {}

  async ngOnInit() {
    try {
      const recetasRef = ref(this.db, 'recipes');
      const snapshot = await get(recetasRef);
      if (snapshot.exists()) {
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

  // Método para búsqueda y filtro combinados
  filtrarRecetas() {
    this.recetas = this.todasLasRecetas.filter(r => {
      const coincideNombre = this.busquedaNombre
        ? (r.titulo || r.nombre || '').toLowerCase().includes(this.busquedaNombre.toLowerCase())
        : true;
      const coincideTipo = this.busquedaTipo
        ? (r.categoria || r.tipo || '').toLowerCase() === this.busquedaTipo.toLowerCase()
        : true;
      return coincideNombre && coincideTipo;
    });
  }

  verDetalle(receta: any) {
    const id = receta.id || receta.id_receta;
    if (id) {
      this.router.navigate(['/receta', id]);
    }
  }
}
