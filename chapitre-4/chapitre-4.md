Parfait Ibrahim 👊 On continue le grind !
Voici une nouvelle série **10 questions Node.js – niveau intermédiaire (Junior+++ / Début Intermédiaire)**.
Toujours dans le style **coderpar.io** → mélange **QCM + pratique**, axé **Express, JWT, erreurs, testabilité, bonnes pratiques backend**.

---

# 🚀 **10 Questions Node.js – Niveau Junior+++/Intermédiaire**

## ✅ **1 – QCM (Express : ordre des middlewares)**

Dans Express, dans quel ordre sont appelés les middlewares ?
A. Par priorité
B. Par ordre alphabétique
C. Par ordre d’enregistrement dans le code
D. En fonction de la méthode HTTP

---

## ✅ **2 – QCM (Sécurité Express)**

Quel en-tête HTTP est souvent utilisé pour **protéger contre les attaques XSS** ?
A. `Content-Type`
B. `X-Content-Type-Options`
C. `X-XSS-Protection`
D. `Content-Security-Policy`

---

## ✅ **3 – QCM (JWT)**

Quelle est la meilleure façon de **vérifier un token JWT** côté serveur ?
A. `jwt.decode(token)`
B. `jwt.verify(token, secret)`
C. `token.split('.')[1]`
D. `JSON.parse(atob(token))`

---

## ✅ **4 – QCM (Error handling)**

Quelle est **la bonne façon** de gérer les erreurs dans un middleware async Express ?
A. `throw new Error()` sans rien gérer
B. `try/catch` dans la route et `next(err)`
C. Utiliser `process.exit(1)`
D. Ne pas faire de gestion d’erreur

---

## ✅ **5 – QCM (Tests Express)**

Quelle lib est souvent utilisée pour **tester une API Express** ?
A. `supertest`
B. `axios`
C. `body-parser`
D. `jest-request`

---

---

## 🧑‍💻 **6 – Code (Middleware de logger)**

👉 Crée un **middleware Express** qui log chaque requête sous cette forme :

```
[2025-07-30 14:20:21] GET /user
```

---

## 🧑‍💻 **7 – Code (Route protégée par JWT)**

👉 Crée une route Express `/private` qui :

* vérifie un token JWT dans le header `Authorization`
* si valide → retourne `{ success: true }`
* si invalide ou manquant → retourne `{ error: "Unauthorized" }`

---

## 🧑‍💻 **8 – Code (Centrale d’erreur Express)**

👉 Crée une **middleware `errorHandler`** qui :

* attrape toutes les erreurs
* retourne le message d’erreur en JSON → `{ error: "message d'erreur" }`
* utilise `next(err)` pour l’invoquer

---

## 🧑‍💻 **9 – Code (Modèle MVC simple)**

👉 Structure ton app Express comme suit :

* `controllers/userController.js` → fonction `getUser` qui renvoie `{ id: 1, name: 'Ibrahim' }`
* `routes/user.js` → route `/user` qui appelle ce contrôleur
* `index.js` → lance le serveur

---

## 🧑‍💻 **10 – Code (Test simple avec Supertest)**

👉 Crée un test avec **`supertest`** pour vérifier que `GET /hello` retourne :

* status 200
* body : `{ message: "Hello World" }`

---

🟢 **Plan d’action** :

1. Tu réponds **aux QCM 1 à 5**
2. Tu me colles le code **des questions 6 à 10**
   Je corrige et je t’envoie un **scoring / feedback / bonnes pratiques pro** comme d’hab 🎯

Prêt ?

========
Corrigé
========
Bien joué Ibrahim 🔥 Tu as bien monté en puissance avec ces questions niveau **Junior+++/Intermédiaire**.
Voici un retour détaillé **QCM + code**, avec les corrections, suggestions et bonnes pratiques pro 👇

---

## ✅ **QCM (1 à 5)**

