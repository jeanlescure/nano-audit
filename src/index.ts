import fs from 'fs';

class NanoAudit {
  private static instances: {[k: string]: NanoAudit} = {};
  auditName: string;
  auditLevel: number = -1;
  totalAudits: number = 0;

  constructor(auditName: string) {
    this.auditName = auditName;
    this.audit = this.audit.bind(this);

    if (NanoAudit.instances[auditName]) {
      return NanoAudit.instances[auditName];
    }

    if (process.env.NANO_AUDIT === 'TRUE') {
      fs.writeFileSync(
        `${auditName}.map.audit`,
        `ID      \tG_LVLS\tFN_LVL\tT_STR\n`,
        { flag: 'a+' },
      );

      fs.writeFileSync(
        `${this.auditName}.time.audit`,
        `ID      \tG_LVLS\tFN_LVL\tT_STR\tDURATION\n`,
        { flag: 'a+' },
      );
    }

    NanoAudit.instances[auditName] = this;
  }

  private _padNum(n: number) {
    return `${n}`.replace(/\d+/g, (m) => `${'00000'.substr(m.length - 1)}${m}`);
  }

  audit(trackingString: string) {
    if (process.env.NANO_AUDIT === 'TRUE') {
      const naInstance = this;

      naInstance.auditLevel++;
      const level = naInstance.auditLevel;

      const startTime = Date.now();

      naInstance.totalAudits++;

      const { totalAudits, auditName, _padNum } = naInstance;

      const id = (Math.floor(+new Date() / 1000) + totalAudits).toString(16);

      fs.writeFileSync(
        `${auditName}.map.audit`,
        `${id}\t${_padNum(naInstance.auditLevel + 1)}\t${_padNum(level)}\t${[...Array(level + 1)].map(() => '>').join('')} ${trackingString}\n`,
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

          fs.writeFileSync(
            `${this.auditName}.time.audit`,
            `${id}\t${_padNum(naInstance.auditLevel + 1)}\t${_padNum(level)}\t${this.trackingString}\t${duration}\n`,
            { flag: 'a+' },
          );
        },
      };
    }

    return {
      level: null,
      auditName: null,
      trackingString: null,
      startTime: null,
      end: () => {},
    };
  };
}

export default NanoAudit;

module.exports = NanoAudit;
