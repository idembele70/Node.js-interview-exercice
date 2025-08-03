Top ! Voici **10 nouvelles questions niveau Junior+++** pour t'entraîner en Node.js / Express / API REST.
Tu auras **5 QCM** et **5 exercices de code**, avec un focus sur les middlewares, les erreurs, la sécurité, les bonnes pratiques, et un peu de logique métier 👇

---

## ✅ 5 QCM – Node.js / Express / Sécurité / Logique

---

### **1. QCM – Middleware d’authentification**

Lequel de ces comportements est une **bonne pratique** pour un middleware d’authentification ?

A. Appeler `next()` sans vérifier quoi que ce soit
B. Retourner un `401 Unauthorized` si aucun token n’est fourni
C. Stocker les identifiants dans les headers sans chiffrement
D. Déclencher un `res.redirect('/login')` même pour une API REST

---

### **2. QCM – Asynchrone dans Express**

Que se passe-t-il si tu oublies `await` dans un handler Express asynchrone ?

A. Express affiche une erreur automatiquement
B. Le code continue mais peut retourner une réponse avant que la promesse ne soit résolue
C. La route plante systématiquement
D. La requête est bloquée jusqu’à la fin de la promesse

---

### **3. QCM – Sécurité API REST**

Lequel de ces éléments est essentiel pour sécuriser une API REST publique ?

A. CORS
B. Helmet
C. Limiteur de requêtes (rate limiting)
D. Tous les précédents

---

### **4. QCM – `express.json()`**

Que fait le middleware `express.json()` ?

A. Transforme les réponses en JSON
B. Parse les corps des requêtes au format JSON
C. Crée automatiquement les routes d’API
D. Convertit les headers en objets JavaScript

---

### **5. QCM – `res.status().send()`**

Quelle est la **bonne syntaxe** pour retourner un statut 204 (no content) dans Express ?

A. `res.send(204)`
B. `res.status(204).json({})`
C. `res.status(204).send()`
D. `res.sendStatus(200)`

---

## ✅ 5 Exercices – Implémentations et corrections

---

### **6. Implémentation – `rateLimiter` simple**

Crée un middleware `rateLimiter` qui :

* Limite chaque IP à 1 requête toutes les 3 secondes
* Sinon, renvoie une erreur 429 avec le message `Too Many Requests`

💡 Astuce : tu peux utiliser un objet `Map` pour stocker les IP et timestamps.

---

### **7. Implémentation – Middleware `blockUserAgent`**

Écris un middleware `blockUserAgent` qui :

* Bloque les requêtes si le header `User-Agent` contient `'curl'`
* Sinon, laisse passer

---

### **8. Implémentation – Router Express**

Crée un routeur Express `/admin` avec deux routes :

* `GET /admin` → `"Admin home"`
* `GET /admin/stats` → retourne un objet JSON `{ users: 5, active: true }`

---

### **9. Correction – En-tête `Content-Type`**

Corrige ce handler Express pour qu’il retourne **du JSON** et **le bon code HTTP** :

```js
app.get('/data', (req, res) => {
  const data = { name: 'John' };
  res.send(data);
});
```

---

### **10. Implémentation – Middleware `delayResponse`**

Écris un middleware `delayResponse(ms)` qui :

* Prend une durée `ms`
* Attend ce temps avant d'appeler `next()`

Exemple d'utilisation :

```js
app.use(delayResponse(2000));
```

---

Souhaite-tu les **corrigés maintenant** ou tu veux d’abord t’entraîner ? 💪

==============
CORRIGÉ
==============
Très bon travail globalement ! Tu montres une bonne compréhension d’Express.js et de la logique métier. Voici une **correction complète** de tes réponses + **notations et suggestions** pour que tu puisses copier-coller dans un fichier `.md`.

---

## ✅ **Correction des 10 exercices Junior+++**

---

### **1. QCM – Middleware d’authentification**

**Ta réponse : B, D**
**✅ Correction : B**

* `D` n’est **pas** adapté aux API REST : on **ne fait pas de `res.redirect()`** dans une API REST, car le client n’est pas un navigateur.

**Note : 0.5 / 1**

---

### **2. QCM – Asynchrone dans Express**

**Ta réponse : B**
**✅ Correct**

> Sans `await`, Express continue sans attendre, ce qui peut créer un comportement inattendu.

**Note : 1 / 1**

