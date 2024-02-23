
# Projet final clean code

## Installation back

Installer les node modules

```bash
  cd server/
  npm install
```
Démarrer le docker (à la racine du projet)
```bash
  cd ../
  docker compose up -d
```
Lancer les migrations
```bash
  docker compose exec server node migrate force
```
Le serveur est bien fonctionnel et accessible à partir de http://localhost:8000/
## Installation front
Installer les node modules

```bash
  cd client/
  npm install
```
Démmarer le front
```bash
  npm run dev
```
Le client est bien fonctionnel et accessible à partir de http://localhost:3000/
## Schémas
Les schémas du projet ce trouve dans le fichier du même nom à la racine

## Membres du groupe

- [@Ayman-BEDDA](https://github.com/Ayman-BEDDA)
- [@SimonBTSSio](https://github.com/SimonBTSSio)

