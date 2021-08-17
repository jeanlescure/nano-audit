import fs from 'fs';

export default class NanoAudit {
  private static instances: {[k: string]: NanoAudit} = {};
  auditName: string;
  auditLevel: number = -1;

  constructor(auditName: string) {
    this.auditName = auditName;
    this.audit = this.audit.bind(this);

    if (NanoAudit.instances[auditName]) {
      return NanoAudit.instances[auditName];
    }

    NanoAudit.instances[auditName] = this;
  }

  audit(auditName: string, trackingString: string) {
    const naInstance = this;
    naInstance.auditLevel++;
    const level = naInstance.auditLevel;
    const startTime = Date.now();

    fs.writeFileSync(
      `${auditName}.map.audit`,
      `${`${level}`.replace(/\d+/g, (m) => `${'00000'.substr(m.length - 1)}${m}`)} ${[...Array(level + 1)].map(() => '>').join('')} ${trackingString}\n`,
      { flag: 'a+' },
    );

    return {
      level,
      auditName,
      trackingString,
      startTime,
      end: function () {
        naInstance.auditLevel--;
        const duration = Date.now() - this.startTime;

        fs.writeFileSync(`${this.auditName}.time.audit`, `${`${this.level}`.replace(/\d+/g, (m) => `${'00000'.substr(m.length - 1)}${m}`)} - ${this.trackingString} ${duration}\n`, { flag: 'a+' });
      },
    };
  };
}
