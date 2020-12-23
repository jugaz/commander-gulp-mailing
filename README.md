# ***Commander Gulp Mailing Dynamic***
<p>Compilación de mailings dinámicamente</p>

![commander: version (tag)](https://img.shields.io/badge/commander-v3.0.2-blue?style=for-the-badge)
![gulp: version (tag)](https://img.shields.io/badge/gulp-v4.0.2-orange?style=for-the-badge)
![MIT License](https://img.shields.io/badge/lincense-MIT-yellow?style=for-the-badge) 
![npm: version (tag)](https://img.shields.io/badge/npm-v7.0.15-red?style=for-the-badge)
![node: version (tag](https://img.shields.io/badge/node-v15.4.0-green?style=for-the-badge) 


### **Instalación**

```bash
$ npm install commander-gulp-mailing
```


### **Comando a ejecutar**

- Comando para Developer

```bash
$ commander-gulp-mailing mailing 'entry' --m 'ouput' 
```

- Comando para Producción

```bash
$ commander-gulp-mailing prod:mailing 'entry'  --m 'ouput'
```


#### **Comando a ejecutar con Npm**

```bash
  "scripts": {
    "mailing": "commander-gulp-mailing mailing \"frontend/src/mailing/*.pug\" \"frontend/src/mailing/**/*.pug\" --m \"docs/\'",
    "prod:mailing": "commander-gulp-mailing prod:mailing \"frontend/src/mailing/*.pug\" \"frontend/src/mailing/**/*.pug\" --m \"docs/\'"
  }
```
