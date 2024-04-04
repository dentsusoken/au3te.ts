# How to use

## Preparing the project
```bash
git clone https://github.com/dentsusoken/au3te.ts
cd au3te.ts
npm link
```

## Using au3te.ts from another project

```bash
mkdir test
cd test
npm init es6 -y
npm link au3te
```

Creating index.js

```javascript
import { add } from 'au3te';

console.log(add(1, 2));
```

Executing index.js

```bash
node index.js
```

