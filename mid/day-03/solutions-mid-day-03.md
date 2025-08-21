====
QCM
====
Parfait 🙌 merci pour tes réponses ! On corrige ensemble :

---

# ✅ Correction QCM intermédiaire

**1. Dans Express, que fait `app.use(express.json())` ?**

* ✅ A. Parse automatiquement les `req.body` en JSON
* ❌ B. Valide que toutes les requêtes ont un body JSON valide (non, ça parse, ça ne valide pas)
* ✅ C. Remplace `body-parser` pour le JSON
* ❌ D. Transforme la réponse `res` en JSON (c’est `res.json()`)

👉 Ta réponse **A, C** = ✅ **Correct !**

---

**2. Concernant `Promise.allSettled` :**

* ✅ A. Retourne un tableau avec le résultat de chaque promesse (fulfilled ou rejected)
* ❌ B. Stoppe dès qu’une promesse est rejetée (ça, c’est `Promise.all`)
* ✅ C. Est plus fiable que `Promise.all` pour éviter qu’une erreur casse tout
* ❌ D. Retourne uniquement les valeurs résolues (non, ça donne aussi les erreurs)

👉 Ta réponse **A, C** = ✅ **Correct !**

---

**3. Que fait `lodash.omit(obj, ['password'])` ?**

* ❌ A. Supprime la clé `password` de l’objet original (non, l’objet d’origine reste inchangé)
* ✅ B. Crée une copie de l’objet sans la clé `password`
* ❌ C. Retourne `null` si la clé n’existe pas (non, il renvoie juste l’objet tel quel)
* ❌ D. Lance une erreur si la clé n’existe pas (non plus)

👉 Ta réponse **B** = ✅ **Correct !**

---

**4. Quelle est la différence entre `PUT` et `PATCH` ?**

* ❌ A. `PUT` met à jour partiellement une ressource (non, `PUT` remplace totalement)
* ✅ B. `PATCH` met à jour partiellement une ressource
* ✅ C. `PUT` remplace entièrement la ressource
* ❌ D. `PATCH` supprime une ressource (non, c’est `DELETE`)

👉 Ta réponse **A, B, C** = ❌ (tu t’es trompé avec A).
👉 La bonne réponse = **B, C**

---

**5. À propos de middlewares dans Express :**

* ✅ A. Ils s’exécutent dans l’ordre où ils sont déclarés
* ✅ B. Un middleware doit toujours appeler `next()` (sauf s’il envoie une réponse)
* ❌ C. Ils ne peuvent pas accéder à `req.body` (faux, ils peuvent, si on a `express.json()` avant)
* ✅ D. Ils peuvent modifier `req` et `res` avant d’appeler `next()`

👉 Ta réponse **A, B, D** = ✅ **Correct !**

---

# 📊 Bilan

* Q1 ✅
* Q2 ✅
* Q3 ✅
* Q4 ❌ (erreur → tu as mis A en plus)
* Q5 ✅

👉 **Score : 4 / 5** 🎯 (Très solide, juste une confusion sur PUT vs PATCH).

---

Veux-tu que je te prépare une **mini-fiche récap rapide** sur les verbes HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) pour ne plus jamais te tromper là-dessus ?

=====
CODE
=====
