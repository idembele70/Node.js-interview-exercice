🔥 Parfait ! On passe au **niveau intermédiaire++**.
Tu vas voir, ça mélange de la pratique backend (Node/Express), du typage, un peu de Zod/Lodash, et de l’async avancé.

---

# **Exercices Intermédiaire++**

## **QCM (5 questions)**

**1.** Dans un projet Express, quelle est la différence entre `app.use(middleware)` et `app.get('/route', middleware)` ?
A. `app.use` s’applique à toutes les requêtes si aucun chemin n’est défini.
B. `app.get` ne traite que les requêtes `GET` sur la route précisée.
C. `app.use` s’exécute toujours avant `app.get`.
D. `app.get` peut être utilisé comme middleware global.

---

**2.** Avec **Zod**, lequel de ces schémas permet de valider un objet `User` avec un `name` (string) et `age` (nombre ≥ 18) ?
A. `z.object({ name: z.string(), age: z.number().min(18) })`
B. `z.object({ name: z.string().min(18), age: z.number() })`
C. `z.schema({ name: z.text(), age: z.int().gt(18) })`
D. `z.User({ name: z.string(), age: z.number().gte(18) })`

---

**3.** Que renvoie la fonction suivante ?

```js
const _ = require("lodash");
const users = [{ id: 1 }, { id: 2 }, { id: 1 }];

_.uniqBy(users, "id");
```

A. `[ { id: 1 }, { id: 2 }, { id: 1 } ]`
B. `[ { id: 1 }, { id: 2 } ]`
C. `[ { id: 2 } ]`
D. `[ { id: 1 } ]`

---

**4.** Quelle est la meilleure manière d’empêcher le blocage de l’event loop dans Node.js ?
A. Utiliser uniquement `Promise.all`.
B. Éviter les opérations synchrones lourdes (boucles infinies, `fs.readFileSync` sur de gros fichiers, etc.).
C. Mettre tout le code dans `setTimeout`.
D. Utiliser `cluster` ou `worker_threads` pour paralléliser certaines tâches.

---

**5.** En TypeScript, pourquoi préférer `unknown` à `any` ?
A. `unknown` force à faire un check de type avant usage, contrairement à `any`.
B. `unknown` est plus rapide à exécuter que `any`.
C. `any` est plus strict que `unknown`.
D. Les deux sont identiques.

---

## **Exercices de Code (5 questions)**

**6.** Crée un **middleware Express** `validateApiKey` qui vérifie que la requête contient un header `x-api-key`.

* Si absent → `401 Unauthorized`
* Si présent → `next()`

---

**7.** Écris une fonction `readJSONFile(filePath)` qui :

* lit un fichier JSON depuis `filePath` (en **asynchrone**),
* parse le contenu en objet,
* renvoie l’objet, ou `null` si erreur de parsing/lecture.

---

**8.** Avec **Lodash**, écris une fonction `groupByCategory(products)` qui prend :

```js
[
  { id: 1, name: "Laptop", category: "electronics" },
  { id: 2, name: "Shoes", category: "fashion" },
  { id: 3, name: "Phone", category: "electronics" },
]
```

et renvoie :

```js
{
  electronics: ["Laptop", "Phone"],
  fashion: ["Shoes"]
}
```

---

**9.** Implémente une route Express :
`GET /orders/:id` qui renvoie :

* `200` avec la commande trouvée dans `orders` (un tableau d’objets `{id, item}`),
* `404` si non trouvée.

---

**10.** Écris une fonction `fetchUsersInParallel(ids)` qui prend un tableau d’`ids` et :

* appelle `https://jsonplaceholder.typicode.com/users/{id}` pour chaque id,
* exécute les requêtes **en parallèle**,
* renvoie un tableau de résultats (ou `null` si une requête échoue).

---

👉 Là tu vas voir : ça touche du vrai backend mid-level (Express, Zod, Lodash, async).
Tu veux que je te laisse répondre d’abord **comme d’habitude (sans correction)**, et ensuite je corrige + je te mets la version **senior** ?

