# fpgen-server

A REST API for assisted generation of synthetic fingerprints with the help of pre-trained GAN models

## Usage

Install required modules:

```
npm install
```

Start backend server:

```
npm start
```

Or start backend server with nodemon to auto-restart server if files are changed:

```
npm run dev
```

The server is available under http://localhost:5000

## Docker

Build docker image:

```
docker build . -t azmke/fpgen-server
```

Run docker container:

```
docker run -p 8000:5000 -d azmke/fpgen-server
```

The server is available under http://localhost:8000

## Docs

First, start the server:

```
npm start
```

Docs are located here: http://localhost:5000/docs

## Disclaimer

THE SOFTWARE FPGEN-SERVER WAS DEVELOPED AS PART OF THE COURSE ["WTP PRAKTIKUM IT-SECURITY (P-ITSEC)"](https://omen.cs.uni-magdeburg.de/itiamsl/deutsch/lehre/ss-22/praktikum-it-sicherheit-p-itsecwtp.html) AT OTTO-VON-GUERICKE UNIVERSITY MAGDEBURG UNDER THE SUPERVISION OF PROF. DR.-ING. JANA DITTMANN AND DR.-ING. CHRISTIAN KRÄTZER AND WITH THE SUPPORT OF DR.-ING. ANDREY MAKRUSHIN AND STEFAN SEIDLITZ IN THE SUMMER SEMESTER 2022.

FPGEN-SERVER IS RESEARCH SOFTWARE ONLY. IT IS DISTRIBUTED AS IS AND WITHOUT ANY WARRANTY. IT IS LICENSED UNDER THE TERMS AND CONDITIONS OF THE GNU GENERAL PUBLIC LICENSE (GPL) VERSION 3. NO AUTHOR OR DISTRIBUTOR ACCEPTS RESPONSIBILITY TO ANYONE FOR THE CONSEQUENCES OF USING IT OR FOR WHETHER IT SERVES ANY PARTICULAR PURPOSE OR WORKS AT ALL.