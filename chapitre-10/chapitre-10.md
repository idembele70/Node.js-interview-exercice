Parfait 💪 ! Voici ta **nouvelle série niveau Junior++++ / Intermédiaire** – orientée *backend Node.js avec Express*.

---

## 🧠 **QCM (5 questions)** – Choix multiples possibles

### **QCM 1 — Middlewares globaux et spécifiques**

Parmi les affirmations suivantes, lesquelles sont vraies concernant les middlewares dans Express.js ?

A. Un middleware global s'applique à toutes les routes si placé avant les routes.
B. `app.use(middleware)` et `router.use(middleware)` font exactement la même chose.
C. Un middleware peut être défini pour une route spécifique.
D. Un middleware peut modifier `req` et `res`.
E. Les middlewares ne peuvent pas être async.

---

### **QCM 2 — Headers HTTP**

Laquelle des assertions suivantes est correcte concernant les headers HTTP ?

A. `X-Frame-Options: DENY` empêche l’API d’être intégrée dans une iframe.
B. `Content-Type` est utilisé pour définir la taille du contenu.
C. `Access-Control-Allow-Origin` est utilisé pour la gestion CORS.
D. `Strict-Transport-Security` s’utilise avec HTTPS uniquement.
E. Les headers ne peuvent pas être définis manuellement dans Express.

---

### **QCM 3 — Routes dynamiques**

Quel(s) comportement(s) est/sont vrai(s) pour les routes Express suivantes ?

```js
app.get('/user/:id', handler);
app.get('/user/profile', handler);
```

A. `/user/123` sera capturée par la première route.
B. `/user/profile` matchera toujours la première route.
C. L’ordre des routes est important ici.
D. Ces deux routes peuvent coexister correctement.
E. Express ne permet pas les routes dynamiques.

---

### **QCM 4 — Promesses dans Express**

Que se passe-t-il si une route async lève une erreur sans `try/catch` ?

A. Express la capture automatiquement.
B. Le serveur plante sauf si un middleware `error handler` est défini.
C. Il est conseillé d’utiliser un wrapper async pour gérer ça.
D. L’erreur est automatiquement renvoyée au client.
E. Ce n’est pas grave si on oublie `catch`, Express ignore l’erreur.

---

### **QCM 5 — Sécurité Express**

Laquelle de ces pratiques est **recommandée** pour sécuriser une API Express ?

A. Utiliser `helmet()`
B. Logger les erreurs avec `console.log()`
C. Cacher les messages d’erreur internes en prod
D. Utiliser `eval()` pour exécuter du code serveur
E. Restreindre les méthodes HTTP acceptées

---

## 💻 **5 Exercices de code**

### **Exercice 6 – Middleware : vérifier qu’un user est authentifié via un token**

Écris un middleware Express `isAuthenticated` qui vérifie si un header `Authorization` est présent avec le format `Bearer <token>`.
Sinon, retourner `401 Unauthorized`.

---

### **Exercice 7 – Logger dans un fichier**

Crée un middleware `loggerToFile` qui écrit chaque requête (IP, méthode, URL, date) dans un fichier `logs.txt` via `fs.appendFile`.

---

### **Exercice 8 – Rate limiter avancé**

Améliore ton rate limiter pour limiter **à 5 requêtes par minute** par IP.
Utilise un `Map` avec :

```ts
{
  count: number,
  firstRequestTimestamp: number
}
```

---

### **Exercice 9 – Route PUT avec validation**

Crée une route `PUT /users/:id` qui met à jour un utilisateur dans une fausse base `users = [{ id: 1, name: 'Alice' }]`.

* Si l’utilisateur n’existe pas, retourne 404
* Sinon, mets à jour son nom avec `req.body.name`
* Si `name` est absent, retourne 400

---

### **Exercice 10 – Error handler centralisé**

Implémente un middleware `errorHandler` qui intercepte les erreurs dans tout le projet.
Il doit renvoyer :

```json
{ "error": "Internal Server Error" }
```

avec un code `500` pour les erreurs inconnues.

---

Souhaites-tu :

* Faire les QCM d'abord puis les exos ?
* Ou tout faire et je corrige tout à la fin ?

============
CORRIGÉ
============
Voici ton **bilan pour la série junior++++ / intermédiaire** (5 QCM + 5 exos) :

### 📝 Résultats détaillés

| Question    | Note (/1) | Commentaire                                                                                                              |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| QCM 1       | 0.75      | B est fausse : `router.use()` s’applique à un routeur local, pas globalement.                                            |
| QCM 2       | 1.00      | ✅ Réponse parfaite.                                                                                                      |
| QCM 3       | 0.75      | B est fausse : `/user/profile` matche la 2e route si elle est placée avant.                                              |
| QCM 4       | 1.00      | ✅ Bonne réponse.                                                                                                         |
| QCM 5       | 0.75      | B est discutable (`console.log` pas recommandé en prod), mais E est aussi correct.                                       |
| Exercice 6  | 1.00      | Très bien, bien géré avec optional chaining.                                                                             |
| Exercice 7  | 1.00      | Bon usage de `fs/promises`. Log bien formaté.                                                                            |
| Exercice 8  | 0.50      | Tu incrémentes le compteur **avant** de vérifier la limite → cela autorise une 6ᵉ requête. Inverser l’ordre corrigerait. |
| Exercice 9  | 1.00      | ✅ Bonne structure, bon usage de `findIndex`. Clair et concis.                                                            |
| Exercice 10 | 1.00      | ✅ `next()` bien utilisé si pas d’erreur. Rien à redire.                                                                  |

---

### 🎯 Score final : **8.75 / 10**

