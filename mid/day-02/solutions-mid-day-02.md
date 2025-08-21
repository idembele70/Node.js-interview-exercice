====
QCM
====
Super 💯 Merci pour tes réponses ! On fait la correction point par point :

---

## ✅ Correction QCM intermédiaire

### **Q1. Event Loop**

**Ta réponse : C (Poll phase)**
❌ Incorrect.
✔️ **Bonne réponse : B (Timer phase)**
Explication : les callbacks de `setTimeout` et `setInterval` sont traités dans la **phase Timers** de l’event loop. La **Poll phase** sert à gérer I/O.

---

### **Q2. Streams**

**Ta réponse : A, D**
✔️ Correct !
Explication :

* A. `.pipe(process.stdout)` → valide, ça affiche directement le contenu du flux.
* D. `"data"` + concat des chunks → valide aussi pour transformer en texte.
* B est faux (pas de `.toString()` direct sur un stream).
* C est valide dans certains cas, mais ici pas la manière directe.

---

### **Q3. Zod Validation**

**Ta réponse : A, B, D**
❌ Partiellement correct.
✔️ **Bonne réponse : B uniquement**
Explication : `z.coerce.number().int()` essaie de **convertir une string en number** puis vérifie que c’est bien un entier.

* A ❌ : ça ne rejette pas les floats tant que c’est convertible en `int`.
* B ✅ : oui, `"42"` → `42`.
* C ❌ : ne convertit pas les booléens.
* D ❌ : n’accepte pas seulement les strings, accepte aussi déjà des `number`.

---

### **Q4. Express Error Handling**

**Ta réponse : A**
✔️ Correct !
Explication : Le middleware d’erreur a toujours **4 paramètres** et doit être déclaré :

```ts
(err, req, res, next) => { ... }
```

---

### **Q5. Lodash**

**Ta réponse : A**
✔️ Correct !
Explication : `_.uniq([1,1,2,3])` → `[1,2,3]`.

---

## 📊 Résultats

* Q1 ❌
* Q2 ✅
* Q3 ❌
* Q4 ✅
* Q5 ✅

👉 **3/5 correctes (60%)** → pas mal, mais à ce niveau-là, la précision est importante 🔥

---

Veux-tu que je reprenne tes **exercices de code (Q6–Q10)** comme on a fait précédemment (avec corrections + amélioration version “senior”), ou tu veux d’abord retenter seul avant que je corrige ?

=====
CODE
=====
Parfait 👌 merci d’avoir partagé tes exos (6 → 10). Je vais te donner un **feedback détaillé + version senior** pour chacun.

---

### **6. Middleware API Key**

Ton code :

```js
const validateApiKey = (req, res, next) => {
  const apiKeyHeader = req.headers['x-api-key'];

  if (!apiKeyHeader) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  next();
}
```

✅ Points positifs : clair, concis, bien placé dans un middleware.
⚠️ Améliorations :

* Utiliser une **constante pour la clé attendue** (pas de valeur magique).
* Comparer la clé reçue avec la valeur attendue.
* Logger les accès non autorisés.

👉 **Version senior :**

```js
const EXPECTED_API_KEY = process.env.API_KEY;

function validateApiKey(req, res, next) {
  const apiKeyHeader = req.get('x-api-key');

  if (!apiKeyHeader || apiKeyHeader !== EXPECTED_API_KEY) {
    console.warn(`Unauthorized access attempt from IP: ${req.ip}`);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
}
```

---

### **7. Logger vers fichier**

Ton code :

```js
const appendLog = async (message) => {
  try {
    const filePath = path.resolve(__dirname, 'logs.txt');
    const date = new Date().toISOString()
    const logEntry = `${date}: ${message}\n`;
    await fs.appendFile(filePath, logEntry, 'utf8');
    console.log('Log entry added');
  } catch (err) {
    console.error('Error appending to file:', err);
  }
}
```

✅ Bon usage de `fs.promises`, ajout de date, clair.
⚠️ Améliorations :

* Utiliser un **nom de fichier configurable** (ex: via env).
* Centraliser la logique de formatage du log.
* Éviter `console.log` systématique en prod.

👉 **Version senior :**

```js
const LOG_FILE = process.env.LOG_FILE || path.resolve(__dirname, 'logs.txt');

async function appendLog(message) {
  const logEntry = `[${new Date().toISOString()}] ${message}\n`;
  try {
    await fs.appendFile(LOG_FILE, logEntry, 'utf8');
  } catch (err) {
    console.error(`Logger error: ${err.message}`);
  }
}
```

---

### **8. Groupement avec Lodash**

Ton code :

```js
function groupUsersByRole(users) {
  const roles = _.groupBy(users, "role");
  const result =  _.map(roles, (v) => {
    return _.map(v, 'name')
  })
  return result
}
```

⚠️ Problème : tu retournes un **array de tableaux de noms** sans info sur le rôle.
Exemple : `[[Alice, Clara], [Bob]]` au lieu de `{ admin: ["Alice","Clara"], user: ["Bob"] }`.

👉 **Version senior :**

```js
function groupUsersByRole(users) {
  return _.mapValues(_.groupBy(users, 'role'), group =>
    group.map(u => u.name)
  );
}
```

Résultat :

```js
{ admin: ["Alice","Clara"], user: ["Bob"] }
```

---

### **9. Express route /users/\:id**

Ton code :

```js
const index = userList.findIndex((_, index) => index + 1 === Number(req.params.id));
```

⚠️ Petit souci :

* Tu relies l’`id` à l’**index+1** (pas intuitif).
* Il serait plus clair d’utiliser directement `req.params.id - 1`.

👉 **Version senior :**

