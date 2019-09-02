const mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

let url = "mongodb://localhost:27017/cooldb";

const Tasks = require('../models/task.js');
const Developers = require('../models/developer.js');

mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log("Could not connect");
        throw err;
    } else {
        console.log("Connected to cooldb");
    }
});

/**
 * Getters
 */

/**
 * Get Home Page
 */
router.get('/', function (req, res) {
    res.render('index.html')
});

/**
 * New Tasks Page
 */
router.get('/newTask', function (req, res) {
    Developers.find({}, function (err, d) {
        res.render('newTask.html', {developers: d});
    });
});

/**
 * Remove Tasks Page
 */
router.get('/removeTask', function (req, res) {
    Tasks.find({}, function (err, d) {
        res.render("removeTask.html", {tasks: d});
    });
});


/**
 * List Tasks Page
 */
router.get('/listTasks', function (req, res) {
    Tasks.find({}, function (err, d) {
        res.render("listTasks.html", {tasks: d});
    });
});

/**
 * List Developers Page
 */
router.get('/listDeveloper', function (req, res) {
    Developers.find({}, function (err, d) {
        res.render("listDevelopers.html", {developers: d});
    });
});

/**
 * Add new Developer Page
 */
router.get('/addDeveloper', function (req, res) {
    res.render('newDeveloper.html');

});
/**
 * Get Update Tasks Page
 */
router.get("/updateTask", function (req, res) {
    Tasks.find({}, function (err, d) {
        res.render('updateTask.html', {tasks: d});
    });
});

/**
 * Remove Complete Tasks Page
 */
router.get("/removeComplete", function (req, res) {
    Tasks.find({'status':'Complete'}, function (err, d) {
        if (err) throw err;
        res.render('removeCompleteTasks.html', {tasks: d});
    });
});


/**
 * Post
 */

/**
 * Remove Task
 */
router.post('/removetask', function (req, res) {
    let id = new mongoose.Types.ObjectId(req.body.taskid);
    Tasks.deleteOne({_id: id}, function (err) {
        if (err) throw err;
    });
    res.redirect('/listTasks');
});

/**
 * Update Task
 */
router.post("/updatetask", function (req, res) {
    let id = new mongoose.Types.ObjectId(req.body.taskid);
    Tasks.updateOne({_id: id}, {$set: {'status': req.body.status}}, function (err) {
        if (err) throw err;
    });
    res.redirect('/listTasks');
});

/**
 * Add Task
 */
router.post('/addtask', function (req, res) {
    let task = new Tasks({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        due: req.body.due,
        desc: req.body.desc,
        developer: req.body.asignee,
        status: req.body.status
    });
    task.save(function (err) {
        if (err) throw err;
        console.log('Task successfully added to DB');
    });
    res.redirect('/listTasks');
});

/**
 * Add Developer
 */
router.post('/addDeveloper', function (req, res) {
    let developer = new Developers({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: req.body.name,
            surname: req.body.surname
        },
        level: req.body.level,
        address: {
            state: req.body.state,
            suburb: req.body.suburb,
            street: req.body.street,
            unit: req.body.unit
        }
    });
    developer.save(function (err) {
        if (err) throw err;
        console.log("Developer successfully added to DB");
    });
    res.redirect('/listDeveloper');
});

/**
 * Remove Complete
 */
router.post('/removeComplete', function(req, res){
    Tasks.deleteMany({'status':'Complete'}, function (err) {
        if (err) throw err;
    });
    res.redirect('/listTasks');
});

module.exports = router;

