Top, voici **10 nouveaux exercices niveau junior+++** Node.js / Express / API REST. Comme d’hab, c’est un mix de QCM, d’implémentations et de corrections. Prêt ? C’est parti 👇

---

### **1. QCM – Middleware d’erreur**

Lequel de ces middlewares gère **correctement** les erreurs dans Express ?

A.

```js
function(err, req, res, next) {
  res.send(err.message);
}
```

B.

```js
function(err, res, req, next) {
  res.status(500).send('Error!');
}
```

C.

```js
function(err, req, res) {
  res.status(500).json({ message: err.message });
}
```

D.

```js
function(req, res, next) {
  try {
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
```

---

### **2. Implémentation – Protection par token**

Crée un middleware `requireToken` qui :

* Récupère le token dans le header `Authorization: Bearer <token>`
* Si le token est `'secret-token'`, il appelle `next()`
* Sinon, il renvoie une 403 avec `Access denied`

---

### **3. QCM – Méthode HTTP**

Laquelle de ces méthodes HTTP est **non-idempotente** ?

A. GET
B. PUT
C. DELETE
D. POST

---

### **4. Implémentation – Timeout automatique**

Crée un middleware qui :

* Annule les requêtes qui durent plus de 5 secondes
* Et renvoie une erreur 408 avec `Request Timeout`

---

### **5. Correction – Route dynamique**

Voici une route Express :

```js
app.get('/user/:id', (req, res) => {
  const id = req.query.id;
  res.send(`ID is ${id}`);
});
```

➡️ Corrige le bug

---

### **6. Implémentation – Logger JSON**

Écris un middleware `logJson` qui logge chaque requête sous forme :

```json
{ "method": "GET", "path": "/api", "time": "12:00:32" }
```

---

### **7. QCM – Appels asynchrones**

Quel est le bon ordre d’exécution ?

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

A. A D C B
B. A C D B
C. A D B C
D. C A D B

---

### **8. Implémentation – Upload fichier (base)**

Écris un point de terminaison `/upload` qui :

* Utilise `express.raw()` pour récupérer un fichier envoyé dans le body
* Sauvegarde le contenu dans `uploads/file.txt` (avec `fs.writeFile`)

---

### **9. QCM – Sécurité**

Quel header est ajouté par `helmet()` pour éviter le clickjacking ?

A. `X-Frame-Options`
B. `X-Content-Type-Options`
C. `X-XSS-Protection`
D. `Content-Security-Policy`

---

### **10. Correction – JWT**

Corrige ce code pour **vérifier correctement** le token :

```js
const token = req.headers.authorization.split(' ')[1];
const payload = jwt.decode(token);
if (!payload) return res.status(403).send('Invalid token');
```

---

Tu peux répondre maintenant, ou me demander des indices, solutions, ou corrections quand t’es prêt ! 💥


=========
CORRIGÉ
=========
Voici les **réponses corrigées et propres (niveau senior)** aux 10 exercices junior+++ en Node.js / Express 👇
Tu peux copier/coller dans un fichier `.md` sans souci.

---

## ✅ Correction – 10 exercices niveau Junior+++

---

### **1. QCM – Middleware d’erreur**

Réponse correcte : **A**

Explication :

* En Express, un **middleware d’erreur** doit avoir **4 paramètres**, dans cet ordre :

  ```js
  (err, req, res, next) => { ... }
  ```

**Correction des autres :**

* **B** → Mauvais ordre des paramètres
* **C** → Manque `next`, donc ce n’est **pas reconnu** comme middleware d’erreur
* **D** → Ce n’est **pas un middleware d’erreur**, juste un `try/catch`

---

### **2. Implémentation – Middleware `requireToken`**

```js
const requireToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const VALID_TOKEN = 'secret-token';

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or malformed token' });
  }

  const token = authHeader.split(' ')[1];

  if (token !== VALID_TOKEN) {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};
```

---

### **3. QCM – Méthode HTTP non-idempotente**

Réponse correcte : **D. POST**

Explication :

* `GET`, `PUT`, `DELETE` sont **idempotents** (appeler plusieurs fois = même effet).
* `POST` peut **créer plusieurs ressources** si appelé plusieurs fois.

---

### **4. Implémentation – Timeout automatique (5 sec)**

```js
const TIMEOUT_MS = 5_000;

const timeoutMiddleware = (req, res, next) => {
  req.timedout = false;

  res.setTimeout(TIMEOUT_MS, () => {
    req.timedout = true;
    if (!res.headersSent) {
      console.error('Request timed out');
      res.status(408).send('Request Timeout');
    }
  });

  next();
};
```

---

### **5. Correction – Route dynamique**

```js
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.send(`ID is ${id}`);
});
```

✅ La correction vient du fait que l’`id` est dans `req.params`, **pas** dans `req.query`.

---

### **6. Middleware – Logger JSON**

```js
const logJson = (req, res, next) => {
  const log = {
    method: req.method,
    path: req.path,
    time: new Date().toLocaleTimeString(),
  };

  console.log(JSON.stringify(log));
  next();
};
```

---

### **7. QCM – Ordre d'exécution**

Réponse correcte : **A. A D C B**

Explication :

* `console.log("A")` → sync
* `console.log("D")` → sync
* `Promise.resolve().then(...)` → microtask
* `setTimeout(..., 0)` → macrotask

---

### **8. Implémentation – Upload avec `express.raw()`**

```js
const express = require('express');
const fs = require('fs').promises;
const app = express();

app.use('/upload', express.raw({ type: '*/*', limit: '5mb' }));

app.post('/upload', async (req, res) => {
  try {
    const FILE_PATH = 'uploads/file.txt';
    await fs.writeFile(FILE_PATH, req.body);
    res.status(201).send('File saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('File write failed');
  }
});
```

✅ `express.raw()` permet de lire directement le buffer du body.

---

### **9. QCM – Sécurité**

Réponse correcte : **A. X-Frame-Options**

Explication :

* `helmet()` ajoute `X-Frame-Options` pour **éviter le clickjacking** (inclusion dans un iframe).
* Les autres headers sont aussi utiles, mais **pas pour ça**.

---

### **10. Correction – Vérification JWT**

```js
const jwt = require('jsonwebtoken');
const MY_SECRET = 'my-secret';

try {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Token missing');
  }

  const payload = jwt.verify(token, MY_SECRET);

  res.status(200).json(payload);
} catch (err) {
  console.error(err);
  res.status(403).send('Invalid token');
}
```

✅ Ici on utilise `jwt.verify()` (et **pas `decode()`**) pour valider la signature et décoder le payload.

---

Si tu veux un fichier `.md` généré directement avec ces réponses formatées, je peux aussi te le préparer. Tu veux ?
