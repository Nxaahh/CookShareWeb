import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Database, ref, set, get, child } from '@angular/fire/database';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  fullname = '';
  username = '';
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private db: Database
  ) {}

  async onRegister() {
    if (!this.fullname || !this.username || !this.email || !this.password) {
      this.error = 'Completa todos los campos';
      return;
    }

    try {
      // Verificar si el username ya existe
      const usernamesRef = ref(this.db, 'usernames/' + this.username);
      const snapshot = await get(usernamesRef);
      if (snapshot.exists()) {
        this.error = 'El nombre de usuario ya está en uso';
        return;
      }

      // Registrar usuario en Auth
      const userCredential = await this.authService.register(this.email, this.password);
      const userId = userCredential.user.uid;
      const fecha = new Date().toISOString();

      // Estructura del usuario igual que en Android
      const usuario = {
        id: userId,
        nombre: this.fullname,
        username: this.username,
        email: this.email,
        fotoPerfil: "",
        fechaRegistro: fecha,
        seguidores: 0,
        seguidos: 0,
        recetas: 0,
        recetasFavoritas: []
      };

      // Guardar usuario en la base de datos
      await set(ref(this.db, 'usuarios/' + userId), usuario);

      // Registrar el username en una referencia separada
      await set(ref(this.db, 'usernames/' + this.username), userId);

      this.router.navigate(['/login']);
    } catch (err: any) {
      this.error = err.message;
    }
  }
}
