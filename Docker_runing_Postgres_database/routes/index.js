var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/documents', db.getAllDocuments);
router.get('/api/documents/:id', db.getSingleDocument);
router.post('/api/documents', db.createDocument);
router.put('/api/documents/:id', db.updateDocument);
router.delete('/api/documents/:id', db.removeDocument);

module.exports = router;
