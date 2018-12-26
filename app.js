const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const formidable = require('formidable');
const PORT = process.env.PORT || 8000;
const fs = require('fs');
const path = require('path');
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
	console.log(req);
});
app.get('/headers',(req,res)=>{
	let s = '';
	for(let headerName in req.headers)
    {
        s+=headerName+": "+ req.headers[headerName]+"\n";
    }
    console.log(s);
	res.set('Content-type','text/plain');
    res.send(s);

});

app.get('/query',(req,res)=>{
   res.set('Content-type','text/plain');
   res.send(req.query);
   console.log(req.query);
});

app.post('/body',(req,res)=>{
   res.set('Content-type','text/plain');
   res.send(req.body);
   console.log(req.body);
});

app.get('/additional',(req,res)=>{
    let s = '';

    s+='ip address: '+req.ip;
    s+='\npath: '+req.path;
    s+='\nhost: '+req.hostname;
    s+='\nxhr: '+req.xhr;
    s+='\nprotocol: '+req.protocol;
    s+='\nurl(path and querystring only): '+req.url;
    s+='\ncookies: '+ req.cookies;
    s+='\nparams: ';
    for(let name in req.params)
    {
        if(req.params.hasOwnProperty(name))
        {
            s+='\n '+name+": "+ req.params[name];
        }
    }
    res.set('Content-type','text/plain');
    res.send(s);
});
app.post('/upload',(req,res)=>{
   let form = formidable.IncomingForm();
   form.parse(req,(err,fields,files)=>{
       if(err) throw err;
   });
   form.on('fileBegin',(name,file)=>{
      file.path = path.join(__dirname,'static','uploads',file.name);
   });
   form.on('file',(name,file)=>{
      console.log(`Got file: ${file.name}`);
      res.json({status:'success'});
   });
});
app.listen(PORT,()=>{
	console.log(`Server listening on port: ${PORT}`);
});