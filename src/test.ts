import NanoAudit from ".";

const auditName = 'test';

const {audit} = new NanoAudit(auditName);

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

// const fourthFn = () => {
//   const auditResult = audit(auditName, `fourthFn`);
//   const startedAt = Date.now();

//   setTimeout(() => {
//     while ((Date.now() - startedAt) < 300) {}

//     auditResult.end();
//   });
// };

// setTimeout(firstFn, 100);
// setTimeout(firstFn, 100);
// setTimeout(firstFn, 100);
// setTimeout(firstFn, 100);

// secondFn();

// [...Array(99).keys()].map((n) => audit(auditName, `xFn${n}`)).forEach((a) => a.end());

// thirdFn();

// setTimeout(fourthFn, 100);
// setTimeout(fourthFn, 150);
// setTimeout(fourthFn, 200);
// setTimeout(fourthFn, 250);

firstFn();
secondFn();
thirdFn();
