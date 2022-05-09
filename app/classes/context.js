const e = require("express");
const axios = require('axios')

class Context {
    constructor(req) {
        this.back_link = req.headers.referer;
        this.show_future = req.query["show_future"];
        this.current_date = new Date();
        if (typeof this.show_future === 'undefined') {
            this.show_future = 0;
        }
        var a = 1;
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

    async get_quota_definition() {
        var axios_response;
        var moment = require('moment');
        var root = "http://127.0.0.1:5000/quota_definition/";
        var url = root + this.quota_definition_sid;

        [axios_response] = await Promise.all([
            axios.get(url)
        ]);

        var quota_data = axios_response.data;
        this.validity_start_date = moment(quota_data["validity_start_date"]).format('d MMM YYYY'); 
        this.validity_end_date = moment(quota_data["validity_end_date"]).format('d MMM YYYY'); 
        this.quota_order_number_id = quota_data["quota_order_number_id"];
        this.measurement_unit_code = quota_data["measurement_unit_code"];
        this.initial_volume = parseFloat(quota_data["initial_volume"]).toLocaleString();
        var a = 1;
    }

}
module.exports = Context
