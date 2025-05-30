
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/CookShareWeb/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/CookShareWeb"
  },
  {
    "renderMode": 2,
    "route": "/CookShareWeb/login"
  },
  {
    "renderMode": 2,
    "route": "/CookShareWeb/register"
  },
  {
    "renderMode": 0,
    "route": "/CookShareWeb/feed"
  },
  {
    "renderMode": 0,
    "route": "/CookShareWeb/receta/*"
  },
  {
    "renderMode": 0,
    "route": "/CookShareWeb/perfil/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-OUCCWH2T.js"
    ],
    "route": "/CookShareWeb/ai-assistant"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5098, hash: 'bf0a7ee5f4cdd6930da50402e6da676dadff2a6afd4d7dab0df04f55e127e37e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1070, hash: '0304d9314cc2b793721cffc6236a25c89027ba507165ccece44d240bcfa136e6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 15210, hash: 'f90095856a0d419fc7a6774ee1d59e7ead9eea70b0fbf0b6fe9346c72ea191f8', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 15914, hash: '88ff8b525df1a716d90cc822e271aa4888758b7529fc40f2ea19f995fb0b9bea', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'index.html': {size: 15210, hash: 'f90095856a0d419fc7a6774ee1d59e7ead9eea70b0fbf0b6fe9346c72ea191f8', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-EMBJAXFM.css': {size: 315637, hash: 'jx7i+ifeyGg', text: () => import('./assets-chunks/styles-EMBJAXFM_css.mjs').then(m => m.default)}
  },
};
