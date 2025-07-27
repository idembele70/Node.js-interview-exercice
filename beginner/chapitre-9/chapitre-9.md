Parfait ! Voici **10 nouvelles questions niveau Junior+++**, formulées comme dans un **entretien technique réel**.
Il y a :

* 🧠 **5 questions théoriques ouvertes** (tu dois expliquer, justifier)
* 👨‍💻 **5 exercices pratiques** (code, corrections ou analyse)

Prêt pour l’entraînement sérieux ? Voici 👇

---

## 🧠 **Questions ouvertes – à expliquer comme en entretien**

---

### **1. Middleware personnalisé**

> Explique comment fonctionne un middleware Express.
> Et comment tu créerais un middleware pour **vérifier que le corps de la requête POST n’est pas vide**.

---

### **2. Sécurité CORS**

> À quoi sert le middleware `cors()` dans Express ?
> Quelle est la différence entre CORS **simple** et CORS **préflight (OPTIONS)** ?

---

### **3. async/await dans Express**

> Pourquoi faut-il faire attention à l’usage de `async/await` dans les middlewares ou routes Express ?
> Que se passe-t-il si on oublie le `try/catch` ?

---

### **4. Architecture d’un projet Node.js**

> Tu dois créer une API REST complète.
> Quelles sont les **bonnes pratiques de structure de projet** (fichiers, routes, controllers, etc.) que tu mets en place dès le début ?

---

### **5. API REST vs GraphQL**

> Quelle est la différence principale entre une API REST et une API GraphQL ?
> Quand est-ce que tu choisirais GraphQL au lieu de REST ?

---

## 👨‍💻 **Exercices de code – pratiques**

---

### **6. Implémentation – Route dynamique**

> Implémente une route Express `GET /product/:slug` qui récupère le `slug` dans l’URL
> et retourne un JSON `{ slug: "valeur-du-slug" }`.

---

### **7. Debug – Mauvais status code**

Voici une route qui **ne fonctionne pas comme prévu** :

```js
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    res.status(400).send('Missing credentials');

  // logique de connexion...
  res.status(200).send('Logged in');
});
```

> ❌ Explique le bug, et donne une correction **courte et propre**.

---

### **8. Implémentation – Middleware IP Logger**

> Crée un middleware `logIp` qui logge l’adresse IP de chaque requête dans la console, avec l’URL appelée.

---

### **9. Sécurité – En-têtes HTTP**

> Ajoute le middleware `helmet()` à une app Express,
> et montre **un exemple de réponse HTTP** avec les headers de sécurité ajoutés.

---

### **10. Correction – async route Express**

Ce code plante parfois sans message d’erreur :

```js
app.get('/users', async (req, res) => {
  const users = await db.findUsers();
  res.json(users);
});
```

> Corrige ce code pour gérer proprement les erreurs,
> et donner une réponse `500` si la DB échoue.

---

Souhaite-tu :

* 💬 Les corriger toi-même (et être noté) ?
* ✅ Que je t'envoie tout corrigé tout de suite ?
* 📝 Ou que je les regroupe dans un fichier `.md` ?

