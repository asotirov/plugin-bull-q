'use strict';
const Queue = require('bull');
const _qs = Symbol('queues');
module.exports = ['q', ({
                            redis: pRedis
                        }) => {
    const q = {
        [_qs]: {},
        initQ: (name = 'DEFAULT', {redis = pRedis, limiter, prefix, defaultJobOptions, settings} = {}) => {
            q[_qs][name] = new Queue(name, {redis: redis.options, limiter, prefix, defaultJobOptions, settings});
            return q.Q(name);
        },
        /**
         * Returns the queue with the specified name if it is initialized
         * @param name
         * @return {Bull | Bull.Queue | * | Queue}
         */
        Q: (name) => {
            const qToReturn = q[_qs][name];
            if (!qToReturn) {
                throw new Error(`${name} bull q not initialized. Call q.initQ(name...) to initialize.`);
            }
            return qToReturn;
        }
    };
    return {
        q
    };
}];