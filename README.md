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

Make sure to set the NANO_AUDIT env var to TRUE:

```ts
// i.e. in your .env:
NANO_AUDIT=TRUE

// or when running your app:
$ NANO_AUDIT=TRUE yarn start
```

## Output

```bash
# ./my-audit.map.audit
ID      	G_LVLS	FN_LVL	T_STR
611b2f53	000001	000000	> firstFn
611b2f54	000001	000000	> secondFn
611b2f55	000002	000001	>> firstFn
611b2f56	000001	000000	> thirdFn
611b2f57	000002	000001	>> secondFn
611b2f58	000003	000002	>>> firstFn

# ./my-audit.time.audit
ID      	G_LVLS	FN_LVL	T_STR	DURATION
611b2f53	000000	000000	firstFn	301
611b2f55	000001	000001	firstFn	300
611b2f54	000000	000000	secondFn	300
611b2f58	000002	000002	firstFn	300
611b2f57	000001	000001	secondFn	302
611b2f56	000000	000000	thirdFn	302

# NOTE: in the last line of the `.time.audit` files,
#       G_LVLS should ALWAYS end in 000000
#       otherwise it means that an audit failed to
#       call it's `.end()` method
```

## Author Notes

This is NOT meant to be an exhaustive auditing tool, nor am I planning to add any complex features
in any foreseeable future.

There are many and better solutions if you wish to audit your JS/TS apps with more detail.

One such example:

https://clinicjs.org/

Cheers 🍺
