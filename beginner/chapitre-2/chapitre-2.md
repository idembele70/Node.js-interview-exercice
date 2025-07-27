🔥 **Let's go pour un niveau "junior++" !**
Toujours **mix QCM + code** pour t’entraîner comme sur un vrai coding challenge.
👉 Cette fois, plus orienté **async, events, streams, modules, bonnes pratiques**.

---

# ✅ **10 Questions Junior++ en Node.js**

## **1 – QCM (Asynchrone)**

Quelle est la **bonne façon** d’attendre qu’un `setTimeout` ait fini avant d’exécuter du code ?

A.

```js
setTimeout(() => {
  console.log("Done");
}, 1000);
console.log("Finished");
```

B.

```js
await new Promise(resolve => setTimeout(resolve, 1000));
console.log("Finished");
```

C.

```js
setInterval(() => console.log("Finished"), 1000);
```

---

## **2 – QCM (Events)**

Quel module Node.js sert à créer et écouter des événements personnalisés ?

A. `events`
B. `stream`
C. `timers`

---

## **3 – QCM (Buffer)**

Que retourne :

```js
Buffer.from("Node").toString('hex')
```

A. `Node`
B. `4e6f6465`
C. `[78, 111, 100, 101]`

---

## **4 – QCM (fs et bonnes pratiques)**

Laquelle est **la meilleure façon** pour lire un gros fichier **sans tout charger en mémoire d’un coup** ?

A. `fs.readFileSync`
B. `fs.createReadStream`
C. `fs.promises.readFile`

---

## **5 – QCM (import/export)**

Pour exporter **par défaut** une fonction avec ESM, on utilise :

A.

```js
export default function test() {}
```

B.

```js
module.exports = test;
```

C.

```js
exports.test = test;
```

---

## **6 – Code (Events)**

👉 **Crée un petit programme qui :**

1. Importe `EventEmitter`
2. Crée un event `sayHello` qui affiche "Hello from event!"
3. Émet cet event.

---

## **7 – Code (Streams)**

👉 **Lis un fichier `bigfile.txt` ligne par ligne avec un stream et affiche chaque ligne dans la console.**

---

## **8 – Code (Async)**

👉 **Crée une fonction `waitAndLog` qui attend 2 secondes avant d’afficher "Done waiting!".**
⚠️ **Elle doit utiliser `async/await` et `setTimeout`.**

---

## **9 – Code (HTTP + JSON)**

👉 **Crée un petit serveur HTTP qui :**

* répond en **JSON** : `{ "message": "Hello JSON" }`
* écoute sur le port `4000`.

---

## **10 – Code (Modules)**

👉 **Crée 2 fichiers :**

* `math.js` qui exporte **2 fonctions** : `multiply(a,b)` et `subtract(a,b)`
* `app.js` qui les importe et affiche :

```
3 * 4 = 12
10 - 2 = 8
```

---

🔥 **Tu joues le jeu comme la dernière fois :**

* Tu réponds d’abord **1 à 5 (QCM)**,
* Puis tu me **colles ton code 6 à 10**.
  Ensuite je te fais le **corrigé + scoring complet**.

👉 **Go ?**

========
CORRIGÉ
========
🔥 **Excellent travail Ibrahim !** Tu montes clairement en niveau 👏.
Voici ton **corrigé détaillé + retours pour écrire du code clean et "conventionnel"** :

---

## ✅ **1 à 5 (QCM)**

| Q | Ta réponse | Corrigé | Commentaire                                                                                                                |
| - | ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| 1 | **A** ❌    | ✅ **B** | On t’attendait sur **`await new Promise(...)`**. Ta version A ne "bloque" pas l’exécution (c’est async mais non bloquant). |
| 2 | **A** ✅    | ✅       | ✔️ Correct (`events`).                                                                                                     |
| 3 | **B** ✅    | ✅       | ✔️ Exact (`4e6f6465`).                                                                                                     |
| 4 | **C** ❌    | ✅ **B** | Pour un gros fichier, c’est **stream** la meilleure approche.                                                              |
| 5 | **A** ✅    | ✅       | ✔️ Correct (ESM export default).                                                                                           |

👉 **Score QCM : 3/5**
🔹 Points à revoir : **asynchrone (1)** et **streams (4)**.

---

## ✅ **6 – Events**

✔️ **Parfait** !
Ton code est clean et conforme :

```js
const EventEmitter = require('events');
const myEvent = new EventEmitter();

myEvent.on('sayHello', () => {
  console.log('Hello from event!');
});
myEvent.emit('sayHello');
```

🔹 **Petit plus convention :** en vrai projet, on sépare souvent les `on` et `emit` dans des fonctions distinctes, mais pour un exercice c’est parfait.

---

## ✅ **7 – Streams**

Ton code fonctionne ✅, **mais pas optimal pour ligne par ligne**.
👉 `readableStream.read()` lit des chunks bruts (ça peut couper des lignes au milieu).

🔹 **Version plus clean et lisible** :

```js
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./bigfile.txt', { encoding: 'utf-8' }),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  console.log(line);
});

rl.on('close', () => {
  console.log('End of file read');
});
```

✅ Cette version est la convention standard en Node.js.

---

## ✅ **8 – Async / Await**

Ton code fonctionne ✅ mais **pas ultra conventionnel** car tu déclares un `new Promise` en dehors de la fonction (moins lisible).

🔹 **Version recommandée** :

```js
async function waitAndLog() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log('Done waiting!');
}

waitAndLog();
```

---

## ✅ **9 – HTTP + JSON**

Parfait ✅. Rien à dire :

```js
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello JSON' }));
}).listen(4000);
```

---

## ✅ **10 – Modules**

Ton code est bon, **mais mélange entre `.mjs` et `.js`** et petit détail sur la logique :

### 👉 **Tes points à corriger :**

1. **`math.js` doit être en `.mjs` aussi** (sinon import impossible en ESM).
2. Dans un vrai module, on ne renvoie pas une string déjà formatée (`"3 * 4 = 12"`), mais juste la valeur. Le `console.log` s’occupe du format.

---

### ✅ **Version clean et pro :**

**math.mjs**

```js
export const multiply = (a, b) => a * b;
export const subtract = (a, b) => a - b;
```

**app.mjs**

```js
import { multiply, subtract } from './math.mjs';

console.log(`3 * 4 = ${multiply(3, 4)}`);
console.log(`10 - 2 = ${subtract(10, 2)}`);
```

---

## **🔴 Bilan & Score**

✅ QCM : **3/5**
✅ Code : **8.5/10** (seules des petites conventions à revoir)

**Points à bosser pour monter niveau "pro" :**

1. **Async / Await fluide** → toujours `await` dans une fonction et pas de `new Promise` inutilement.
2. **Streams** → utiliser `readline` pour lire ligne par ligne.
3. **Modules ESM** → bien séparer logique et présentation (pas formatter dans la fonction).

---

🔥 **Prochain step :**
💡 Je peux te faire un **pack "10 questions niveau intermédiaire (Node.js orienté projet réel)"** avec :

* Express,
* Middleware,
* JWT / Auth basique,
* Streams avancés (upload),
* Modules splités proprement.