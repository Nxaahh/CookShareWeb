import { Component } from '@angular/core';
import { RecetasService,Receta } from '../../services/recetas.service';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloudinaryService } from '../../services/cloudinary.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent],
  standalone: true
})
export class CrearRecetaComponent {
  titulo = '';
  descripcion = '';
  tiempoEstimado: number | null = null;
  categoria = '';
  categorias = ["Postres", "Platos principales", "Bebidas", "Entrantes", "Sopas", "Ensaladas"];
  ingredientes: string[] = [''];
  pasos: string[] = [''];
  imagenFile: File | null = null;
  imagenPreview: string | null = null;

  error = '';

  constructor(
    private recetasService: RecetasService,
    private cloudinaryService: CloudinaryService,
    private auth: Auth
  ) {}

  agregarIngrediente() {
    this.ingredientes.push('');
  }

  agregarPaso() {
    this.pasos.push('');
  }

  onImagenSeleccionada(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.imagenFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
      };
      reader.readAsDataURL(this.imagenFile);
    }
  }

  async guardarReceta() {
    this.error = '';

    // Validaciones manuales
    if (!this.titulo.trim() || !this.descripcion.trim() || !this.categoria || !this.tiempoEstimado) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    if (!this.imagenFile) {
      this.error = 'La imagen es obligatoria.';
      return;
    }

    const ingredientesValidos = this.ingredientes.filter(i => i.trim() !== '');
    const pasosValidos = this.pasos.filter(p => p.trim() !== '');

    if (ingredientesValidos.length < 1) {
      this.error = 'Debe haber al menos un ingrediente.';
      return;
    }

    if (pasosValidos.length < 1) {
      this.error = 'Debe haber al menos un paso.';
      return;
    }

    // Subir imagen
    let imagenUrlSubida = '';
    try {
      imagenUrlSubida = await this.cloudinaryService.subirImagen(this.imagenFile);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      this.error = 'No se pudo subir la imagen.';
      return;
    }

    const userId = this.auth.currentUser?.uid || 'anonimo';

    const receta: Receta = {
      id_receta: uuidv4(),
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim(),
      tiempoEstimado: this.tiempoEstimado.toString(),
      categoria: this.categoria,
      ingredientes: ingredientesValidos,
      pasos: pasosValidos,
      imagenReceta: imagenUrlSubida,
      id_usuario: userId,
      fechaPublicacion: new Date().toISOString()
    };

    await this.recetasService.guardarReceta(receta);
    this.resetFormulario();
  }

  resetFormulario() {
    this.titulo = '';
    this.descripcion = '';
    this.tiempoEstimado = null;
    this.categoria = '';
    this.ingredientes = [''];
    this.pasos = [''];
    this.imagenFile = null;
    this.imagenPreview = null;
    this.error = '';
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}