import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Database, ref, get, set, remove, onValue, off } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Auth } from '@angular/fire/auth';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
  receta: any = null;
  loading = true;
  likesCount = 0;
  isLiked = false;
  userId = '';
  defaultProfile = 'https://ui-avatars.com/api/?name=User&background=a259c6&color=fff';

  private likesRef: any;

  constructor(
    private route: ActivatedRoute,
    private db: Database,
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef // <-- add this
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = this.auth.currentUser?.uid || '';
    if (id) {
      const recetaRef = ref(this.db, 'recipes/' + id);
      const snapshot = await get(recetaRef);
      if (snapshot.exists()) {
        this.receta = snapshot.val();
        this.receta.id = id;
        // Cambia aquí: usa id_usuario en vez de idAutor
        if (this.receta.id_usuario) {
          await this.fetchAutorInfo(this.receta.id_usuario);
        }
        this.setupLikes();
      }
    }
    this.loading = false;
  }

  async fetchAutorInfo(idUsuario: string) {
    const autorRef = ref(this.db, 'usuarios/' + idUsuario);
    const autorSnap = await get(autorRef);
    if (autorSnap.exists()) {
      const autor = autorSnap.val();
      this.receta = {
        ...this.receta,
        nombreAutor: autor.nombre,
        fotoPerfilAutor: autor.fotoPerfil && autor.fotoPerfil.trim() !== '' ? autor.fotoPerfil : this.defaultProfile
      };
    } else {
      this.receta = {
        ...this.receta,
        nombreAutor: 'Autor desconocido',
        fotoPerfilAutor: this.defaultProfile
      };
    }
    this.cdr.detectChanges();
  }

  verPerfilAutor() {
    // Cambia aquí: usa id_usuario en vez de idAutor
    if (this.receta?.id_usuario) {
      this.router.navigate(['/perfil', this.receta.id_usuario]);
    }
  }

  setupLikes() {
    if (!this.receta?.id) return;
    this.likesRef = ref(this.db, 'likes/' + this.receta.id);

    // Real-time like counter and user like check
    onValue(this.likesRef, snapshot => {
      let count = 0;
      snapshot.forEach(() => { count++; return false; });
      this.likesCount = count;
      this.isLiked = snapshot.hasChild(this.userId);
    });
  }

  async toggleLike() {
    if (!this.userId || !this.receta?.id) return;
    const likeRef = ref(this.db, `likes/${this.receta.id}/${this.userId}`);
    if (this.isLiked) {
      await remove(likeRef);
    } else {
      const fecha = new Date().toISOString();
      await set(likeRef, {
        id: this.userId + '_' + this.receta.id,
        id_usuario: this.userId,
        id_receta: this.receta.id,
        fecha: fecha
      });
    }
  }

  ngOnDestroy() {
    if (this.likesRef) {
      off(this.likesRef);
    }
  }
}
