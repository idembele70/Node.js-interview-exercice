Parfait 👍 Tu veux donc des exos **Node.js intermédiaire++++++** qui collent directement au contexte de la fiche de poste (Node.js, Express, Sequelize, API REST, Oracle, Linux, scripts/CRON, sécurité).

👉 Voici une **première série avec 5 QCM + 1 exo pratique** pour évaluer et renforcer tes skills Node.js niveau confirmé.

---

## 📝 QCM (niveau intermédiaire++++++)

### Q1. (Middleware Express)

Dans Express, quel est l’ordre correct d’exécution lorsqu’une requête arrive ?

a) Middleware global → Middleware spécifique à une route → Contrôleur → Middleware d’erreur
b) Contrôleur → Middleware global → Middleware d’erreur → Middleware spécifique à une route
c) Middleware global → Middleware d’erreur → Middleware spécifique à une route → Contrôleur
d) Middleware spécifique à une route → Middleware global → Contrôleur → Middleware d’erreur

---

### Q2. (Sécurité & API REST)

Quel est le rôle principal de `helmet` dans une app Node.js/Express ?

a) Gérer les CORS
b) Protéger contre les vulnérabilités HTTP en ajoutant des headers de sécurité
c) Logger toutes les requêtes entrantes
d) Gérer les tokens JWT

---

### Q3. (Base de données avec Sequelize)

Avec Sequelize, quelle est la **bonne syntaxe** pour définir un modèle `User` avec un champ `email` unique ?

a)

```js
const User = sequelize.define('User', {
  email: { type: Sequelize.STRING, unique: true }
});
```

b)

```js
const User = sequelize.model('User', {
  email: { type: Sequelize.STRING, primaryKey: true }
});
```

c)

```js
const User = sequelize.define('User', {
  email: { type: Sequelize.STRING, allowNull: false }
});
```

d)

```js
const User = sequelize.table('User', {
  email: { type: Sequelize.STRING, uniqueKey: true }
});
```

---

### Q4. (Performance & Asynchronisme)

Quel est l’avantage principal d’utiliser `cluster` ou `pm2` avec Node.js ?

a) Augmenter la vitesse du moteur V8
b) Exploiter plusieurs cœurs CPU pour traiter plus de requêtes en parallèle
c) Améliorer la vitesse des requêtes SQL
d) Ajouter automatiquement un cache mémoire

---

### Q5. (Scripts & Automatisation Linux)

Tu dois lancer un script Node.js tous les jours à minuit via `cron`. Quelle configuration est correcte dans la crontab ?

a)

```
0 0 * * * node /home/user/app/script.js
```

b)

```
@daily /usr/bin/node /home/user/app/script.js
```

c)

```
0 24 * * * node /home/user/app/script.js
```

d)

```
daily node /home/user/app/script.js
```

---

## 💻 Exercice pratique : API REST avec Express & Sequelize

👉 Objectif : Implémente une petite API **Node.js + Express + Sequelize** pour gérer une ressource `Car` (lié au contexte automobile du poste 🚗).

### Cahier des charges :

1. Créer un modèle `Car` avec les champs :

   * `id` (PK auto-incrément)
   * `brand` (string, obligatoire)
   * `model` (string, obligatoire)
   * `year` (integer, ≥ 2000)

2. Implémenter un endpoint :

   * `POST /cars` → créer une voiture (avec validation Sequelize).
   * `GET /cars` → récupérer toutes les voitures.

3. Bonus sécurité (exigence fiche de poste) :

   * Ajouter un middleware qui bloque les requêtes si le `User-Agent` n’est pas défini.

---

👉 Exo fait pour t’entraîner à :

* **Express** (middlewares, routes, contrôleurs)
* **Sequelize** (modélisation, validation)
* **Bonne pratique sécurité** (contrôle des headers)
* **Alignement fiche de poste** (API REST, Node.js, base SQL, ergonomie back-end)

---

Veux-tu que je te donne **la correction + version "senior" de l’API Car** (avec bonnes pratiques : séparation contrôleurs/routes/middlewares, validation avancée, typage avec Zod ou Joi, etc.) après que tu aies tenté l’exo ?

Yes 🔥 bonne idée ! Comme tu veux vraiment monter en **Node.js intermédiaire++++++**, je vais te proposer **4 exos de code supplémentaires** en plus de l’API `Car`.
Ça te fera une **série de 5 exos Node.js complets** qui collent pile-poil à la fiche de poste 🚗📊⚡.

---

## 💻 Exercices de code Node.js (niveau intermédiaire++++++)

### Exercice 1 (déjà donné) : **API Car avec Express & Sequelize**

* Créer un modèle `Car` (`id`, `brand`, `model`, `year ≥ 2000`)
* Routes :

  * `POST /cars` → créer une voiture (validation Sequelize)
  * `GET /cars` → récupérer toutes les voitures
* Bonus : middleware qui bloque si `User-Agent` est absent

---

### Exercice 2 : **Middleware de sécurité**

👉 Implémente un middleware Express qui :

1. Vérifie si l’en-tête `Authorization` est présent et commence par `Bearer `.
2. Si absent ou invalide → renvoie `401 Unauthorized`.
3. Sinon, attache un objet `req.user = { role: 'admin' }` pour simuler un utilisateur authentifié.

⚡ Objectif : maîtriser la **sécurité et la gestion des headers** (exigence de la fiche de poste).

---

### Exercice 3 : **Script CRON en Node.js**

👉 Écris un script Node.js qui :

1. Se connecte à une base (mock avec SQLite ou PostgreSQL local si pas Oracle).
2. Supprime automatiquement toutes les voitures de l’année `< 2010`.
3. Utilise la lib `node-cron` pour exécuter la tâche tous les jours à minuit.

⚡ Objectif : pratiquer **scripts et automatisation (CRON)**, mentionnés dans la fiche de poste.

---

### Exercice 4 : **Endpoint performant avec pagination & filtres**

👉 Dans ton API `Car`, ajoute une route :

* `GET /cars/search?brand=Toyota&page=2&limit=5`
* Doit retourner uniquement les voitures de la marque filtrée avec **pagination Sequelize**.
* Inclure aussi un champ `totalCount` dans la réponse JSON.

⚡ Objectif : savoir gérer **requêtes volumineuses avec pagination & filtres** → super important en contexte industriel.

---

### Exercice 5 : **Monitoring & Logging avancé**

👉 Implémente un système de log avec `winston` :

1. Logge chaque requête entrante avec : `method, url, timestamp`.
2. Logge les erreurs dans un fichier `errors.log`.
3. Ajoute un endpoint `/health` qui renvoie `{ status: "ok", uptime: X }`.

⚡ Objectif : maîtriser **observabilité & monitoring** (attendu dans un contexte Agile/Scrum + industriel).

---

🎯 Ces 5 exos couvrent pile les points de la fiche de poste :

* API REST sécurisée (Exo 1 & 2)
* Automatisation CRON (Exo 3)
* Optimisation & SQL (Exo 4)
* Monitoring/logs (Exo 5)

---

Veux-tu que je te donne **les corrections + version senior de ces 5 exos** d’un coup (Express, Sequelize, node-cron, winston, best practices) ou tu préfères les faire d’abord et corriger ensemble step by step ?

