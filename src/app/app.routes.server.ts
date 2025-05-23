import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'register', renderMode: RenderMode.Prerender },
  // Puedes añadir más rutas estáticas si lo deseas
  { path: '**', renderMode: RenderMode.Server } // El resto se renderiza bajo demanda
];
