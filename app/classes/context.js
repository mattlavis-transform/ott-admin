const e = require("express");
const axios = require('axios')

class Context {
    constructor(req) {
        this.back_link = req.headers.referer;
    }

    async get_quota_results() {
        var axios_response;
        var root = "http://127.0.0.1:5000/quotas/";
        var url = root + this.quota_order_number_id;

        [axios_response] = await Promise.all([
            axios.get(url)
        ]);

        this.quota_data = axios_response.data["data"];
        if (typeof this.quota_definition_sid !== 'undefined') {
            for (var i = this.quota_data["quota_definitions"].length - 1; i >= 0; --i) {
                if (this.quota_data["quota_definitions"][i].quota_definition_sid != this.quota_definition_sid) {
                    this.quota_data["quota_definitions"].splice(i, 1); 
                    var a = 1;
                } else {
                    var a = 1;
                    this.quota_data["quota_definitions"][i]["quota_balance_events"].reverse();
                }
              }
        }
        var a = 1;
    }

    async get_quota_measures() {
        var axios_response;
        var root = "http://127.0.0.1:5000/quota_measures/";
        var url = root + this.quota_order_number_id;

        [axios_response] = await Promise.all([
            axios.get(url)
        ]);

        this.quota_data = axios_response.data["data"];
        if (typeof this.quota_definition_sid !== 'undefined') {
            for (var i = this.quota_data["quota_definitions"].length - 1; i >= 0; --i) {
                if (this.quota_data["quota_definitions"][i].quota_definition_sid != this.quota_definition_sid) {
                    this.quota_data["quota_definitions"].splice(i, 1); 
                    var a = 1;
                } else {
                    var a = 1;
                    this.quota_data["quota_definitions"][i]["quota_balance_events"].reverse();
                }
              }
        }
        var a = 1;
    }

}
module.exports = Context