"use strict";
exports.__esModule = true;
var tst_1 = require("./tst");
var PerfStat_1 = require("./PerfStat");
exports["default"] = {
    upload: function (redis) {
        tst_1["default"].upload(redis);
        PerfStat_1.perfReportUpload(redis);
    },
    tst: tst_1["default"].run,
    perfReport: PerfStat_1.perfReport,
    clearPerfReport: PerfStat_1.clearPerfReport,
    getPerfStat: PerfStat_1.getPerfStat
};
