import IORedis from 'ioredis';
import grp from './tst';
import {
  perfReportUpload,
  perfReport,
  clearPerfReport,
  getPerfStat,
} from './PerfStat';

export default {
  upload: (redis: IORedis.Redis) => {
    grp.upload(redis);
    perfReportUpload(redis);
  },
  tst: grp.run,
  perfReport,
  clearPerfReport,
  getPerfStat,
};
