import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // <-- agrega RouterModule aquí
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/feed']); // Redirige al feed tras login
    } catch (err: any) {
      const rawMessage = err.code || err.message || '';
      this.error = this.traducirErrorFirebase(rawMessage);
    }
    
  }
  private traducirErrorFirebase(mensaje: string): string {
    if (mensaje.includes('user-not-found')) {
      return 'No existe una cuenta con este correo';
    } else if (mensaje.includes('wrong-password')) {
      return 'La contraseña es incorrecta';
    } else if (mensaje.includes('invalid-email')) {
      return 'El correo no es válido';
    } else if (mensaje.includes('too-many-requests')) {
      return 'Demasiados intentos. Intenta más tarde';
    } else {
      return 'Error al iniciar sesión';
    }
  }
  
}