```js
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id < 1 || id > userList.length) {
    return res.status(404).json({ message: 'Not found!' });
  }

  res.status(200).json({ name: userList[id - 1] });
});
```

---

### **10. Fetch avec Promise.allSettled**

Ton code :

```js
const baseUrl = 'https://jsonplaceholder.typicode.com/posts/exi'
```

⚠️ Bug ici → `/posts/exi` est invalide, et tu utilises `new URL(id, baseUrl)` (mélange bizarre → ça donne une URL comme `.../posts/exi1`).

👉 **Version senior :**

```js
async function fetchPosts(ids) {
  const BASE_URL = 'https://jsonplaceholder.typicode.com/posts/';

  try {
    const results = await Promise.allSettled(
      ids.map(id =>
        fetch(`${BASE_URL}${id}`)
          .then(res => res.ok ? res.json() : null)
      )
    );

    return results.map(r => r.status === 'fulfilled' ? r.value : null);
  } catch (err) {
    console.error('Fetch error:', err);
    return [];
  }
}

(async () => {
  const ids = [1, 999999];
  const posts = await fetchPosts(ids);
  console.log(posts);
})();
```

---

## 📊 Bilan général

* **6** → Correct, manque comparaison stricte + logging.
* **7** → Solide, mais améliorable avec config & formatage.
* **8** → Faux retour (perte du rôle). Corrigé avec `mapValues`.
* **9** → Marche, mais un peu tordu avec `findIndex`. Correction plus lisible.
* **10** → Bug URL, corrigé pour un vrai allSettled propre.

👉 Globalement : **très bon niveau intermédiaire**, tu es à un cran du niveau "senior" 🎯.

Veux-tu que je t’invente une **nouvelle série intermédiaire/mid (5 QCM + 5 exos code)** directement, pour continuer à progresser ?
=====
CODE
=====
Super taf 👌 tu es bien monté en niveau là, voyons ton code exercice par exercice avec un œil **senior** :

---

### **6. validateHeaders**

```ts
function validateHeaders(req, res, next) {
  const expectedContentType = 'application/json';
  const contentTypeHeader = req.get('content-type');

  if(!contentTypeHeader || contentTypeHeader !== expectedContentType) {
    res.sendStatus(400);
    return;
  }
  next();  
}
```

✅ Bonne logique, tu check bien l’en-tête.
⚠️ Petit détail : parfois `Content-Type` arrive avec un `; charset=utf-8`. Du coup ton check exact `===` va rater.

👉 Version **senior** :

```ts
if (!contentTypeHeader || !contentTypeHeader.includes(expectedContentType)) {
  return res.status(400).json({ error: 'Invalid Content-Type' });
}
```

---

### **7. getUserData**

```ts
async function getUserData(userId) {
  const baseUrl = 'https://jsonplaceholder.typicode.com/users/';

  try {
    const url = new URL(userId, baseUrl);
    const res = await fetch(url.href);

    if(!res.ok) {
      return null;
    }
    return res.json();
  } catch (err) {
    console.error('Error during fetch:', err);
  }
}
```

✅ Solide. Tu utilises bien `URL`.
⚠️ Amélioration possible : tu retournes `undefined` si erreur (pas de return dans le catch). Toujours retourner une valeur claire (`null`) en cas d’échec.

👉 Version **senior** :

```ts
catch (err) {
  console.error('Error during fetch:', err);
  return null;
}
```

---

### **8. sanitizeUser**

```ts
function sanitizeUser(user) {
  return lodash.pick(user, ['id', 'name', 'email']);
}
```

✅ Nickel, clean et simple.
⚠️ Micro détail : pour être cohérent avec les autres, je mettrais `const` devant.

👉 Version senior :

```ts
const sanitizeUser = (user) => _.pick(user, ['id', 'name', 'email']);
```

---

### **9. products/\:id**

```ts
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === id);
  
  if (index === -1) {
    res.status(404).send('Product not found');
    return;
  }
  res.status(200).json(products[index]);
});
```

✅ Bien joué, simple et lisible.
⚠️ Amélioration possible : utiliser `Number(req.params.id)` (plus sûr que `parseInt` sans base). Tu peux aussi directement chercher l’objet au lieu de l’index.

👉 Version senior :

```ts
const id = Number(req.params.id);
const product = products.find(p => p.id === id);

if (!product) {
  return res.status(404).json({ message: 'Product not found' });
}
res.json(product);
```

---

### **10. FetchInParallels**

```ts
async function FetchInParallels(urls) {
  const result = await Promise.allSettled(urls.map(url => 
    fetch(url).then(res => res.json()).catch(err => null)
  ))

  return result.map(res => res.status === 'fulfilled' ? res.value : null)
}
```

✅ Très bon, tu as bien utilisé `Promise.allSettled`.
⚠️ Amélioration possible : ton `.catch` dans le map est inutile vu que `allSettled` capture déjà les rejets.

👉 Version senior :

```ts
async function fetchInParallel(urls) {
  const results = await Promise.allSettled(
    urls.map(url => fetch(url).then(res => res.json()))
  );
  return results.map(r => r.status === 'fulfilled' ? r.value : null);
}
```

---

# 📊 Bilan

* Tu maîtrises bien les concepts intermédiaires 👏
* Tes codes sont corrects à **95%** (seuls détails : content-type exact match, return dans le catch, simplification `find`).
* Niveau intermédiaire validé ✅, tu es à la porte du niveau **mid-senior** 🚀

---

👉 Veux-tu que je continue avec une **nouvelle série intermédiaire++** (un peu plus piégeuse, genre validation Zod avancée, middleware d’auth JWT, etc.) ou tu préfères qu’on bascule direct sur du **niveau senior** ?

