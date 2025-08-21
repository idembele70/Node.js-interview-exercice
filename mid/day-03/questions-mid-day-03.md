Parfait 🔥 je vais te générer **10 nouveaux exercices intermédiaires** :
➡️ 5 QCM
➡️ 5 exos de code à faire (sans correction pour l’instant).

---

# 🚀 **Exercices Intermédiaires Node.js / Express / JS**

## **QCM (choix multiple possible)**

**1.** Dans Express, que fait `app.use(express.json())` ?
A. Parse automatiquement les `req.body` en JSON
B. Valide que toutes les requêtes ont un body JSON valide
C. Remplace `body-parser` pour le JSON
D. Transforme la réponse `res` en JSON

---

**2.** Concernant `Promise.allSettled` :
A. Retourne un tableau avec le résultat de chaque promesse (fulfilled ou rejected)
B. Stoppe dès qu’une promesse est rejetée
C. Est plus fiable que `Promise.all` pour éviter qu’une erreur casse tout
D. Retourne uniquement les valeurs résolues

---

**3.** Que fait `lodash.omit(obj, ['password'])` ?
A. Supprime la clé `password` de l’objet original
B. Crée une copie de l’objet sans la clé `password`
C. Retourne `null` si la clé n’existe pas
D. Lance une erreur si la clé n’existe pas

---

**4.** Quelle est la différence entre `PUT` et `PATCH` ?
A. `PUT` met à jour partiellement une ressource
B. `PATCH` met à jour partiellement une ressource
C. `PUT` remplace entièrement la ressource
D. `PATCH` supprime une ressource

---

**5.** À propos de middlewares dans Express :
A. Ils s’exécutent dans l’ordre où ils sont déclarés
B. Un middleware doit toujours appeler `next()` (sauf en cas de réponse envoyée)
C. Ils ne peuvent pas accéder à `req.body`
D. Ils peuvent modifier `req` et `res` avant d’appeler `next()`

---

---

## **Exercices Code**

**6.** Écris un middleware `validateHeaders` qui vérifie que la requête contient l’en-tête :

```http
Content-Type: application/json
```

Sinon → `400 Bad Request`.

---

**7.** Écris une fonction asynchrone `getUserData(userId)` qui va chercher les infos d’un utilisateur depuis :

```
https://jsonplaceholder.typicode.com/users/:id
```

* Si l’utilisateur existe → retourne son objet.
* Sinon → retourne `null`.

---

**8.** Écris une fonction `sanitizeUser(user)` qui :

* prend un objet utilisateur `{id, name, email, password}`
* retourne un nouvel objet **sans le mot de passe** (utilise lodash).

---

**9.** Implémente une route Express :

```http
GET /products/:id
```

* Les produits sont dans un tableau local :

```js
const products = [
  { id: 1, name: "Book", price: 15 },
  { id: 2, name: "Pen", price: 5 },
];
```

* Si l’id existe → retourne l’objet produit
* Sinon → `404 Not Found`

---

**10.** Écris une fonction `fetchInParallel(urls)` qui :

* prend un tableau d’URLs
* fait un `fetch` en parallèle
* retourne un tableau avec uniquement les réponses **réussies** (ignore celles qui plantent).

---

👉 Veux-tu que je corrige ta série **après que tu aies tenté les 10**, ou bien tu préfères que je fasse correction **QCM direct maintenant** puis tu bosses les exos code ?

