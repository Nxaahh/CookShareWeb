import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Database, ref, onValue, off } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { query, orderByChild, equalTo } from '@angular/fire/database';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { get } from '@angular/fire/database';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule], // <-- añade RouterModule aquí
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any = null;
  loading = true;
  defaultProfile = 'https://ui-avatars.com/api/?name=User&background=a259c6&color=fff';
  seguidoresCount = 0;
  seguidosCount = 0;
  userRecipes: any[] = [];
  likedRecipes: any[] = [];
  isOwnProfile = false;
  private likesRef: any;
  userRef: any;
  userListener: any;
  recipesRef: any;
  activeTab: string = 'misRecetas'; // Por defecto mostrar "Mis recetas"

  constructor(
    private route: ActivatedRoute,
    private db: Database,
    public authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const currentUserId = this.authService.currentUserId;
    if (id) {
      this.isOwnProfile = id === currentUserId;
      this.userRef = ref(this.db, 'usuarios/' + id);
      this.userListener = onValue(this.userRef, (snapshot) => {
        if (snapshot.exists()) {
          this.user = snapshot.val();
          this.seguidoresCount = this.user.seguidores || 0;
          this.seguidosCount = this.user.siguiendo || 0;
        }
        this.loading = false;
      });

      // Consultar recetas subidas por el usuario
      this.recipesRef = query(ref(this.db, 'recipes'), orderByChild('id_usuario'), equalTo(id));
      onValue(this.recipesRef, (snapshot) => {
        const recetas: any[] = [];
        snapshot.forEach(child => {
          recetas.push({ id: child.key, ...child.val() });
        });
        this.userRecipes = recetas;
      });

      // Fetch liked recipes if own profile
      if (this.isOwnProfile) {
        this.likesRef = ref(this.db, 'likes');
        onValue(this.likesRef, async (likesSnap) => {
          const likedRecipeIds: string[] = [];
          likesSnap.forEach(likeNode => {
            // likeNode.key is the recipeId
            const recipeId = likeNode.key;
            const userLike = likeNode.child(currentUserId);
            if (userLike.exists()) {
              likedRecipeIds.push(recipeId!);
            }
          });

          // Fetch recipe data for each liked recipe
          if (likedRecipeIds.length > 0) {
            const recipesSnap = await get(ref(this.db, 'recipes'));
            const recipesData = recipesSnap.val() || {};
            this.likedRecipes = likedRecipeIds
              .map(id => recipesData[id] ? { id, ...recipesData[id] } : null)
              .filter(r => !!r);
          } else {
            this.likedRecipes = [];
          }
        });
      }
    }
  }

  ngOnDestroy() {
    if (this.userRef) {
      off(this.userRef);
    }
    if (this.recipesRef) {
      off(this.recipesRef);
    }
    if (this.likesRef) {
      off(this.likesRef);
    }
  }
}
