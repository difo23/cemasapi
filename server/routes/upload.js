const express = require('express');
const app = express();
const _ = require('underscore');
var multer  = require('multer');

xlsxj = require("xlsx-to-json");

var upload = multer({ dest: 'public/uploads/' })

var fs = require('fs')
var path = require('path')


app.post('/upload', upload.single('file'), function (req, res, next) {
    var {fileName} = storeWithOriginalName(req.file);
    
    if(fileName) {
        res.json({
        ok: true
      })
    }
  });

function storeWithOriginalName (file) {
    var fullNewPath = path.join(file.destination, file.originalname)
    var fullJSONPath = path.join(file.destination, file.originalname+'.json')
    fs.renameSync(file.path, fullNewPath)
    xlsxj({
      input: fullNewPath, 
      output: fullJSONPath 
    }, function(err, result) {
      if(err) {
        console.error(err);
      }else {
        console.log(result);
      }
    });    
    return {
      fileName: file.originalname
      }
}

module.exports = app;