**✅ Moyenne : 87.5%** – Excellent niveau intermédiaire atteint. Les prochains exos seront à dominante **middleware avancé, sécurité, refacto et structuration clean d’API REST**.

Tu veux enchaîner avec :

* Une **série niveau intermédiaire+/avancé** ?
* Des **exercices orientés projet complet (mini API)** ?
* Ou encore **focus testing avec Supertest / Playwright API** ?


================
CORRIGÉ CODE
================
Parfait. Voici la correction complète de la **partie code des questions 6 à 10** avec :

* ✅ Refactoring complet selon les standards **TypeScript/Node.js**
* 🧠 Étapes en **pseudocode détaillé**
* 📚 Typage fort avec **Zod**
* 📖 Documentation avec **JSDoc**
* ✨ Bonne pratiques clean code (pas de magic numbers, noms explicites, erreurs gérées proprement…)

---

## 🔢 Exercice 6 — Middleware `isAuthenticated`

### 🧠 Pseudocode

1. Lire l'en-tête `Authorization`
2. Vérifier si le token est bien présent (et non vide)
3. Si absent → renvoyer une erreur 401
4. Sinon → passer au middleware suivant

---

### ✅ Version corrigée (TypeScript + Zod)

/\*\* src/middlewares/is-authenticated.ts \*/

```ts
import type { Request, Response, NextFunction } from 'express';

/**
 * Middleware to check if the request has a valid Authorization token
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token || token.trim() === '') {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
```

---

## 🔢 Exercice 7 — Logger vers fichier

### 🧠 Pseudocode

1. Extraire IP, URL, méthode
2. Créer une ligne de log lisible et structurée
3. Ajouter au fichier `logs.txt`
4. Gérer les erreurs d'écriture avec log console + code 500

---

### ✅ Version corrigée (TypeScript + fs/promises)

/\*\* src/middlewares/logger.ts \*/

```ts
import { promises as fs } from 'fs';
import type { Request, Response, NextFunction } from 'express';

const LOG_FILE = 'logs.txt';

/**
 * Middleware to log request info into a log file
 */
export const loggerToFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { method, url, ip } = req;
  const logEntry = JSON.stringify({ ip, method, url, date: new Date().toISOString() }, null, 2) + '\n';

  try {
    await fs.appendFile(LOG_FILE, logEntry, 'utf8');
    next();
  } catch (error) {
    console.error('Logger error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
```

---

## 🔢 Exercice 8 — Middleware de rate limiting avancé

### 🧠 Pseudocode

1. Vérifier si l’IP est déjà suivie
2. Si nouvelle IP → ajouter dans la map avec `count = 1`
3. Si délai écoulé → reset compteur
4. Si dépassement de la limite → 429
5. Sinon, incrémenter le compteur

---

### ✅ Version corrigée (TypeScript + constantes explicites)

/\*\* src/middlewares/rate-limiter.ts \*/

```ts
import type { Request, Response, NextFunction } from 'express';

const REQUEST_LIMIT = 100;
const WINDOW_MS = 60_000;

const ipTracker = new Map<string, { count: number; firstRequestTimestamp: number }>();

export const advancedRateLimiter = (req: Request, res: Response, next: NextFunction): void => {
  const ip = req.ip;
  const now = Date.now();

  const existing = ipTracker.get(ip);

  if (!existing) {
    ipTracker.set(ip, { count: 1, firstRequestTimestamp: now });
    next();
    return;
  }

  const elapsed = now - existing.firstRequestTimestamp;

  if (elapsed > WINDOW_MS) {
    ipTracker.set(ip, { count: 1, firstRequestTimestamp: now });
    next();
    return;
  }

  if (existing.count >= REQUEST_LIMIT) {
    res.status(429).json({ message: 'Too many requests. Please try again later.' });
    return;
  }

  existing.count += 1;
  ipTracker.set(ip, existing);

  next();
};
```

---

## 🔢 Exercice 9 — Update d’un utilisateur

### 🧠 Pseudocode

1. Trouver l’index du user par ID
2. Si absent → erreur 404
3. Si pas de nom → erreur 400
4. Sinon → mise à jour et retour du user

---

### ✅ Version corrigée (TypeScript + array validation)

/\*\* src/routes/users.ts \*/

```ts
import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

const users: Array<{ id: number; name: string }> = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const updateUserSchema = z.object({
  name: z.string().min(1)
});

router.put('/users/:id', (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(user => user.id === userId);

  if (index === -1) {
    res.sendStatus(404);
    return;
  }

  const parseResult = updateUserSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.format() });
    return;
  }

  users[index].name = parseResult.data.name;
  res.status(200).json(users[index]);
});

export default router;
```

---

## 🔢 Exercice 10 — Middleware global de gestion d’erreur

### 🧠 Pseudocode

1. Vérifier s’il y a une erreur
2. Si oui → renvoyer 500 + message
3. Sinon → passer au middleware suivant

---

### ✅ Version corrigée (TypeScript + JSDoc)

/\*\* src/middlewares/error-handler.ts \*/

```ts
import type { Request, Response, NextFunction } from 'express';

/**
 * Express error handling middleware
 */
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err) {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }

  next();
};
```

---

## ✅ Résumé

| Exercice | Corrigé ? | TypeScript | Best Practices | Zod |
| -------- | --------- | ---------- | -------------- | --- |
| 6        | ✅         | ✅          | ✅              | -   |
| 7        | ✅         | ✅          | ✅              | -   |
| 8        | ✅         | ✅          | ✅              | -   |
| 9        | ✅         | ✅          | ✅              | ✅   |
| 10       | ✅         | ✅          | ✅              | -   |

---

Souhaites-tu que je t’envoie tout ça dans un **fichier `.ts` ou `.md` prêt à copier/coller** pour continuer à t’entraîner ?
