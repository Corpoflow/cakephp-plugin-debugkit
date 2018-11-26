/**
 *
 */
export default {
    /**
     *
     * @param itery
     * @param callback
     */
    iterate: function(itery, callback) {
        for (let i = 0; i < itery.length; i++) {
            callback(itery[i]);
        }
    }
};
