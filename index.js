
//Ici Erki
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
// var S3Adapter = require('parse-server').S3Adapter;
var path = require('path');

//var databaseUri = "mongodb+srv://erki:erki@cluster0.wnloab9.mongodb.net/?retryWrites=true&w=majority";

if (!databaseUri) {
	console.log('DATABASE_URI not specified, falling back to localhost.');
}
const masterKey = 'erki-master';
const appId = 'erki';
const jsKey = 'erki-jsKey';
const serverUrl = 'http://localhost:3000/api';
const databaseURI = "mongodb+srv://erki:erki@cluster0.wnloab9.mongodb.net/?retryWrites=true&w=majority";
const serverConfig = {
  databaseURI : databaseURI,
  appId : appId,
  cloud : '/cloud/main.js',
  javascriptKey : jsKey,
  masterKey : masterKey,
  serverURL : serverUrl,
  appName : 'ErkiApp'
};

// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey
const api = new ParseServer(serverConfig);
var app = express();
var dashboard = new ParseDashboard({
	apps: [
	  {
		serverURL: "http://localhost:3000/api",
		appId: "erki",
		masterKey: "erki-master",
		appName: "MyApp"
	  }
	]
  });
// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
	res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function (req, res) {
	res.sendFile(path.join(__dirname, '/public/test.html'));
});



var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
	console.log('parse-server-example running on port ' + port + '.');
});


// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);