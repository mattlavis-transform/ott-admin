var numeral = require('numeral');


module.exports = function (env) {
    /**
     * Instantiate object used to store the methods registered as a
     * 'filter' (of the same name) within nunjucks. You can override
     * gov.uk core filters by creating filter methods of the same name.
     * @type {Object}
     */
    var filters = {}


    filters.format_date = function (str, fmt) {
        var s;
        if ((str == "") || (str == null)) {
            s = "";
        } else {
            var moment = require('moment');
            var s = moment(str).format(fmt);
        }
        return s;
    }

    filters.uk_numbers = function (str) {
        var fmt = "0,0.000";
        var formatted_value = numeral(str).format(fmt);
        return (formatted_value);
    }

    return filters
}