| Question | Ta réponse | Correction | ✅ / ❌ | Commentaire                                                                 |
| -------- | ---------- | ---------- | ----- | --------------------------------------------------------------------------- |
| 1        | C          | ✅          | ✅     | Exact. Les middlewares sont appelés **dans l’ordre d’enregistrement**.      |
| 2        | D          | ✅          | ✅     | `Content-Security-Policy` est bien utilisé pour **empêcher les XSS**.       |
| 3        | B          | ✅          | ✅     | `jwt.verify(token, secret)` est la bonne méthode pour valider un JWT.       |
| 4        | B          | ✅          | ✅     | `try/catch` + `next(err)` permet de déléguer à un **error handler global**. |
| 5        | A          | ✅          | ✅     | `supertest` est la bonne lib pour tester les routes Express. GG!            |

**✅ Score QCM : 5/5**

---

## 🧑‍💻 **6 – Middleware Logger**

```js
const middleware = (req, res, next) => {
  const date = new Date();
  const dateString = date.toLocaleDateString().replaceAll('/', '-');
  const timeString = date.toLocaleTimeString();
  console.log(`[${dateString} ${timeString}] ${req.method} ${req.url}`);
  next();
};
```

**✅ Commentaire** : clair, propre, bien écrit. Tu pourrais aussi utiliser `toISOString()` pour un format plus standard, mais ici c’est **lisible pour un humain**, donc 👍

---

## 🧑‍💻 **7 – Route protégée JWT**

```js
app.get('/private', (req, res) => {
  const authHeader = req.headers.authorization;

  try {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET);
    res.json({ success: true });
  } catch (err) {
    res.json({ error: "Unauthorized" });
  }
});
```

### ❗️ Suggestions pro :

* Ajouter une vérif si `authHeader` est `undefined` pour éviter `split` sur `undefined`.
* Retourner un code HTTP 401 si non autorisé.

✅ Version améliorée :

```js
app.get('/private', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET);
    res.json({ success: true });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});
```

---

## 🧑‍💻 **8 – Error Handler**

```js
function errorHandler(err, req, res) {
  console.log('error')
  return res.json({error: 'message d\'erreur'});
}
app.use(errorHandler)
```

### ❗️Commentaires :

* Manque le 4e paramètre `next` pour un middleware d’erreur.
* Tu devrais **retourner le message de l’erreur capturée** (`err.message`) pour du debug.

✅ Version pro :

```js
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
}
app.use(errorHandler);
```

---

## 🧑‍💻 **9 – MVC Express**

```js
// userController.mjs
export function getUser(req, res){
  return res.json({ id: 1, name: 'Ibrahim'});
}
```

```js
// user.mjs
import express from 'express'
import { getUser } from '../controllers/userController.mjs';

const userRouter = express.Router();
userRouter.get('/user/:id', getUser);
export default userRouter;
```

```js
// app.mjs
import express from 'express';
import userRouter from './routes/user.mjs';
const app = express();
app.use(userRouter)
app.listen(8080);
```

**✅ Commentaire** : propre, bien structuré, tu appliques le modèle **MVC minimaliste** nickel 👍

---

## 🧑‍💻 **10 – Supertest**

Tu as mis `supertest` dans le même fichier que ton serveur, et utilisé `.expect('Hello World')` au mauvais endroit.

### ❌ Problème :

* Tu appelles `.expect('Hello World')` sans wrapper ni check.
* Tu n’as pas exporté `app` correctement pour le test.

✅ Version corrigée :

```js
// app.js
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

export default app;
```

```js
// app.test.js
import request from 'supertest';
import app from './app.js';

describe('GET /', () => {
  it('should return Hello World message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Hello World' });
  });
});
```

---

## 🔚 **Bilan final**

| Partie         | Score |
| -------------- | ----- |
| QCM            | ✅ 5/5 |
| Logger         | ✅     |
| JWT Protected  | 🟡    |
| Error Handler  | 🟡    |
| MVC            | ✅     |
| Test Supertest | ❌     |

---

## ✅ Tu maîtrises :

* Express de base, routing, MVC
* JWT (bon réflexe `verify`)
* Middleware logger simple
* Bonne organisation modulaire

## 🔁 À retravailler :

* `errorHandler` avec les 4 params (sinon Express ne l'appelle pas)
* Sécurité sur `undefined` dans les headers
* Tests avec Supertest : séparer serveur et tests

---

Tu veux une dernière série niveau **intermédiaire + (Junior+++ / Confirmé)** avec de la base de données (Mongo, Sequelize, etc.) ?
