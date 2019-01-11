# brmasker-ionic

[![GitHub issues](https://img.shields.io/github/issues/amarkes/brmasker-ionic.svg)](https://github.com/amarkes/brmasker-ionic/issues)
[![GitHub stars](https://img.shields.io/github/stars/amarkes/brmasker-ionic.svg)](https://github.com/amarkes/brmasker-ionic/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/amarkes/brmasker-ionic.svg)](https://github.com/amarkes/brmasker-ionic/network)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/amarkes/brmasker-ionic/master/LICENSE)
[![Build Status](https://travis-ci.org/amarkes/brmasker-ionic.svg?branch=master)](https://travis-ci.org/amarkes/brmasker-ionic)


return custom mask in input for ionic 2

# Required
- node 7.7.3 or up
- npm 4.1.2 or up
- ionic 2.2.1

# install

```sh
npm install brmasker-ionic --save
```

### HTML

### correct usage

```html
<ion-item>
	<ion-input type="text" name="cpf" placeholder="CPF" [brmasker]="{mask:'000.000.000-00', len:14}"></ion-input>
</ion-item>
```

### usage in input

```html
<input type="text" name="cpf" placeholder="CPF" [brmasker]="{mask:'000.000.000-00', len:14}" value="">
```

# Module

```javascript
import { AppMaskerModule } from 'brmasker-ionic';

@NgModule({
  imports: [
    AppMaskerModule
  ],
})

```
# Characters

`- . / ( ) , * + @ # R$ $ & %`

# Guide

[brmasker]="{mask:'000.000.000-00', len:14}"

[brmasker] = component receive array (mask, len)

mask --> required / default = '' / custom mask

len --> required / default = 0 / number of length

### data
```html
[brmasker]="{mask:'00/00/0000', len:10}"
```
### cep
```html
[brmasker]="{mask:'00.000-000', len:10}"
```

### cpf
```html
[brmasker]="{mask:'000.000.000-00', len:14}"
```

### cnpj
```html
[brmasker]="{mask:'00.000.000/0000-00', len:18}"
```

### telefone
```html
[brmasker]="{mask:'(00) 0000-0000', len:14}"
```

### whatsapp
```html
[brmasker]="{mask:'(00) 00000-0000', len:15}"
```



# Build for developer

### Only use if you change the component

remove files before build

```file
dist/
src/app/app.module.ngfactory.ts
src/app/app.module.ngsummary.json
src/app/index.ngsummary.json
src/app/components/index.ngsummary.json
src/app/components/masker/index.ngsummary.json
src/app/components/masker/masker.component.ngfactory.ts
src/app/components/masker/masker.component.ngsummary.json
src/app/components/masker/masker.module.ngfactory.ts
src/app/components/masker/masker.module.ngsummary.json
```

```sh
npm run build
```
