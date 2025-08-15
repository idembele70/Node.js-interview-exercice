====
QCM
====

Voici la correction et ton score ✅

---

### **Q1.**

✅ **Bonne réponse : A**

* **A (Vrai)** → `import type` n'importe que les types et disparaît au runtime, ce qui réduit le bundle.
* **B (Faux)** → Ce n’est pas lié à CommonJS directement.
* **C (Faux)** → Aucun rapport avec Zod.
* **D (Faux)** → Non, au runtime l'import type n'existe plus.

---

### **Q2.**

✅ **Bonne réponse : B**

* **A (Faux)** → `_.merge` ne renvoie pas un tableau.
* **B (Vrai)** → Fusionne récursivement les propriétés des objets.
* **C (Faux)** → Pour aplatir, on utilise `_.flatten` ou `_.flatMap`.
* **D (Faux)** → Justement, la fusion est récursive.

---

### **Q3.**

✅ **Bonne réponse : B**

* **A (Faux)** → Express ne “passe pas l'erreur à la trappe” mais elle peut faire planter le process.
* **B (Vrai)** → Sans `try/catch` ou `next(err)`, l’erreur non gérée peut stopper le serveur.
* **C (Faux)** → Il ne renvoie pas automatiquement en JSON.
* **D (Faux)** → Express ne capture pas les erreurs asynchrones automatiquement (il faut un wrapper).

---

### **Q4.**

✅ **Bonne réponse : B**

* **A (Faux)** → Séquentiel = perte de perf.
* **B (Vrai)** → `Promise.all` exécute tout en parallèle → gain de temps.
* **C (Faux)** → Ça ne gère pas automatiquement les erreurs, une seule erreur stoppe tout.
* **D (Faux)** → Il exécute toutes, pas seulement la première.

---

### **Q5.**

✅ **Bonne réponse : B**

* **A (Faux)** → `.min(8)` suffit.
* **B (Vrai)** → Comparer deux champs → nécessite `.refine()` car dépendance entre valeurs.
* **C (Faux)** → `.min(3)` suffit.
* **D (Faux)** → `.max(100)` suffit.

---

## **Résultat**

* **5 / 5 corrects 🎯**
* Niveau : **Excellent** – Tu as validé toutes les questions QCM.
* Aucun point faible sur la théorie ici, on peut passer directement à l’évaluation de ton code sur Q6 → Q10.

---

Veux-tu que je te prépare la **correction et amélioration senior** si tu m’envoies ton code pour Q6 à Q10 ?


=====
CODE
=====

Parfait 👍
Je vais faire la **correction + version senior** de tes exos 6 à 10 en suivant exactement les règles que tu m’as données (TypeScript strict, Zod, Lodash, bonnes pratiques, SOLID, etc.).

---

## **Plan d’amélioration par exercice**

### **Q6 – validateQuery**

**Problèmes :**

* Typage manquant (`any` implicite).
* Pas d’inférence de type via Zod (`z.infer`).
* Pas de valeurs par défaut (`page`, `limit` devraient avoir un fallback).
* Log d’erreur trop générique.
* Middleware pas réutilisable.

**Version senior (TypeScript + Zod + meilleure gestion des erreurs) :**

```ts
import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';

const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

type QueryType = z.infer<typeof querySchema>;

export const validateQuery = (req: Request, res: Response, next: NextFunction): void => {
  const result = querySchema.safeParse(req.query);
  
  if (!result.success) {
    console.error('Invalid query params:', result.error.flatten());
    res.status(400).json({ errors: result.error.flatten().fieldErrors });
    return;
  }

  req.query = result.data as QueryType;
  next();
};

// Usage
app.get('/home', validateQuery, (_req, res) => {
  res.status(200).send('Welcome to home page!');
});
```

**Améliorations clés :**

* Typage strict.
* Validation robuste avec `safeParse`.
* Valeurs par défaut + limite max.
* Retour JSON avec détails d’erreur.

---

### **Q7 – mergeUserData**

**Problèmes :**

* Pas de typage.
* `_.merge` modifie l’objet cible → risque d’effet de bord.

**Version senior :**

```ts
import _ from 'lodash';

interface User {
  readonly id?: number;
  readonly name?: string;
  readonly email?: string;
}

export const mergeUserData = (user1: User, user2: User): User => {
  return _.merge({}, user1, user2); // copie pour éviter la mutation
};
```

**Améliorations clés :**

* Interface `User` définie.
* Copie immuable.
* Fonction pure.

---

### **Q8 – validateBody + update product**

**Problèmes :**

* Typage absent.
* Recherche de produit pas sécurisée.
* `splice` modifie le tableau → préférer un update immuable.
* Message d’erreur peu clair.

**Version senior :**

```ts
const productSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().positive(),
});

type ProductType = z.infer<typeof productSchema>;

let products: ProductType[] = [
  { name: 'pasta', price: 25 },
  { name: 'juice', price: 50 },
];

const validateBody = (req: Request, res: Response, next: NextFunction) => {
  const result = productSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  }
  req.body = result.data;
  next();
};

app.put('/products/:id', validateBody, (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((_p, i) => i + 1 === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const updatedProduct = { ...products[index], price: req.body.price };
  products = products.map((p, i) => (i === index ? updatedProduct : p));

  res.status(200).json({ message: 'Product updated', product: updatedProduct });
});
```

**Améliorations clés :**

* `safeParse` + retour détaillé.
* Update immuable.
* Meilleur matching produit.

---

### **Q9 – cacheControl**

**Problèmes :**

* `Headers` n’existe pas dans Node.js sans lib externe.
* `res.setHeaders` n’existe pas → il faut `res.setHeader`.
* Middleware trop rigide (pas configurable).

**Version senior :**

```ts
import type { Request, Response, NextFunction } from 'express';

export const cacheControl =
  (maxAgeSeconds = 3600) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === 'GET') {
      res.setHeader('Cache-Control', `public, max-age=${maxAgeSeconds}`);
    }
    next();
  };

// Usage
app.use(cacheControl(3600));
```

**Améliorations clés :**

* Middleware configurable.
* Compatible Express.
* Typage strict.

---

### **Q10 – parallelFetch**

**Problèmes :**

* Pas `await` au moment du log → `Promise` affichée.
* Mauvaise URL (`csom`).
* Erreurs ignorées silencieusement.

**Version senior :**

```ts
import fetch from 'node-fetch';

export const parallelFetch = async (urls: string[]): Promise<unknown[]> => {
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return res.json();
    })
  );

  return results.map((r) => (r.status === 'fulfilled' ? r.value : null));
};

(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
    'https://jsonplaceholder.typicode.com/posts/unexisting',
  ];

  const data = await parallelFetch(urls);
  console.log('My data:', data);
})();
```

**Améliorations clés :**

* `Promise.allSettled` → ne stoppe pas au premier échec.
* Retour `null` si erreur.
* `await` correctement placé.
* Typage strict.

---

Si tu veux, je peux maintenant te **refaire les Q6 → Q10 en pseudocode ultra-détaillé** pour que tu voies comment penser comme un senior avant de coder.
Veux-tu que je te fasse ça ?

