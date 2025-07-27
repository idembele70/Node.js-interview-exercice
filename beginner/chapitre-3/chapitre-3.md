Parfait Ibrahim 💪 Tu montes en puissance, donc voici une série **niveau Junior+++** → orientée vers le **code propre, modulaire, sécurisé, et prêt à être utilisé dans de vrais projets Node.js**.

---

# 🚀 **10 Questions Node.js – Niveau Junior+++**

## ✅ **1 – QCM (Sécurité)**

Quel est **le principal danger** de parser un body JSON **sans try/catch** dans un serveur HTTP pur ?

A. Le JSON sera ignoré s’il est invalide
B. Le serveur plantera avec une exception non gérée
C. L’utilisateur recevra une 404
D. Le fichier sera effacé

---

## ✅ **2 – QCM (Middlewares)**

Dans Express.js, **un middleware** est :

A. Une fonction qui retourne du HTML
B. Une fonction qui intercepte, traite ou redirige la requête
C. Une base de données interne à Express
D. Une méthode spéciale pour lancer le serveur

---

## ✅ **3 – QCM (Crypto)**

Laquelle de ces méthodes Node.js **est la plus appropriée pour hasher un mot de passe** ?

A. `crypto.createCipher`
B. `crypto.randomUUID`
C. `bcrypt.hash`
D. `Buffer.toString('base64')`

---

## ✅ **4 – QCM (Environnement / .env)**

Quelle librairie est utilisée pour charger les variables d’environnement à partir d’un fichier `.env` ?

A. `dotenv`
B. `env-parser`
C. `config`
D. `require('fs')`

---

## ✅ **5 – QCM (Async flow)**

Dans une fonction async, que fait `await` réellement ?

A. Lance une fonction en parallèle
B. Stoppe le thread principal
C. Attend la résolution d’une promesse avant de continuer
D. Convertit une fonction en callback

---

---

## 🧑‍💻 **6 – Code (Express serveur modulaire)**

👉 **Crée un mini projet Express modulaire :**

* `index.js` lance le serveur sur le port 3000
* `routes/user.js` contient une route `GET /hello` qui répond `{ message: "Hello from route!" }`

---

## 🧑‍💻 **7 – Code (Utilisation de `.env`)**

👉 Crée un projet qui :

* utilise `dotenv` pour charger une variable `PORT` depuis un fichier `.env`
* affiche `Serveur lancé sur le port X` avec le bon port

---

## 🧑‍💻 **8 – Code (Création de token JWT)**

👉 Crée un script qui génère un token JWT avec l’ID d’un utilisateur (ex: `{ id: 123 }`) et une clé secrète `"mysecret"`
(⚠️ Tu peux utiliser `jsonwebtoken`)

---

## 🧑‍💻 **9 – Code (Promesse propre)**

👉 Crée une fonction `delay(ms)` qui retourne une promesse résolue après `ms` millisecondes.
Puis crée une fonction async `run()` qui affiche :

```
Start
(wait 2s)
End
```

---

## 🧑‍💻 **10 – Code (Création d’un logger custom)**

👉 Crée un module `logger.js` qui exporte une fonction `log(msg)` :

* ajoute un horodatage `[HH:MM:SS]` avant chaque message
* Exemple : `[14:03:02] Hello World`
* Utilise `console.log` évidemment, mais formatté.

---

🔥 **Ton plan d’action comme d’hab :**

1. Tu me donnes les réponses 1 à 5 (QCM).
2. Tu me colles ton code 6 à 10.
3. Je te corrige avec conseils pro & bonnes pratiques.

👉 **Go !**
