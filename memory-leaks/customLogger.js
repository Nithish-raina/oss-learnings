const logger = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
    logWithTimeStamp: (logMethod = "log", message) => {
        const time = new Date().toLocaleTimeString();
        logger[logMethod](`[${logMethod.toUpperCase()}]-[${time}] ${message}`);
    },
};
logger.log("THIS IS LOG STATEMENT WITHOUT TIMESTAMP");
logger.info("THIS IS AN INFO STATEMENT WITHOUT TIMESTAMP");
logger.error("THIS IS AN INFO STATEMENT WITHOUT TIMESTAMP");
logger.logWithTimeStamp("error", "THIS IS AN ERROR STATEMENT WITH TIMESTAMP");
logger.logWithTimeStamp("info", "THIS IS AN INFO STATEMENT WITH TIMESTAMP");
logger.logWithTimeStamp("log", "THIS IS A LOG STATEMENT WITH TIMESTAMP");
module.exports = {
    logger: logger,
};
