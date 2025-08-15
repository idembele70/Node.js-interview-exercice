Parfait 👍
Voici une **série niveau intermédiaire / mid** :

---

## 🧠 QCM (Q1 à Q5)

**Q1.**
Dans un projet Node.js + TypeScript, quelle est la principale différence entre :

```ts
import { something } from "./module";
```

et

```ts
import type { Something } from "./module";
```

A. Le second n'importe que les types, retirés au runtime
B. Le second permet d'optimiser la compilation en CommonJS
C. Le premier ne fonctionne pas avec Zod
D. Les deux sont identiques au runtime

---

**Q2.**
Avec Lodash, que renvoie la méthode `_.merge(obj1, obj2)` ?
A. Un tableau fusionné
B. Un nouvel objet fusionné récursivement
C. Un objet aplati
D. Une fusion non récursive

---

**Q3.**
Dans Express, que se passe-t-il si un middleware asynchrone lance une exception **sans** `try/catch` et sans `next(err)` ?
A. L'application ignore l'erreur
B. Le serveur plante si l'exception n'est pas gérée
C. L'erreur est envoyée automatiquement en JSON
D. Express capture automatiquement l'erreur

---

**Q4.**
Pourquoi utiliser `Promise.all()` au lieu d'exécuter des promesses en série ?
A. Pour exécuter les promesses séquentiellement
B. Pour exécuter toutes les promesses en parallèle et optimiser les temps d'exécution
C. Pour exécuter les promesses avec gestion automatique des erreurs
D. Pour exécuter uniquement la première promesse

---

**Q5.**
Lequel de ces cas **nécessite** un schéma Zod avec `.refine()` au lieu d’un `.min()` ou `.max()` simple ?
A. Vérifier qu’un mot de passe a au moins 8 caractères
B. Vérifier qu’une date de fin est après la date de début
C. Vérifier qu’un tableau a au moins 3 éléments
D. Vérifier qu’un nombre est inférieur à 100

---

## 🧪 Exercices de code (Q6 à Q10)

**Q6.**
Crée un middleware TypeScript `validateQuery` qui vérifie, via Zod, que `req.query.page` et `req.query.limit` sont des entiers positifs. Sinon, retourne 400.

---

**Q7.**
Écris une fonction utilitaire `mergeUserData` qui utilise Lodash pour fusionner deux objets `User` récursivement.

---

**Q8.**
Implémente une route `PUT /products/:id` qui :

1. Valide le `body` avec Zod (`name: string`, `price: number positif`)
2. Met à jour le produit correspondant dans un tableau `products` en mémoire
3. Retourne 404 si non trouvé, sinon le produit mis à jour

---

**Q9.**
Crée un middleware `cacheControl` qui ajoute l’en-tête :
`Cache-Control: public, max-age=3600` à toutes les réponses GET.

---

**Q10.**
Implémente une fonction `parallelFetch` qui prend un tableau d’URL et retourne un tableau de résultats JSON en utilisant `Promise.all()`. Gère les erreurs pour que si une requête échoue, elle retourne `null` pour cette URL.

---

Veux-tu que je te prépare aussi la **correction détaillée niveau senior** dès que tu m’auras envoyé tes réponses ?
Ça te ferait un entraînement complet type “revue de code en entreprise”.

