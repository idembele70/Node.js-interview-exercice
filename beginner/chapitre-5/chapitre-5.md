Parfait Ibrahim ! Voici **10 nouveaux exercices niveau Junior+++ / Intermédiaire**, toujours orientés **Node.js backend pur avec Express**, et quelques notions avancées (middleware, async/await, test, sécurité, routing, etc.).
💡 Objectif : **t’entraîner à produire du code propre, modulaire, sécurisé et testable.**

---

### 🧠 1. Middleware – Filtrage IP (QCM)

Quelle option est correcte pour empêcher l’accès à une API si l’IP de la requête est dans une liste noire ?

A. `req.ip === '127.0.0.1' && res.status(403).send('Forbidden')`
B. `res.sendStatus(403)` sans `next()`
C. Utiliser un middleware avec une liste de blacklist
D. Ajouter un header `X-Blocked: true`

---

### 🧠 2. JWT – Renouvellement de token (QCM)

Quelle stratégie est recommandée pour sécuriser le **renouvellement automatique** d’un JWT expiré ?

A. Ne jamais renouveler
B. Rafraîchir le token dans le frontend avec `setInterval()`
C. Ajouter un "refreshToken" signé stocké en HTTP-only cookie
D. Signer un nouveau JWT avec l’ancien JWT comme payload

---

### 🧠 3. Quelle ligne permet de lire un JSON posté via `POST /form` en Express ? (QCM)

A. `app.use(express.static('json'))`
B. `app.post('/form', JSON.parse(req.body))`
C. `app.use(express.json())`
D. `req.body.toJSON()`

---

### 🧪 4. Test – Middleware (coding)

Crée un **middleware** qui bloque toute requête si un header `x-api-key` n’est **pas égal** à `"abcd1234"`.

---

### 🔐 5. Sécurité – HTTP Headers (coding)

Utilise le package [`helmet`](https://www.npmjs.com/package/helmet) pour sécuriser les headers de ton app Express.
Ajoute `crossOriginResourcePolicy: false` pour permettre les images externes.

---

### 🧩 6. Async/Await – Route async (coding)

Crée une route `/wait/:sec` qui utilise `setTimeout` dans une `Promise` pour attendre **X secondes** puis répondre avec :

```json
{ "waited": "X seconds" }
```

---

### 💾 7. File system – Lire un fichier (coding)

Crée une route `/read/:filename` qui lit un fichier texte depuis un dossier `files/` (ex: `files/test.txt`) et renvoie son contenu dans la réponse.

---

### 🔄 8. Logger middleware – Réutilisable (coding)

Transforme ce logger :

```js
(req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}
```

en un **module Node réutilisable** qu’on peut importer comme `import logger from './middlewares/logger.js'`.

---

### 🔄 9. Export multiple contrôleurs (coding)

Crée un fichier `controllers/postController.js` qui exporte 2 fonctions :

* `getAllPosts` – retourne un tableau vide.
* `createPost` – retourne `req.body`.

---

### 🧪 10. Test d’un middleware (coding)

Avec Supertest + Jest, écris un test qui vérifie qu’un middleware bloque l’accès à `/admin` si `x-admin` ≠ `"true"`.

---

Tu peux répondre en copiant-collant juste ton **code pour les questions 4 à 10** (QCM 1–3 juste A/B/C/D).
Quand t’es prêt, envoie, et je corrige comme avant 🧠🔥
