# SCM Algorithm

SCM Algorithm ist eine Fullstack entwicklung basierend auf React und Express. Die Algorithmen orientieren sich an der Vorlesung & Übung Standortplanung und strategisches Supply Chain Management (Dozent: Prof. Dr. Stefan Nickel, WS 20/21, KIT) 

## Quelle

- Vorlesung & Übung Standortplanung und strategisches Supply Chain Management
- Dozent: Prof. Dr. Stefan Nickel
- Institut für Operations Research Diskrete Optimierung und Logistik
- KIT: Karlsruher Institut für Technology
- WS 20/21

## Vorworte

- die App ist in 2 Teile aufgeteilt. 
    - im fe Ordner liegt ein React-App.
    - im be Ordner liegt eine Express-App


## Installation

Installieren von [NodeJs (14.16.1)](https://nodejs.org/en/download/).

```bash
cd fe
npm install

cd be
npm install
```

im be folrder .env.development in .env umbenennen


Starten

```bash
cd fe
npm start

cd be
npm run devStart
```

## Docker

Das Programm kann auch mittels Docker, Docker-Composer aufgesetzt werden

Zum Installieren und Starten:
```bash
docker-compose up --build
```

Zum Starten des Dockers:
```bash
docker-compose up
```


## License
[MIT](https://www.gnu.org/licenses/agpl-3.0.en.html)