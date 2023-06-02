# image node
FROM node:latest AS node

# répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers de configuration
COPY . .

# Installion des dépendances
RUN npm install

# Compilation du projet Angular
RUN npm run build --prod

# image Nginx pour exécuter Angular
FROM nginx:alpine

# Copie des fichiers Angular dans le répertoire web par défaut de Nginx
COPY --from=node /app/dist/groove-street-angular /usr/share/nginx/html


# commande docker :
# se positionner dans le répertoire parent du projet !
# a executer pour creer les images
# docker build --rm -f groovestreetangular/Dockerfile -t groovestreetangular:v0 groovestreetangular