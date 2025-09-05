====
QCM
====
Parfait 🚀, voyons si tes réponses sont correctes :

---

### ✅ Correction QCM

**Q1. Middleware Express**
👉 Ta réponse : **A**
✔ Correct.
Explication : L’ordre classique est : **middlewares globaux → middlewares spécifiques → contrôleur → middleware d’erreur**.

---

**Q2. Sécurité & API REST**
👉 Ta réponse : **B**
✔ Correct.
Explication : `helmet` ajoute des headers HTTP de sécurité (CSP, noSniff, XSS Protection, etc.).

---

**Q3. Sequelize – Modèle unique**
👉 Ta réponse : **A**
✔ Correct.
Explication : `sequelize.define('User', { email: { type: Sequelize.STRING, unique: true } })` est la bonne manière de déclarer une contrainte d’unicité.

---

**Q4. Performance & Asynchronisme**
👉 Ta réponse : **B**
✔ Correct.
Explication : `cluster` ou `pm2` permettent de **scaler horizontalement** une app Node.js sur plusieurs cœurs CPU.

---

**Q5. CRON – Automatisation**
👉 Ta réponse : **A**
✔ Correct.
Explication : `0 0 * * *` = exécuter à **minuit** chaque jour. Le chemin doit pointer vers l’exécutable Node + script.

---

### 📊 Résultat final

✅ 5/5 → **100% correct, excellent niveau intermédiaire++++++ !** 🎯🔥

---

👉 Prochaine étape : veux-tu que je te propose directement la **correction + version senior de l’exercice pratique (API Car)** pour que tu compares avec ce que tu aurais codé ?
=====
CODE
=====
Super taf 👏 tu as codé tous les exos !
Je vais te faire un **retour détaillé + version senior** pour chacun (6 → 10).

---

## ✅ Exercice 6 – API Car avec Express & Sequelize

**Points forts :**

* Bonne séparation des fichiers (models, controllers, routes, middleware).
* Validation Zod 👍.
* Middleware `User-Agent` bien géré.

**Améliorations “senior” :**

* Dans `car.model.js`, tu as `const sequelize = require('../');` → ça ne fonctionne pas, il faut `require('../index')`.
* Dans `app.js`, tu appelles `express.json()` deux fois.
* Dans `controllers`, tu fais `Car.build().save()` → tu peux simplifier avec `Car.create()`.
* Les erreurs Zod : tu logges mais tu renvoies toujours `500`. Idéalement : `400` pour erreurs de validation.

👉 **Version senior pour `addCar` :**

```js
const addCar = async (req, res) => {
  const CarSchema = z.object({
    brand: z.string().min(1).trim(),
    model: z.string().min(1).trim(),
    year: z.number().gte(2000),
  });

  try {
    const validCar = CarSchema.parse(req.body);
    const car = await Car.create(validCar);
    return res.status(201).json(car);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
```

---

## ✅ Exercice 7 – Middleware Authorization

**Points forts :**

* Vérif bien l’en-tête `Authorization`.
* Tu attaches `req.user` → correct.

**Améliorations “senior” :**

* Retourne un `403 Forbidden` plutôt que `401` si token invalide.
* Utiliser `res.locals` au lieu de `req.user` (plus propre dans Express).

👉 Version senior :

```js
module.exports = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = header.split(' ')[1];
  // Ici tu pourrais vérifier le JWT avec une lib (jsonwebtoken)
  res.locals.user = { role: 'admin', token };
  next();
};
```

---

## ✅ Exercice 8 – Script CRON

**Points forts :**

* Tu utilises `node-cron`, bien joué.
* Destruction avec `Op.lt` est correct.

**Améliorations “senior” :**

* Ton `Car` model est lié à ton MySQL, pas à `sqlite:memory:` → risque d’erreur.
* Il faut `await sequelize.sync()` avant le CRON.
* Ajoute des logs pour monitorer le nettoyage.

👉 Version senior :

```js
cron.schedule('0 0 * * *', async () => {
  try {
    const deleted = await Car.destroy({
      where: { year: { [Op.lt]: 2010 } }
    });
    console.log(`[CRON] ${deleted} cars deleted`);
  } catch (err) {
    console.error('[CRON ERROR]', err);
  }
});
```

---

## ✅ Exercice 9 – Search avec pagination

**Points forts :**

* Utilisation de `zod` pour valider query.
* `findAndCountAll` est la bonne méthode Sequelize 👌.

**Améliorations “senior” :**

* L’offset doit être `(page - 1) * limit`, pas `page - 1`.
* `Op.substring` est OK, mais pour `brand` un `Op.like` avec `%` est plus performant.
* Retourne aussi `page` et `limit` dans la réponse pour plus de clarté.

👉 Version senior :

```js
const { Op } = require('sequelize');

const searchCars = async (req, res) => {
  const schema = z.object({
    brand: z.string().trim().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(10),
  });

  try {
    const { brand, page, limit } = schema.parse(req.query);
    const where = brand ? { brand: { [Op.like]: `%${brand}%` } } : {};
    const { count, rows } = await Car.findAndCountAll({
      where,
      offset: (page - 1) * limit,
      limit,
    });
    res.status(200).json({ totalCount: count, page, limit, cars: rows });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ errors: err.errors });
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
```

---

## ✅ Exercice 10 – Logging & Monitoring

**Points forts :**

* Tu utilises `express-winston`, très bon réflexe.
* `/health` route présente.

**Améliorations “senior” :**

* Ton `error-logger.js` est identique à `logger.js` → mais `expressWinston.errorLogger` doit être utilisé.
* Ajoute une rotation de logs fichiers (`winston-daily-rotate-file`).
* Le `uptime` : renvoyer aussi `process.memoryUsage()` est utile.

👉 Version senior `/health` :

```js
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: Date.now(),
  });
});
```

---

## 📊 Bilan global

* Tu as bien bossé → **toutes les fonctionnalités demandées sont là** 👌
* Niveau **intermédiaire++++++ validé**, tu es déjà dans la bonne logique **senior** : séparation modules, middlewares, validation, logs.
* Les améliorations que je te propose :

  * meilleures pratiques sur `Sequelize` (`create`, pagination correcte)
  * gestion fine des statuts HTTP (`400`, `401`, `403`)
  * observabilité plus complète (logs, metrics)

---

Veux-tu que je te prépare un **mini-projet complet Node.js/Express (structure senior)** basé sur tout ça (avec arborescence clean, middlewares, routes, controllers, logs, cron, tests unitaires Jest) pour que tu aies un **boilerplate réutilisable en entretien** ?

