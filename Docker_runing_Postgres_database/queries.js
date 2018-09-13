var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = {
	database:	"documents",
	user:		"docker",
	password:	"docker",
	host:		"172.17.0.2",
	port:		5432,
	max:		10,
	idleTimeoutMillis: 30000}

//var connectionString = 'postgres://172.17.0.2:5432/documents';
var db = pgp(connectionString);

// Get all documents
function getAllDocuments(req, res, next) {
	db.any('select * from docs')
	  .then(function (data) {
		  res.status(200)
		  .json({
			  status: 'success',
			  data: data,
			  message: 'Retrieved ALL documents'
			});
	  })
	.catch(function (err) {
		return next(err);
	});
}

//Get single document
function getSingleDocument(req, res, next) {
  var docID = parseInt(req.params.id);
  db.one('select * from docs where id = $1', docID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE document'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//Create document
function createDocument(req, res, next) {
  db.none('insert into docs(title, text)' +
      'values(${title}, ${text})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one document'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//Update document
function updateDocument(req, res, next) {
  db.none('update docs set title=$1, text=$2 where id=$3',
    [req.body.title, req.body.text, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated document'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//Remove document
function removeDocument(req, res, next) {
  var docID = parseInt(req.params.id);
  db.result('delete from docs where id = $1', docID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} document`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllDocuments: getAllDocuments,
  getSingleDocument: getSingleDocument,
  createDocument: createDocument,
  updateDocument: updateDocument,
  removeDocument: removeDocument
};
