var router = require('express').Router();
var USERCLASS = require('../mongodb/mongoose_connection');
module.exports = router;

router.get('/', do_homepage);
router.get('/api/v2/dropdown', get_dropdown);

function do_homepage(req, res) {
    console.log('doing homepage');
    res.render('index');
}

// front-end controls, dropdowns, radio buttons, checkboxes etc
function get_dropdown(req,res) {
    console.log('getting dropdown');
    USERCLASS.find().distinct('job').then(function (jobs) {
        console.log(jobs);
        res.json(jobs);
    });
}

// api onwards!
router.get('/api/v2/read', do_read);
router.post('/api/v2/create', do_create);
router.put('/api/v2/update', do_update);
router.delete('/api/v2/delete/:_id', do_delete);

function do_read(req, res) {
    console.log('reading all data');
    USERCLASS.find()
    .then(function(results) {
        console.log(results);
        res.json(results);
    });
}

function do_create(req, res) {
    console.log('creating new user');
    console.log(req.body);

    var data = {
        name: req.body.name,
        gender: req.body.gender,
        job: req.body.job
    }
    var user = new USERCLASS(data);
    user.save()
    .then(function (result) {
        console.log(result);
        res.json({message:'backend saved!'});
    });
}

function do_update(req, res) {
    console.log('updating user');
    console.log(req.body);
    var update = {
        $set:{
            name: req.body.name,
            gender: req.body.gender,            
            job: req.body.job
        }
    };
    USERCLASS.findByIdAndUpdate(req.body._id, update)
    .then(function (result) {
        console.log(result);
        res.json({message: 'backend updated!'});
    });
}

function do_delete(req, res) {
    console.log('deleting user');
    console.log(req.params);
    USERCLASS.findByIdAndRemove(req.params._id)
    .then(function (result) {
        console.log(result);
        res.json({message: 'backend deleted!'});
    });
}