/* app.js */

// require and instantiate express
var express = require('express')
const app = require('express')()
const fileUpload = require('express-fileupload');

var db = require('./db');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path')
app.use(express.static(__dirname));
util = require('util');
app.use(fileUpload());

bodyParser = require('body-parser');
app.use(bodyParser.json());
// var jsonParser = bodyParser.json()

// fake posts to simulate a database
const posts = [
  {
    id: 1,
    author: 'John',
    title: 'Templating with EJS',
    body: 'Blog post number 1'
  },
  {
    id: 2,
    author: 'Drake',
    title: 'Express: Starting from the Bottom',
    body: 'Blog post number 2'
  },
  {
    id: 3,
    author: 'Emma',
    title: 'Streams',
    body: 'Blog post number 3'
  },
  {
    id: 4,
    author: 'Cody',
    title: 'Events',
    body: 'Blog post number 4'
  }
]

// set the view engine to ejs
app.set('view engine', 'ejs')
app.use( express.static( "public" ) );

// blog home page
app.get('/', (req, res) => {
  // render `home.ejs` with the list of posts
  res.render('home', { posts: posts })
})

// blog post
app.get('/post/:id', (req, res) => {
  // find the post in the `posts` array
  const post = posts.filter((post) => {
    console.log(post);
    return post.id == req.params.id
  })[0]

  // render the `post.ejs` template with the post content
  res.render('post', {
    author: post.author,
    title: post.title,
    body: post.body
  });
})


app.post('/load', (req, res)=>{
  let sampleFile = req.files.sampleFile;
  
  sampleFile.mv('UploadedFiles/'+ sampleFile.name , function(err) {
    if (err){
      return res.status(500).send(err);
    } else {
      res.render('upload', {
        fileName: sampleFile.name,
        fileType: sampleFile.mimetype
      });
    }
  });
});


app.post('/endpointd', (req, res)=>{
// app.post('/testd', (req, res) => {
  var obj = {};
  console.log('body: ' + JSON.stringify(req.body));
  res.send(req.body);

  // console.log(req);
  // res.send('rec');
});

app.post('/endpoint', (req, res)=>{
// app.post('/testd', (req, res) => {
  var obj = {};
  console.log(req.body);
  console.log('body: ' + JSON.stringify(req.body));
  res.send(req.body);

});

var controllerPath = __dirname + '/controllers';
fs.readdirSync(controllerPath).forEach(function(file) {
    require(controllerPath + '/' + file);
});

app.get('/author', )



// var authorController = require('./controllers/author');
// app.get('/author', authorController.getAuthors);


app.post('/syed', (req, res)=>{
   console.log('Coming ');

   // create an incoming form object
  var form = new formidable.IncomingForm();
   files = [],
        fields = [];

      form.uploadDir = path.join(__dirname, '/UploadedFiles');
    // form.uploadDir = os.tmpdir();

    form
      .on('field', function(field, value) {
        console.log(field, value);
        fields.push([field, value]);
      })
      .on('file', function(field, file) {
        console.log(field, file);
        files.push([field, file]);
      })
      .on('end', function() {
        console.log('-> upload done');
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received fields:\n\n '+util.inspect(fields));
        res.write('\n\n');
        res.end('received files:\n\n '+util.inspect(files));
      });
      console.log(fields);
      console.log('files are -- '); 
      console.log(files);
      console.log('this is something ');
    form.parse(req);


  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/UploadedFiles');

 console.log('before');





  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  var n = '';
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    n = file.name;
  });
    
    console.log(n);



});


app.listen(8080)

console.log('listening on port 8080')