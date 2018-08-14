'use strict';
const Queue = require('bull');

module.exports = ['q', ({
                            options: {name: oName, redis: oRedis} = {}
                        }) => {
    return {
        q: {
            /**
             * Creates a Bull.Queue
             * @param name
             * @param redis
             * @return {Bull | Bull.Queue | * | Queue}
             */
            Q: (name = oName, redis = oRedis) => {
                return new Queue(name, typeof redis === 'string' ? redis : {
                    redis
                });
            }
        }
    }
}];