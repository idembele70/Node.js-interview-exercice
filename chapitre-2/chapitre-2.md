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
