
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
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5047, hash: '50b9e95a8d0801792f91414400ede594060915abe34699d9c625b1c5e0145933', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1019, hash: '02ba614aae7cca9211f66d7576965e2140ce43d9d21637a684bcefbd5717d600', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 15159, hash: '907786e9000546434d1e1960061a805d90b8bf81c9d5e38704a132b624dde478', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 15159, hash: '907786e9000546434d1e1960061a805d90b8bf81c9d5e38704a132b624dde478', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 15863, hash: 'e951b9a187b666daefb6f5c071373b866faa929c146a6943cd2da85d87fb88f0', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'styles-EMBJAXFM.css': {size: 315637, hash: 'jx7i+ifeyGg', text: () => import('./assets-chunks/styles-EMBJAXFM_css.mjs').then(m => m.default)}
  },
};
