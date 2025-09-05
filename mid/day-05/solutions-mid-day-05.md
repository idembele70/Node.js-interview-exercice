====
QCM
====
Parfait 🚀 Merci pour tes réponses, je vais corriger et analyser :

---

### **QCM Correction**

**1. Dans Express, quel est l’ordre correct de traitement des middlewares et routes ?**
✅ Bonne réponse : **A. Middleware global → Route spécifique → Middleware d’erreur**

* **A (Vrai)** → Express lit la pile dans l’ordre : middlewares globaux, puis routes, puis gestionnaires d’erreurs.
* **B (Faux)** → Les routes ne passent pas avant les middlewares globaux.
* **C (Faux)** → Les middlewares d’erreur ne s’exécutent que si un `next(err)` est appelé.
* **D (Faux)** → Il y a bien un ordre strict.

👉 Ta réponse **D** ❌ → **Incorrect**.

---

**2. Concernant `Promise.allSettled()` vs `Promise.all()` :**
✅ Bonnes réponses : **A, B, C**

* **A (Vrai)** → `allSettled` renvoie toutes les promesses avec leur état (fulfilled ou rejected).
* **B (Vrai)** → `all` rejette dès la première erreur.
* **C (Vrai)** → `allSettled` est utilisé si on veut continuer même avec des erreurs.
* **D (Faux)** → Ils ne se comportent pas identiquement.

👉 Ta réponse **A, B, C** ✅ → **Correct**.

---

**3. Avec Lodash, quelle méthode est adaptée pour supprimer toutes les valeurs `null` ou `undefined` d’un objet profondément imbriqué ?**
✅ Bonne réponse : **A. `_.omitBy`** ou **B. `_.pickBy`** (selon la logique)
⚠️ MAIS **ni `_.compact` ni `_.cleanDeep`** n’existent pour objets imbriqués.
Exemple :

```js
_.omitBy(obj, _.isNil) // supprime null & undefined
```

👉 Ta réponse **C (`_.compact`)** ❌ → **Incorrect**.
(`_.compact` ne marche que sur des tableaux, pas des objets).

---

**4. Schéma Zod correct :**
✅ Bonnes réponses : **B** et **D**

* **B (Vrai)** → usage explicite : `.min(1)`, `.int().positive()`, `.email()`.
* **D (Vrai)** → équivalent mais `.nonempty()` au lieu de `.min(1)`.
* **A (Faux)** → pas de contraintes.
* **C (Faux)** → `name` optionnel et `email` trop permissif.

👉 Ta réponse **D** ✅ → **Correct**.

---

**5. Dans Express, si un middleware appelle `next(err)` ?**
✅ Bonne réponse : **B. Express saute les middlewares normaux et appelle les middlewares d’erreurs.**

* **A (Faux)** → Express ne renvoie pas un 500 automatiquement.
* **B (Vrai)** → `next(err)` redirige vers les handlers `(err, req, res, next)`.
* **C (Faux)** → La requête n’est pas relancée.
* **D (Faux)** → Pas de crash, sauf si aucun middleware d’erreur n’existe et que l’erreur n’est pas gérée.

👉 Ta réponse **B** ✅ → **Correct**.

---

### **📊 Résultat final QCM**

* Q1 ❌
* Q2 ✅
* Q3 ❌
* Q4 ✅
* Q5 ✅

👉 **3/5 bonnes réponses** → Score **60%** ✅
Niveau correct, mais attention aux subtilités Lodash et à l’ordre d’exécution Express.

---

Veux-tu que je corrige maintenant tes exercices **6 → 10** (middleware, logger, lodash, Express PUT, fetch parallèle) en version **senior TypeScript** avec Zod/Lodash comme on avait défini ?
=====
CODE
=====
