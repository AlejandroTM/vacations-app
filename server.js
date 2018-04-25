//Install express server
const express = require('express');
const path = require('path');

const app = express();

console.log(__dirname);
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.get('/google39b2f84f5b94bce9.html', function(){
    res.sendFile(path.join(__dirname+'/public/google39b2f84f5b94bce9.html'));
})
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);