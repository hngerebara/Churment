var express = require('express');
var router = express.Router();

router.route('/workers')
    .get(function(req, res){
        res.send({message: 'To retrieve all workers'});
    })
    .post(function(req, res){
        res.send({message: 'Create a new worker'});
    })

router.route('/workers/:id')
    .get(function(req, res){
    res.send({
        message: 'get the specific worker' + req.params.id
        })
    })
    .put(function(req, res){
        res.send({
            message: 'Update existing woker' + req.params.id
        })
    })
    .delete(function(req, res){
        res.send({
            message: 'Delete existing worker' + req.params.id
        })
    })

module.exports = router;