const express = require('express')
const router = express.Router()
const Context = require('./classes/context');

// Add your routes here - above the module.exports line


const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };

// Quota results
router.get([
    '/quota_results/'
],
    asyncMiddleware(async (req, res, next) => {
        var context = new Context(req);
        context.quota_order_number_id = req.query["quota_order_number_id"];
        await context.get_quota_results();

        var a = 1;

        res.render('quota_results', {
            'context': context
        });
    }));

// Quota measures
router.get([
    '/quota_measures/'
],
    asyncMiddleware(async (req, res, next) => {
        var context = new Context(req);
        context.quota_order_number_id = req.query["quota_order_number_id"];
        await context.get_quota_measures();

        var a = 1;

        res.render('quota_measures', {
            'context': context
        });
    }));

// Quota graph
router.get([
    '/quota_graph/'
],
    asyncMiddleware(async (req, res, next) => {
        var context = new Context(req);
        context.quota_order_number_id = req.query["quota_order_number_id"];
        context.quota_definition_sid = parseInt(req.query["quota_definition_sid"]);
        await context.get_quota_results();

        var a = 1;

        res.render('quota_graph', {
            'context': context
        });
    }));

module.exports = router
