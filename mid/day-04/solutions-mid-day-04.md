====
QCM
====
Parfait 🙌 tu m’as donné tes réponses pour la partie **QCM**.
Voilà la correction détaillée + ta note :

---

## ✅ Correction des QCM intermédiaire++

**1.** Différence entre `app.use` et `app.get`
👉 Réponse correcte : **A, B**

* A. ✅ vrai — `app.use` s’applique globalement si aucun chemin n’est défini.
* B. ✅ vrai — `app.get` ne traite que les requêtes GET sur une route précise.
* C. ❌ faux — `app.use` ne s’exécute pas forcément avant `app.get`.
* D. ❌ faux — `app.get` ne peut pas servir de middleware global.
  ✔️ **Tu as bon !**

---

**2.** Zod schema `User`
👉 Réponse correcte : **A**

* A. ✅ vrai — syntaxe correcte.
* B. ❌ faux — `.min(18)` ne s’applique pas à une string.
* C. ❌ faux — pas de `z.schema`, pas de `z.int()`.
* D. ❌ faux — pas de `z.User` en Zod.
  ✔️ **Tu as bon !**

---

**3.** `_.uniqBy(users, "id")`
👉 Réponse correcte : **B**

* Renvoie `[ { id: 1 }, { id: 2 } ]` car il garde uniquement le premier `id` rencontré.
  ✔️ **Tu as bon !**

---

**4.** Empêcher le blocage de l’event loop
👉 Réponse correcte : **B, D**

* B. ✅ vrai — éviter le code synchrone lourd.
* D. ✅ vrai — `cluster` ou `worker_threads` est une solution pour tâches CPU intensives.
* A. ❌ faux — `Promise.all` ne règle pas le problème d’event loop.
* C. ❌ faux — `setTimeout` ne résout pas un blocage.
  ❌ Tu as mis seulement **B** → **réponse partielle**.

---

**5.** Pourquoi préférer `unknown` à `any`
👉 Réponse correcte : **A**

* A. ✅ vrai — `unknown` oblige à vérifier le type avant usage.
* B. ❌ faux — performance identique.
* C. ❌ faux — `any` est plus permissif, pas plus strict.
* D. ❌ faux — ils ne sont pas identiques.
  ✔️ **Tu as bon !**

---

## 📊 Résultat

* Q1 : ✅
* Q2 : ✅
* Q3 : ✅
* Q4 : ❌ (incomplet)
* Q5 : ✅

👉 Score : **4/5 (80%) → très solide** 👌
La seule petite erreur est sur la Q4 : il fallait aussi penser à **D (worker\_threads/cluster)**.

---

Veux-tu que je corrige maintenant aussi tes **exercices de code (6 à 10)** pour cette série, avec notation et version senior ?

=====
CODE
=====
Parfait 👌 merci d’avoir envoyé tes exos (6 → 10).
Je vais faire la **correction détaillée**, dire si ton code est **valide**, puis proposer une **version “senior”** optimisée.

---

## 📝 Correction des exercices

### **6. Middleware validateApiKey**

Ton code :
✅ Correct, tu vérifies la présence de l’API key et renvoies un `401`.
⚠️ Petite remarque : ton `try/catch` n’est pas nécessaire ici, car aucun code async ni code qui peut throw synchrone n’est présent. Ça alourdit.

👉 Version senior :

```ts
function validateApiKey(req, res, next) {
  const apiKey = req.get('x-api-key');
  if (!apiKey) {
    return res.status(401).json({ message: 'Access denied' });
  }
  next();
}
```

---

### **7. Lecture JSON avec fs/promises**

Ton code :
✅ Fonctionnel, bonne gestion d’erreur.
⚠️ Tu utilises `util.promisify` alors que tu as déjà commenté `fs/promises` → version plus moderne et claire avec `fs.promises`.

👉 Version senior :

```ts
const fs = require('fs/promises');

async function readJSONFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error while reading JSON file:', err.message);
    return null;
  }
}
```

---

### **8. Groupement des produits**

Ton code :
✅ Très bien, `_.groupBy` + `_.mapValues` + `_.map`.
⚠️ Style un peu verbeux → tu peux réduire avec un `_.mapValues` direct.

👉 Version senior :

```ts
const _ = require('lodash');

function groupByCategory(products) {
  return _.mapValues(_.groupBy(products, 'category'), items => _.map(items, 'name'));
}
```

---

### **9. Route GET orders/\:id**

Ton code :
✅ Correct, mais :

* `console.error(error)` → bug (la variable est `err`, pas `error`).
* Tu devrais `return` après `res.status` pour éviter d’envoyer deux réponses.

👉 Version senior :

```ts
app.get('/orders/:id', (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ message: 'Not Found' });
  }
  return res.status(200).json(order);
});
```

---

### **10. Fetch users in parallel**

Ton code :
✅ L’idée est bonne, mais :

* `await Promise.allSettled` → tu n’as pas besoin de `await` avant, il bloque pour rien.
* Pas de gestion des erreurs réseau (`res.ok`).

👉 Version senior :

```ts
async function fetchUsersInParallel(ids) {
  const baseUrl = 'https://jsonplaceholder.typicode.com/users/';

  const results = await Promise.allSettled(
    ids.map(async (id) => {
      const url = new URL(id.toString(), baseUrl).href;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed for id ${id}`);
      return res.json();
    })
  );

  return results.map(r => r.status === 'fulfilled' ? r.value : null);
}
```

---

## 📊 Résumé des notes

* **6. Middleware API key** → ✅ correct (juste try/catch inutile).
* **7. JSON file** → ✅ mais moderniser avec `fs/promises`.
* **8. Group by category** → ✅ parfait, peut être condensé.
* **9. Orders route** → ⚠️ bug (`error` non défini).
* **10. Parallel fetch** → ✅ mais améliorable (check `.ok`, placement de `await`).

👉 Score final : **4.5/5 → Excellent niveau intermédiaire++ 🎯**

---

Tu veux que je te propose **une nouvelle série encore plus challengeante (niveau mid/senior débutant)** ou bien on reste en intermédiaire++ encore quelques rounds ?

