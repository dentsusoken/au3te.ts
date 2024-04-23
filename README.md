# How to use

## Preparing the project

```bash
git clone https://github.com/dentsusoken/au3te.ts
cd au3te.ts
npm run build
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

## Launch Hono + Cloudflare Workers dev server 

```bash
cd app
npm link au3te
```

Creating app/.dev.vars

```
API_BASE_URL = "https://nextdev-api.authlete.net"
API_VERSION = "V3"
API_KEY = "xxxx"
ACCESS_TOKEN = "xxxx"
```

Executing index.js

```bash
npm run dev
```
