import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  tipos: string[] = ["Postres", "Platos principales", "Bebidas", "Entrantes", "Sopas", "Ensaladas"];
  selectedTipo: string = '';

  @Output() tipoSeleccionado = new EventEmitter<string>();

  constructor(public authService: AuthService, private router: Router) {}

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  onTipoChange() {
    this.tipoSeleccionado.emit(this.selectedTipo);
  }
}