---

### **3. QCM – Sécurité API REST**

**Ta réponse : D**
**✅ Correct**

> CORS, Helmet, et le rate limiting sont **tous importants** pour sécuriser une API publique.

**Note : 1 / 1**

---

### **4. QCM – express.json()**

**Ta réponse : B**
**✅ Correct**

> `express.json()` est un middleware pour parser le corps des requêtes **au format JSON**.

**Note : 1 / 1**

---

### **5. QCM – res.status().send()**

**Ta réponse : D**
**❌ Correction : C**

* La bonne syntaxe pour renvoyer un code **204 (no content)** est :

  ```js
  res.status(204).send();
  ```

> `res.sendStatus(200)` renvoie un `200 OK` **avec du contenu HTML minimal**, donc ce n’est pas un vrai 204.

**Note : 0 / 1**

---

### **6. Implémentation – `rateLimiter`**

**Ta réponse : ✅ Fonctionnelle et claire**

✔️ Bonne utilisation de `Map`, `Date.now()` et logique métier.
✔️ Utilisation d’un `TIME_LIMIT` = ✅ pas de magic number.

```js
const IP_MAP = new Map();
const TIME_LIMIT = 3_000;

function rateLimiter(req = express.request, res, next) {
  const lastRequestTime = IP_MAP.get(req.ip);
  const now = Date.now();
  const hasReachLimit = lastRequestTime && now - lastRequestTime < TIME_LIMIT;

  if (hasReachLimit)
    return res.status(429).json({ message: 'Too Many Requests' });

  IP_MAP.set(req.ip, now);
  next();
}
```

**Note : 1 / 1**

---

### **7. Implémentation – `blockUserAgent`**

**Ta réponse : presque bonne**

🔴 **Problème logique :** si le user-agent ne contient pas `'curl'`, tu fais bien `next()`…
…**mais tu continues l’exécution après** au lieu de retourner.

🟢 Il manque un `return` après le `next()`.

**Correction** :

```js
const blockUserAgent = (req, res, next) => {
  try {
    const FORBIDDEN = 'curl';
    const ua = req.headers['user-agent'] || '';

    if (ua.includes(FORBIDDEN))
      return res.sendStatus(401);
    
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
}
```

**Note : 0.75 / 1**

---

### **8. Implémentation – Router Express**

**Ta réponse : ✅ Correcte**

✔️ Bon découpage
✔️ Bonne définition des routes
✔️ `adminRoute` bien monté dans `app.use()`

**Note : 1 / 1**

---

### **9. Correction – Content-Type**

**Ta réponse : fonctionnelle mais légèrement verbale**

```js
res.status(200).json({ message: data });
```

🟢 Tu utilises `res.status(200).json()`, c’est bon.
🔴 Tu n’avais pas à encapsuler `data` dans `message`, sauf si c’était voulu.

**Correction plus neutre** :

```js
app.get('/data', (req, res) => {
  const data = { name: 'John' };
  res.status(200).json(data);
});
```

**Note : 0.75 / 1**

---

### **10. Implémentation – `delayResponse(ms)`**

**Ta réponse : ✅ Parfaite**

```js
function delayResponse(ms) {
  return (req, res, next) => {
    setTimeout(() => {
      next();
    }, ms);
  }
}
```

✔️ Middleware dynamique bien écrit
✔️ Bonne signature

**Note : 1 / 1**

---

## 🧮 Bilan final

| #  | Question           | Note       |
| -- | ------------------ | ---------- |
| 1  | Middleware auth    | 0.5/1      |
| 2  | Asynchrone Express | 1/1        |
| 3  | Sécurité API REST  | 1/1        |
| 4  | express.json()     | 1/1        |
| 5  | Status code        | 0/1        |
| 6  | Rate limiter       | 1/1        |
| 7  | Block user-agent   | 0.75/1     |
| 8  | Router Express     | 1/1        |
| 9  | Correction JSON    | 0.75/1     |
| 10 | Middleware delay   | 1/1        |
|    | **Total**          | **8 / 10** |

---

✅ **Tu as 8/10 – Très solide niveau Junior+++ !**
Tu pourrais viser des premiers entretiens développeur backend Node.js sans souci.
Si tu veux, je peux te proposer une **version "entretien technique réel"** pour aller plus loin ?

Tu veux que je te génère un fichier `.md` ?