===============
MA RÉPONSE
===============
1. Un middleware se place entre la requête du client et le serveur pour faire des vérifications. Je crée un middleware qui va verifié si la taille de l'objet est pas égale à 0, je retourne une erreur et bloque la requête, sinon je laisse passer la requête vers le controlleurs.
2. CORS sert a ajouté des entêtes supplémentaires afin de sécuriser les requêtes.
3. Il faut faire attention à l'usage de async/await dans les middlewares ou routes Express car un await oublié peut faire planter la requête, et elles peuvent prolonger la durée entre la requête et la réponse. Si on oublie try/catch le serveur peut planter.
4. je créer le point d'entrée principale de mon application app.js, je crée un dossier pour les routes, les models, les controllers, les middlewares, et un dossier pour mes modules. Je défini une convention de nommage de mes fichiers.
5. GraphQL permet au client de demander exactement ce qu'il veut alors qu'avec rest ne client n'a pas cette posibilité. je choisirais GraphQL quand veut permettre au client d'obtenir exactement ce qu'il souhaite lors de ses requêtes.
6. app.get('/product/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    res.status(200).json({ slug });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error'});
  }
})
7. Le bug est qu'il va lancer deux reponses si le nom d'utilisateur ou le mot de passe manque, il faut donc mettre un return dans le if pour s'assurer d'éviter cela.
8. const logIp = function(req = express.request, res, next){
  console.log('IP : %s, URL: %s', req.ip, req.url);
  next();
}
9. index.js
import express from 'express';
import helmet from 'helmet';
const app = express();
app.use(helmet())
Response: 
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Content-Type: application/json; charset=utf-8
Content-Length: 52
ETag: W/"34-v2x0DKp9LwWpfQ7etAj35Zt3s80"
Date: Tue, 05 Aug 2025 19:06:30 GMT
Connection: close
10. const db = {
  findUsers : async () => [{ id:1, name: 'toto'}, { id: 2, name: 'meme' }],
}
// exercise 10
app.get('/users', async (req, res) => {
  try {
    const users = await db.findUsers();
    res.status(200).json(users);
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error! '});
  }
})

===========
CORRIGÉ
===========
Super taf 👏 ! Tu montres de bonnes bases en backend Express.js. Voici **la correction complète avec une notation détaillée sur 10** pour chaque question, + des suggestions pour progresser vers un niveau "senior-ready". À la fin, tu auras tout regroupé en un **fichier markdown prêt à copier-coller**.

---

## ✅ CORRECTION + NOTATION – Série Junior+++ (Entretien Réel)

---

### **1. Middleware Express – vérification du body**

**🟢 Bonne réponse :** Tu as bien décrit le rôle du middleware et expliqué comment vérifier un `req.body` vide.

**💡 Amélioration :**
Mentionner `Object.keys(req.body).length === 0` pour vérifier un body vide JSON.

**✅ Note : 1 / 1**

---

### **2. CORS**

**🟡 Partiellement juste :** Tu dis que CORS ajoute des en-têtes de sécurité, mais l'essence est de **permettre ou interdire des requêtes cross-origin**.

**💡 Correction :**

> CORS (Cross-Origin Resource Sharing) permet ou bloque les requêtes HTTP entre des origines différentes.
> Les requêtes dites "préflight" (OPTIONS) sont envoyées avant les requêtes sensibles (ex: POST avec `Content-Type: application/json`) pour valider les permissions.

**✅ Note : 0.5 / 1**

---

### **3. async/await dans Express**

**🟢 Bien vu :** Tu as mentionné le besoin de `try/catch` pour éviter les crashs serveur. Bonne remarque sur la latence possible.

**💡 Suggestion :**
Tu peux mentionner aussi qu’un `await` sans gestion d’erreur ne permet **pas à Express de passer à son handler d’erreur**.

**✅ Note : 1 / 1**

---

### **4. Structure de projet Node.js**

**🟢 Très bien résumé** : Tu as cité `routes`, `controllers`, `middlewares`, `models`. Bravo.

**💡 Pour aller plus loin :**
Ajouter `services/`, `.env`, `config/`, et le concept de séparation "responsabilité unique".

**✅ Note : 1 / 1**

---

### **5. REST vs GraphQL**

**🟢 Bonne explication :** Tu sais que GraphQL donne la main au client.

**💡 Bonus :**
Tu peux mentionner que GraphQL est utile quand tu veux **éviter des requêtes multiples** (overfetching / underfetching).

**✅ Note : 1 / 1**

---

### **6. Implémentation – Route slug**

**🟢 Code propre**, bon `try/catch`, bonne réponse `200`.
Parfait.

**✅ Note : 1 / 1**

---

### **7. Bug double réponse**

**🟢 Tu as trouvé le bug clé :** il manque un `return` dans le `if`. Top.

**💡 Bonus :**
Tu pourrais aussi restructurer avec un `return early` + `else`, mais le raisonnement est juste.

