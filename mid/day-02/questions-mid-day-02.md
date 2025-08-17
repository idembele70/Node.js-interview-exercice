Parfait 🚀
Je vais te préparer une **nouvelle série d’exercices niveau intermédiaire/mid** :

* **5 QCM** pour tester théorie et compréhension
* **5 exercices de code** pour mettre en pratique

⚠️ Toujours sans les réponses (tu me donneras tes réponses ensuite et je corrigerai).

---

# 🚀 **Série d’exercices Node.js/TS – Niveau Intermédiaire**

---

## 🔹 QCM (5 questions)

### **Q1. Event Loop**

Dans Node.js, quelle partie de l’event loop exécute les callbacks de `setTimeout` ?
A. Microtask queue
B. Timer phase
C. Poll phase
D. Check phase

---

### **Q2. Streams**

Quelle méthode permet de transformer un `Readable Stream` en texte brut directement ?
A. `.pipe()` vers `process.stdout`
B. `.toString()` directement sur le stream
C. Utiliser un `Transform Stream`
D. Lire l’événement `"data"` et concaténer les chunks

---

### **Q3. Zod Validation**

Que fait `z.coerce.number().int()` dans un schéma Zod ?
A. Rejette les nombres flottants
B. Convertit une string numérique en nombre entier
C. Convertit automatiquement les booléens en `0/1`
D. N’accepte que les chaînes de caractères représentant un nombre

---

### **Q4. Express Error Handling**

Quel est le middleware d’erreur valide dans Express ?
A. `(err, req, res, next) => { … }`
B. `(req, res, err) => { … }`
C. `(err, res, req) => { … }`
D. `(req, res, next, err) => { … }`

---

### **Q5. Lodash**

Quelle fonction Lodash permet de **supprimer les doublons** d’un tableau ?
A. `_.uniq()`
B. `_.difference()`
C. `_.remove()`
D. `_.without()`

---

---

## 🔹 Exercices de code (5 questions)

### **Q6. Middleware sécurisé**

Écris un middleware Express `validateApiKey` qui vérifie la présence d’un header `x-api-key`.

* Si la clé est absente → renvoyer `401 Unauthorized`.
* Sinon → passer au middleware suivant.

---

### **Q7. File writer**

Écris une fonction `appendLog(message)` qui ajoute un texte dans un fichier `logs.txt` avec la date et l’heure.
Si le fichier n’existe pas → il doit être créé.

---

### **Q8. Lodash utils**

Avec Lodash, écris une fonction `groupUsersByRole(users)` qui prend un tableau comme :

```js
[
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Clara", role: "admin" }
]
```

et retourne un objet groupé par rôle :

```js
{
  admin: ["Alice", "Clara"],
  user: ["Bob"]
}
```

---

### **Q9. Express route dynamique**

Crée une route Express `/users/:id` qui :

* Cherche un utilisateur dans un tableau `users` en fonction de `id`.
* Retourne `404` si non trouvé.
* Retourne l’objet utilisateur si trouvé.

---

### **Q10. Parallel promises avec fallback**

Écris une fonction `fetchPosts(ids)` qui :

* Prend un tableau d’`ids`
* Récupère les posts correspondants sur :

  ```
  https://jsonplaceholder.typicode.com/posts/{id}
  ```
* Renvoie un tableau avec les résultats.
* Si une requête échoue → insérer `null` à la place.

---

---

👉 Voilà une **nouvelle série complète** 🎯.
Tu veux que je les mette directement en format **Markdown (`.md`) type questionnaire technique** (comme un test blanc que tu complètes), ou tu préfères garder la version brute comme au-dessus ?

