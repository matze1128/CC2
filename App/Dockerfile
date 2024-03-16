# Verwenden des offiziellen Node.js 16 Alpine-Images als Basis
FROM node:16-alpine

# Setzen des Arbeitsverzeichnisses im Container
WORKDIR /usr/src/app

# Kopieren der 'package.json' und 'package-lock.json' (falls vorhanden)
COPY package*.json ./

# Installieren der Node.js-Abhängigkeiten
RUN npm install

# Kopieren des gesamten Projektcodes in das Arbeitsverzeichnis im Container
COPY . .

# Der Port, auf dem der Service läuft (falls notwendig)
EXPOSE 3000

# Befehl, der zum Starten des Services verwendet wird
CMD ["node", "./src/server.js"]