**✅ Note : 1 / 1**

---

### **8. Middleware log IP**

**🟢 Correct**, simple et efficace.

**💡 Bonus :**
Tu peux aussi logger la `method` (GET/POST), et un horodatage.

```js
console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from IP ${req.ip}`);
```

**✅ Note : 1 / 1**

---

### **9. helmet() et headers HTTP**

**🟢 Excellent**. Tu montres que tu sais à quoi servent les headers de sécurité, et tu as collé une vraie réponse HTTP : nickel.

**✅ Note : 1 / 1**

---

### **10. async route avec gestion erreur**

**🟢 Ton code est bon, sécurisé**, et respecte les bonnes pratiques.

**✅ Note : 1 / 1**

---

### ✅ **TOTAL : 9.5 / 10**

**💬 Feedback global :**
Tu es clairement **niveau junior++ confirmé**, en bonne voie vers **middle backend Node.js**. Continue à renforcer ta rigueur (ex : logs enrichis, `.env`, centralisation des erreurs), et tu seras très solide pour les entretiens techniques.

---

## 📦 Version Copiable `.md` (corrigée)

````md
# Correction – Coding Interview Node.js (Junior+++)

## 1. Middleware Express – vérification du body

Un middleware est une fonction qui s'exécute entre la requête et la réponse.  
Je crée un middleware pour vérifier si le corps est vide :

```js
function checkBodyNotEmpty(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Body cannot be empty' });
  }
  next();
}
````

---

## 2. À quoi sert CORS ?

CORS permet ou bloque les requêtes HTTP entre des origines différentes.
Exemple : frontend en `localhost:3000` qui appelle une API en `localhost:5000`.

* **Simple CORS** : GET, HEAD, POST simple.
* **Préflight CORS** : Requêtes sensibles (ex: JSON, PUT...) → envoie d'une requête `OPTIONS` avant.

---

## 3. async/await dans Express

* Un `await` mal géré peut bloquer la réponse ou planter l’app.
* Il faut toujours encapsuler dans `try/catch` sinon Express **ne détecte pas les erreurs**.
* Exemple :

```js
app.get('/', async (req, res) => {
  try {
    const data = await getData();
    res.json(data);
  } catch (err) {
    res.status(500).send('Error');
  }
});
```

---

## 4. Structure de projet Node.js

* `app.js` ou `index.js` comme point d’entrée
* Dossiers :

  * `routes/` pour les routes
  * `controllers/` pour la logique
  * `models/` pour les données
  * `middlewares/` pour les vérifications
  * `services/` pour les appels API/DB
  * `config/` pour les variables globales
* Fichiers en `camelCase`, conventions claires

---

## 5. REST vs GraphQL

* REST : endpoints fixes, le serveur décide ce qu’il renvoie
* GraphQL : un seul endpoint, le client décide les champs à récupérer

🟢 Choisir GraphQL quand on veut éviter overfetching/underfetching ou gérer des UI complexes.

---

## 6. Route Express dynamique

```js
app.get('/product/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    res.status(200).json({ slug });
  } catch(err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});
```

---

## 7. Bug de double réponse corrigé

```js
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send('Missing credentials');

  // logique...
  res.status(200).send('Logged in');
});
```

---

## 8. Middleware log IP

```js
const logIp = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from IP ${req.ip}`);
  next();
};
```

---

## 9. helmet() et sécurité

```js
import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet());
```

✅ Réponse HTTP avec headers :

* `Content-Security-Policy`
* `X-Frame-Options`
* `X-XSS-Protection`
* etc.

---

## 10. async route sécurisée

```js
app.get('/users', async (req, res) => {
  try {
    const users = await db.findUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```

---

## ✅ Score : 9.5 / 10

Bravo pour ce niveau solide en backend Express.js !

```

---

Souhaites-tu :

- Que je t’envoie ce fichier `.md` tout fait ?
- Ou continuer avec une nouvelle série niveau **Middle++** ?
```
