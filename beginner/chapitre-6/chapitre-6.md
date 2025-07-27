Parfait Ibrahim 👌 Voici **10 nouveaux exercices niveau junior+++ en Node.js**, mélangeant logique, Express, sécurité, async, fichiers, tests, etc.
👉 Comme d’hab, tu peux me répondre avec tes codes ou juste tes choix si y’a des QCM.

---

### **1. \[QCM]**

Quel est l’intérêt principal de `asyncHandler` dans un contrôleur Express ?

A. Empêcher les erreurs `try/catch`
B. Permet de logger les requêtes
C. Capturer les erreurs asynchrones et les transmettre à `next()`
D. Rendre les middlewares plus rapides

---

### **2. \[Code]**

Crée un middleware Express qui bloque toute requête envoyée entre **2h et 4h du matin** (simulateur de maintenance).

---

### **3. \[QCM]**

Qu’affiche ce code Node.js ?

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
```

A. A B C D
B. A C D B
C. A D C B
D. A C B D

---

### **4. \[Code]**

Crée une route `/math/:operation` qui accepte une opération `"add"` ou `"multiply"` sur deux nombres en `query` (`a` et `b`) et renvoie le résultat.

Ex :
GET `/math/add?a=2&b=4` → `{ result: 6 }`
GET `/math/multiply?a=2&b=4` → `{ result: 8 }`

---

### **5. \[QCM]**

Laquelle des propositions empêche le `clickjacking` dans Express avec Helmet ?

A. `app.use(helmet.xssFilter())`
B. `app.use(helmet.frameguard({ action: 'deny' }))`
C. `app.use(helmet.contentSecurityPolicy())`
D. `app.use(helmet.nosniff())`

---

### **6. \[Code]**

Crée un script `ping.js` qui envoie une requête HTTP GET sur un site web donné (ex: `https://example.com`) et affiche :

```
✅ 200 OK (exemple.com) in 230ms
```

Utilise `https` ou une lib comme `node-fetch`.

---

### **7. \[QCM]**

Dans un middleware, que permet la fonction `next('route')` ?

A. Ignorer tous les middlewares
B. Passer à la route suivante sans exécuter le reste du middleware courant
C. Redémarrer le serveur
D. Envoyer un header custom

---

### **8. \[Code]**

Crée un middleware `validateBody(schema)` qui vérifie qu’un `req.body` respecte un **schéma** JSON (format simple, sans `joi`, juste des `typeof`).

Exemple d’appel :

```js
app.post('/user', validateBody({ name: 'string', age: 'number' }), (req, res) => {...})
```

---

### **9. \[QCM]**

Qu’affiche ce code ?

```js
const fs = require('fs/promises');

async function test() {
  try {
    await fs.readFile('unknown.txt', 'utf-8');
  } catch (err) {
    console.log('Caught!');
  }
}
test();
```

A. Caught!
B. undefined
C. TypeError
D. uncaughtException

---

### **10. \[Code]**

Crée un mini serveur Express avec :

* Une route GET `/token` qui renvoie un JWT signé (payload `{ id: 1 }`)
* Une route GET `/me` protégée, qui lit ce token depuis le header `Authorization` et renvoie le payload décodé.

---

Dis-moi si tu veux une **correction immédiate** après chaque réponse ou un batch à la fin 🔥

===========
CORRIGÉ
===========
Excellent taf Ibrahim 💪 Voici la **correction détaillée** de chaque question avec feedback rapide. Globalement c’est **très bon**, surtout que certaines questions sont à la limite du niveau confirmé !

---

### **1. ✅ C – Capturer les erreurs asynchrones**

✔️ **Correct**. C’est l’idée d’un `asyncHandler` (comme celui de `express-async-handler`) : éviter d’avoir à écrire des `try/catch` dans tous les contrôleurs.

---

### **2. ✅ Ton middleware fonctionne !**

🟡 Petit bug de logique : `hour >= 2 && hour <= 4` inclut **4h00** (pas que jusqu'à 3h59). En vrai il faut :

```js
if (hour >= 2 && hour < 4)
```

Sinon, bon middleware 👍

---

### **3. ✅ C – A D C B**

✔️ Exact. L’ordre est :

* `console.log('A')`
* `console.log('D')`
* puis `Promise.then()` (microtask) → `C`
* puis `setTimeout(..., 0)` (macrotask) → `B`

---

### **4. ✅ Parfait**

Code très clair, bien destructuré. Tu pourrais améliorer en vérifiant que `a` et `b` sont bien des nombres, mais sinon c’est good pour un junior++.

---

### **5. ✅ B – frameguard**

✔️ `helmet.frameguard({ action: 'deny' })` empêche le site d’être chargé dans une iframe (protection clickjacking). Bien vu.

---

### **6. 🟡 Fonctionne mais bug dans l’affichage**

Tu as :

```js
resolve(`✅ ${res.statusCode} ${res.statusMessage} (${req.host}) in ${duration}ms`)
```

Mais `req.host` n’existe pas ici. Tu devrais faire :

```js
resolve(`✅ ${res.statusCode} ${res.statusMessage} (${apiUrl.hostname}) in ${duration}ms`)
```

Sinon ton code est très propre, bien structuré, bravo 🔥

---

### **7. ✅ B – Passer à la route suivante**

✔️ Bien joué. `next('route')` saute les **middlewares restants de la route courante** et passe à la suivante.

---

### **8. 🟥 Faux – tu écrases le `req.body`**

Tu as écrit :

```js
req.body = schema;
```

Mais tu devrais comparer `req.body` au schéma, pas le remplacer.

✔️ Voici une version corrigée :

```js
const validateBody = (schema) => {
  return function(req, res, next) {
    for (const key in schema) {
      if (typeof req.body[key] !== schema[key]) {
        return res.status(400).json({ error: `Invalid type for '${key}'` });
      }
    }
    next();
  };
}
```

---

### **9. ✅ A – Caught!**

✔️ Bonne réponse. `fs/promises.readFile()` rejette une promesse si le fichier n’existe pas → tu l’attrapes dans `catch`.

---

### **10. 🟡 Fonctionne mais `decode` ≠ `verify`**

Tu utilises :

```js
const decode = jwt.decode(token, MY_SECRET);
```

Mais `jwt.decode()` **ne vérifie pas la signature**, ce qui est une faille.

✔️ Tu devrais utiliser :

```js
const decode = jwt.verify(token, MY_SECRET);
```

Sinon le reste est super propre 👌

---

### 🔥 Résumé :

| #  | Résultat                                  |
| -- | ----------------------------------------- |
| 1  | ✅                                         |
| 2  | ✅ (légère amélioration possible)          |
| 3  | ✅                                         |
| 4  | ✅                                         |
| 5  | ✅                                         |
| 6  | 🟡 (bug `req.host`)                       |
| 7  | ✅                                         |
| 8  | ❌ (tu remplaces `req.body`)               |
| 9  | ✅                                         |
| 10 | 🟡 (utilise `verify` au lieu de `decode`) |

---

Tu veux que je t’en envoie 10 autres du même niveau ? Ou tu veux monter encore en complexité (type petites API à sécuriser, tests, erreurs edge-case...) ?
