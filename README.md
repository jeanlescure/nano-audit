# Nano Audit

Tiny utility library to quickly audit Javascript/Typescript tree of function calls and durations.

## Like this module? ❤

Please consider:

- [Buying me a coffee](https://www.buymeacoffee.com/jeanlescure) ☕
- Supporting me on [Patreon](https://www.patreon.com/jeanlescure) 🏆
- Starring this repo on [Github](https://github.com/jeanlescure/nano-audit) 🌟

## Usage

```ts
// import NanoAudit and instantiate it in your code:

import NanoAudit from 'nano-audit';

const { audit } = new NanoAudit('my-audit');

// then use the `audit` function to audit your code:

const firstFn = () => {
  const auditResult = audit(auditName, `firstFn`);
  const startedAt = Date.now();

  while ((Date.now() - startedAt) < 300) {}

  auditResult.end();
};

const secondFn = () => {
  const auditResult = audit(auditName, 'secondFn');

  firstFn();
  auditResult.end();
};

const thirdFn = () => {
  const auditResult = audit(auditName, 'thirdFn');

  secondFn();
  auditResult.end();
};

firstFn();
secondFn();
thirdFn();
```

## Output

```ts
// ./my-audit.map.audit
// fn-depth | fn-name
000000 > firstFn
000000 > secondFn
000001 >> firstFn
000000 > thirdFn
000001 >> secondFn
000002 >>> firstFn

// ./my-audit.time.audit
// fn-depth | fn-name | duration-ms
000000 - firstFn 301
000001 - firstFn 300
000000 - secondFn 300
000002 - firstFn 300
000001 - secondFn 302
000000 - thirdFn 302

```

## Author Notes

This is NOT meant to be an exhaustive auditing tool, nor am I planning to add any complex features
in any foreseeable future.

There are many and better solutions if you wish to audit your JS/TS apps with more detail.

One such example:

https://clinicjs.org/

Cheers 🍺
