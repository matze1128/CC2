# Verwenden des offiziellen Node.js 16 Alpine-Images als Basis
FROM node:16-alpine

# Setzen des Arbeitsverzeichnisses im Container
WORKDIR /usr/src/app

COPY package*.json ./

# Installieren der Node.js-Abhängigkeiten
RUN npm install

# Kopieren des gesamten Projektcodes in das Arbeitsverzeichnis im Container
COPY . .

EXPOSE 3001

CMD ["node", "./src/server.js"]

