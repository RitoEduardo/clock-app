const express = require('express');

const Model = require('../models/model');
const ValidateModel = require('../models/validate_model');

const app = express();

app.get('/api', function(req, res) {
    res.json({
        success: true,
        response: "Api OK"
    });
});

app.get('/api/models', function(req, res) {

    Model.find({})
        .exec((err, response) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            res.json({
                success: true,
                response
            });
        });

});

app.post('/api/models', function(req, res) {

    let body = req.body;

    if (!body.hour || !body.minutes) {
        return res.status(400).json({
            success: false,
            err: " The params 'hour' and 'minutes' is necesary"
        });
    }

    var hour = Number(body.hour) ;
    var minute = Number(body.minutes);
    
    if( ValidateModel.hour( hour ) == false ) {
        return res.status(400).json({
            success: false,
            err : `The hour => ${ body.hour } format or limit invalid`
        });
    };
    
    if( ValidateModel.minute(minute) == false) {
        return res.status(400).json({
            success: false,
            err : `The Minute => ${ body.minutes } format or limit invalid`
        });
    };

    //Aquí guardamos en la base de datos y generamos la fecha aleatoria aleatorios
    let model = new Model({
        date_user: new Date(0,0,0,hour,minute,0),
        date_generate: new Date(0,0,0,Math.floor( Math.random() * (23) ),Math.floor( Math.random() * (60) ),0)
    });

    model.save((err, modelDB) => {

        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.json({
            success: true,
            model: modelDB
        });

    });

});

app.delete('/api/models/:id', function(req, res) {
    
    let id = req.params.id;
    
    Model.findByIdAndRemove(id, (err, modelDB) => {

        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.json({
            success: true,
            model: modelDB
        });

    });

});



module.exports = app;