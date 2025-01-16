# Projet de fin de module NoSQL

Ce projet consiste à développer une API backend pour une plateforme d'apprentissage en ligne. L'API permet de gérer des cours et des étudiants, ainsi que les inscriptions des étudiants aux cours. Les données sont stockées dans une base de données MongoDB, et un cache Redis est utilisé pour améliorer les performances en mettant en cache les données fréquemment accédées.

## Installation et lancement du projet

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/ImadIdaliouali/learning-platform-nosql
   cd learning-platform-nosql
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez les variables d'environnement en créant un fichier `.env` à la racine du projet et en y ajoutant les variables suivantes :

   ```properties
   MONGODB_URI=mongodb://localhost:27017
   MONGODB_DB_NAME=learning_platform
   REDIS_URI=redis://localhost:6379
   PORT=3000
   ```

4. Lancez le projet :

   ```bash
   npm start
   ```

5. L'API sera accessible à l'adresse `http://localhost:3000`.

## Endpoints de l'API

### Cours

- `GET /courses`: Récupérer tous les cours.
- `POST /courses`: Créer un nouveau cours.
- `GET /courses/:id`: Récupérer un cours par son ID.
- `PUT /courses/:id`: Mettre à jour un cours par son ID.
- `DELETE /courses/:id`: Supprimer un cours par son ID.
- `GET /courses/stats`: Récupérer les statistiques des cours (nombre total, durée totale, etc.).

### Étudiants

- `GET /students`: Récupérer tous les étudiants.
- `POST /students`: Créer un nouvel étudiant.
- `GET /students/:id`: Récupérer un étudiant par son ID.
- `PUT /students/:id`: Mettre à jour un étudiant par son ID.
- `DELETE /students/:id`: Supprimer un étudiant par son ID.
- `POST /students/:id/enroll`: Inscrire un étudiant à un cours.
- `GET /students/:id/courses`: Récupérer les cours auxquels un étudiant est inscrit.

## Structure du projet

- `src/config`: Configuration de l'application, y compris les connexions aux bases de données et les variables d'environnement.
- `src/controllers`: Logique métier pour les différentes entités (cours, étudiants).
- `src/routes`: Définition des routes de l'API.
- `src/services`: Services pour interagir avec les bases de données (MongoDB, Redis).
- `src/app.js`: Point d'entrée de l'application.

## Réponses aux questions

### Comment gérer efficacement le cache avec Redis ?

Réponse : Utiliser des fonctions utilitaires pour mettre en cache, récupérer et supprimer les données dans Redis. Définir un TTL (Time To Live) pour les clés afin de gérer la durée de vie des données en cache.

### Quelles sont les bonnes pratiques pour les clés Redis ?

Réponse : Utiliser des noms de clés descriptifs et cohérents, inclure des namespaces pour éviter les collisions, et définir des TTL appropriés pour les données mises en cache.

### Pourquoi créer des services séparés ?

Réponse : Pour séparer la logique métier de l'interaction avec les bases de données, ce qui rend le code plus modulaire, réutilisable et maintenable.

### Pourquoi séparer les routes dans différents fichiers ?

Réponse : Pour organiser le code de manière cohérente et faciliter la gestion des routes en les regroupant par entité ou fonctionnalité.

### Comment organiser les routes de manière cohérente ?

Réponse : Utiliser des fichiers séparés pour chaque groupe de routes (par exemple, `studentRoutes.js` pour les routes des étudiants) et les monter dans le fichier principal de l'application (`app.js`).

### Quelle est la différence entre un contrôleur et une route ?

Réponse : Une route définit l'URL et la méthode HTTP pour une requête, tandis qu'un contrôleur contient la logique métier qui est exécutée lorsque cette route est appelée.

### Pourquoi séparer la logique métier des routes ?

Réponse : Pour rendre le code plus modulaire et maintenable, en séparant les préoccupations de la définition des routes et de la logique métier.

### Pourquoi est-il important de valider les variables d'environnement au démarrage ?

Réponse : Pour s'assurer que toutes les configurations nécessaires sont présentes et éviter les erreurs au runtime dues à des variables manquantes.

### Que se passe-t-il si une variable requise est manquante ?

Réponse : Une erreur explicative est levée, ce qui empêche l'application de démarrer sans les configurations nécessaires.

### Pourquoi créer un module séparé pour les connexions aux bases de données ?

Réponse : Pour centraliser la gestion des connexions, faciliter la réutilisation du code et améliorer la maintenabilité.

### Comment gérer proprement la fermeture des connexions ?

Réponse : Implémenter des fonctions dédiées pour fermer les connexions aux bases de données et les appeler lors de l'arrêt de l'application.

### Comment organiser le point d'entrée de l'application ?

Réponse : Initialiser les connexions aux bases de données, configurer les middlewares Express, monter les routes et démarrer le serveur dans le fichier principal (`app.js`).

### Quelle est la meilleure façon de gérer le démarrage de l'application ?

Réponse : Utiliser une fonction asynchrone pour gérer l'initialisation des connexions et le démarrage du serveur, et capturer les erreurs pour éviter les plantages.
