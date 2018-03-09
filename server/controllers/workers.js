const Workers = require('../models/workers');

// Create endpoint /api/workers for POSTS
exports.postWorker = function(req, res) {
  // Create a new instance of the Worker model
  var worker = new Workers();

  // Set the worker properties that came from the POST data
  worker.fname = req.body.fname;
  worker.lname = req.body.lname;
  worker.address = req.body.address;

  // Save the worker and check for errors
  worker.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Worker Saved!', data: worker });
  });
};

// Create endpoint /api/workers for GET
exports.getWorkers = function(req, res) {
  // Use the Workers model to find all workers
  Workers.find(function(err, workers) {
    if (err)
      res.send(err);

    res.json(workers);
  });
};

// Create endpoint /api/workers/:worker_id for GET
exports.getWorker= function(req, res) {
  // Use the Workers model to find a specific worker
  Workers.findById(req.params.worker_id, function(err, worker) {
    if (err)
      res.send(err);

    res.json(worker);
  });
};

// Create endpoint /api/workers/:worker_id for PUT
exports.putWorker= function(req, res) {
  // Use the Worker model to find a specific worker
  Worker.findById(req.params.worker_id, function(err, worker) {
    if (err)
      res.send(err);

    // Update the existing worker details
    worker.fname = req.body.fname;
    worker.lname = req.body.lname;
    worker.address = req.body.address;

    // Save the worker and check for errors
    worker.save(function(err) {
      if (err)
        res.send(err);

      res.json(worker);
    });
  });
};

// Create endpoint /api/workers/:worker_id for DELETE
exports.deleteWorker = function(req, res) {
  // Use the Workers model to find a specific worker and remove it
  Workers.findByIdAndRemove(req.params.worker_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Worker deleted!' });
  });
};