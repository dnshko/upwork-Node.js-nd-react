const express       = require('express');
const MongoClient   = require('mongodb').MongoClient;
const mongoose   = require('mongoose');
const bodyParser    = require('body-parser');
const db            = require('./models/db');
const CircularJSON = require('circular-json');
const otp1            = require('./models/otp');
const driverdetails1  = require('./models/driverdetails');

const admin1  = require('./models/admin');

const driver1  = require('./models/driver');
const url = 'mongodb://localhost:27017/';
 const databasename = "Truck_Driver";
const url1 = 'mongodb://localhost:27017/Truck_Driver';
const app           = express();
const port          = 3000;
var fs = require('fs');
var util = require('util');
var multer = require('multer');
const Cryptr = require('cryptr');

var crypto = require('crypto');
//var forms1 = multer();
//app.use(forms1.array()); 
//const jwt = require('jsonwebtoken');


app.use(express.static('public'));

const { body, validationResult } = require('express-validator');


const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
 let iv = Buffer.from(text.iv, 'hex');
 let encryptedText = Buffer.from(text.encryptedData, 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}





var ObjectId = require('mongodb').ObjectID;
//var gridfsstorage = require('multer-gridfs-storage');
//var grid = require('gridfs-stream');
//var methodoverride = require('method-override');
var path = require('path');
var storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      
        cb(null, file.originalname)
    }
});


const conn = mongoose.createConnection(url1, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


//let gfs;
//conn.once("open", () => {
  // init stream
  // gfs = new mongoose.mongo.GridFSBucket(conn.db, {
 //   bucketName: "Upload"
 // });
//});


/*var storage = new gridfsstorage({
    url: url1,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];
  
      if (match.indexOf(file.mimetype) === -1) {
        const filename = `${Date.now()}-bezkoder-${file.originalname}`;
        return filename;
      }
  
      return {
        bucketName: "Upload",
        filename: `${Date.now()}-bezkoder-${file.originalname}`
      };
    }
  });
  */
 const maxSize = 2 * 1024 * 1024;
  var upload12= multer({ storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        //return cb.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"Only .png, .jpg and .jpeg format allowed!"} });
       
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  
  }).fields(
    [
        {
        name:'DLPhoto',
        maxCount:1
        },
        {
       name:'ChequeImage', maxCount:1
        },
       
    ]
);



  //var uploadFilesMiddleware = util.promisify(uploadFile);


/*const storgae = new gridfsstorage
({
url:url1,
options: { useNewUrlParser: true, useUnifiedTopology: true },
file:(req,file)=>{
    return new Promise((resolve,reject)=>
    {
        crypto.randomBytes(16,(err,buf) =>
        {
           
            const filename= buf.toString(hex)+path.extname(file.originamname);
            const fileinfo=
            {
                filename:filename,
                bucketName:'Upload'
            };
            resolve(fileInfo);
        
        });
    });
}
});
*/

 
//var upload = multer({ storgae });

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(express.json());  

//app.use(methodoverride('_method'));  
var formidable = require('formidable');
//const { captureRejectionSymbol } = require('multer-gridfs-storage');
const { Mongoose } = require('mongoose');

/*/image/:filename*/

/*app.get("/image/:filename", (req, res) => {
    // console.log('id', req.params.id)
    const file = gfs
      .find({
        filename: req.params.filename
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "no files exist"
          });
        }
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      });
  });*/
/*app.get('/image', (req,res)=>{ 



    //var upl =  driverdetails1({dlPhoto: req.file.buffer.data});//creating object the mongoose schema
  /*  driverdetails1.find().toArray(function(err,files) {
         if (err) {
             console.log(err);
         }
         res.json(files);
     });*/

    // const fromDb =  driverdetails1.findOne({ _id: '608003f8e529ae5c38436cf7' });

     // Unlike the MongoDB driver, Mongoose gives you a buffer back.
   //  console.log(fromDb.buf.toString('hex')); 
     //MongoClient.connect(url).then((client) => {
       // const connect = client.db(databasename)
       /* connect.collection("driverdetails").files.findOne({filename:req.params.filename},(err, files)=>
         */
  //      gfs.files.find().toArray((err, files)=>
        
    //     {   
      //       res.json(files);
           /* if(!files && files.length===0) {
                res.json("no file exit")
            }

            if(files.contentType=== "image/png" || files.contentType === "image/jpg")
             {
                var readstream=driverdetails1.createReadStream(options)
            readstream.pipe(response);
            
            }*/
       // });
    // }).catch((err) => {
      
     //   console.log(err.Message);
     //})

//});

/*app.post('/DriverDetails', (req,res)=>{ 


    const uploadFile = async (req, res) => {
        try {
          await upload(req, res);
      
          console.log(req.file);
          if (req.file == undefined) {
            return res.send(`You must select a file.`);
          }
      
          return res.send(`File has been uploaded.`);
        } catch (error) {
          console.log(error);
          return res.send(`Error when trying upload image: ${error}`);
        }
      };
*/
    //res.send(req.file);
  /* upload(req,res,(err)=>
   {
res.json({file: req.file});

   });
//res.send(req.file);

/*var upl =  driverdetails1({dlPhoto: req.file.buffer});//creating object the mongoose schema
upl.save(function(err,docs) {
     if (err) {
         console.log(err);
     }
     res.send(docs);
 });
*/
//console.log("hello");

/*var obj = {
  
    dlPhoto: {
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: 'image/png'
    }
}
*/



/*driverdetails.create(obj, (err, item) => {
    if (err) {
        console.log(err);
    }
    else {
        // item.save();
        res.send('save');
    }
});
*/

//res.send(req.file.originalname);
/*var upl =  driverdetails1({dlPhoto: req.file.originalname});//creating object the mongoose schema
upl.save(function(err,docs) {
     if (err) {
         console.log(err);
     }
     res.send(docs);
 });
  // });

 
 

    /*var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received upload:\n\n');



        driverdetails1.save(util.inspect({
            fields: fields,
            files: files

            
        }));
    });*/


//console.log(req.body.Drivername);

   // const driverdetails =  driverdetails1(req.body);
  
    
   // driverdetails.save(function(){
     //   res.send(driverdetails);
    
   // })
   //req.files[0].filename;
  // console.log(req.files[0]);
        
  


   // });


/*app.post('/GetOtp', (req,res)=>{

const otp =  otp1(req.body);


otp.save(function(){
    res.send(otp);

})
    
});
*/




app.post(
  '/SubmitDetails', upload12,
  body('DriverName').notEmpty()
  .withMessage('DriverName should not be empty'
  ),
  body('TruckNumber').isLength({ min:9, max:10 })
                       .withMessage('must be 9-10 chars long')
                       .custom(value => !/\s/.test(value))
                       .withMessage('No spaces are allowed in the Truck Number')
                      
                       .matches(/^[a-zA-Z]{2}[A-Z0-9]{3,4}[0-9]{4}$/)
                        .withMessage('First Two Character should be Alphbaet and last 4 should be Number'
                        ),

                        body('DLNumber').matches(/^[a-zA-Z0-9]{16,16}$/)
                         .withMessage('DLNumber should be 16 digit alphanumeric Charcater'
                         ),
                         body('BankName').notEmpty()
                         .withMessage('BankName should not be empty'
                         ),
                         body('Name').notEmpty()
                         .withMessage('Name” should not be empty'
                         ),
                         body('BankAccountNumber').notEmpty()
                         .withMessage('BankAccountNumber should not be empty')
                         .isLength({ max:20 })
                         .withMessage('BankAccountNumber” should not be maximum 20 Charcater'
                         )
                         
                         ,

                         body('IFSCCode').isLength({ min:11, max:11 })
                         .withMessage('must be 11 chars long')
                         .custom(value => !/\s/.test(value))
                         .withMessage('No spaces are allowed in the IFSCCode')
                        
                         .matches(/^[a-zA-Z]{4}[0-9]{7,7}$/)
                          .withMessage('First Four Character should be Alphbaet and rest should be Number'
                          ),
                          body('Branch').notEmpty()
                          .withMessage('Branch should not be empty')
                          
                          ,
                          body('_id').notEmpty()
                         .withMessage('_id should not be empty')
                         ,
                         body('session_token').notEmpty()
                         .withMessage('token should not be empty')
                         ,

                         
                   
  

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array()[0].param);
     
      //errorMessage(errors.array()[0].param)
      return res.status(400).json(errorMessage(errors.array()[0].param,errors.array()[0].msg));
    }


function errorMessage(errorType,msg)
{
if(errorType=='BankName')
{
  var invalid_obj={
    "Data":{
        "Otp":''
    },
    "Status":{
        "Code":401,
        "Message":msg
    }
}
return  invalid_obj;
}

if(errorType=='session_token')
{
  var invalid_obj={
    "Data":{
        "Otp":''
    },
    "Status":{
        "Code":401,
        "Message":msg
    }
}
return  invalid_obj;
}


if(errorType=='_id')
{
  var invalid_obj={
    "Data":{
        "Otp":''
    },
    "Status":{
        "Code":401,
        "Message":msg
    }
}
return  invalid_obj;
}

if(errorType=='Branch')
{
  var invalid_obj={
    "Data":{
        "Otp":''
    },
    "Status":{
        "Code":401,
        "Message":msg
    }
}
return  invalid_obj;
}

if(errorType=='IFSCCode')
{
  var invalid_obj={
    "Data":{
        "Otp":''
    },
    "Status":{
        "Code":401,
        "Message":msg
    }
}
return  invalid_obj;
}


if(errorType=='BankAccountNumber')
{
  var invalid_obj={
    "Data":{
        "Otp":''
    },
    "Status":{
        "Code":401,
        "Message":msg
    }
}
return  invalid_obj;
}


if(errorType=='Name')
{
  var invalid_obj={
    "Data":{
        "Otp":''
    },
    "Status":{
        "Code":401,
        "Message":msg
    }
}
return  invalid_obj;
}


if(errorType=='DLNumber')
{
  var invalid_obj={
    "Data":{
        "Otp":''
    },
    "Status":{
        "Code":401,
        "Message":msg
    }
}
return  invalid_obj;
}


if(errorType=='TruckNumber')
{
  var invalid_obj={
    "Data":{
        "Otp":''
    },
    "Status":{
        "Code":401,
        "Message":msg
    }
}
return  invalid_obj;
}


if(errorType=='DriverName')
{
  var invalid_obj={
    "Data":{
        "Otp":''
    },
    "Status":{
        "Code":401,
        "Message":msg
    }
}
return  invalid_obj;
}


}


    var dname= req.body['DriverName']; 
 var tnumber= req.body['TruckNumber'];
 
 var dlnumber= req.body['DLNumber'];
 var name= req.body['Name'];
 var bname= req.body['BankName'];
 var baccountnumber= parseInt(req.body['BankAccountNumber']);
 var ifsccode= req.body['IFSCCode'];
 var driverid= req.body['_id'];
 
 var token= req.body['session_token'];
 var branch= req.body['Branch'];

 var driver_object_id = new ObjectId(driverid);

 


  
  MongoClient.connect(url).then((client) =>
     {
       const connect = client.db(databasename)
       connect.collection("drivers").find({_id: driver_object_id}).count(function(err, count)
        {   
          if(err) 
          {
              return res.status(401).json({ "Data":{},"Status":{"code":401,"message":"invalid error"} });
          }
          console.log(count);
        
          if(count > 0)
          {
            connect.collection("drivers").find().toArray(function(err, data) 
              { 
                  var db_token= data[0].token;
                  console.log(db_token);
                  var hasSubmittedDetailsStatus= data[0].hasSubmittedDetails;


                  if(db_token!=token)
                  {
                    return res.status(401).json({ "Data":{},"Status":{"code":401,"message":"token not match"} });
       
                  }
                  else
                  {
                    if(hasSubmittedDetailsStatus)
                    {
                      return res.status(401).json({ "Data":{},"Status":{"code":401,"message":"Details Alraedy Exist"} });
       
                    }
                    else
                    {

                      
                      if(typeof req.files.DLPhoto == "undefined")
                      {
                       return res.status(401).json({ "Data":{},"Status":{"code":401,"message":"Plz Upload DlPhoto"} });
        
                      }else{
                
                     var dlPhoto1 =req.files.DLPhoto[0].originalname;
                      }


                     
                 

                     if(typeof req.files.ChequeImage == "undefined")
                     {
                      return res.status(401).json({ "Data":{},"Status":{"code":401,"message":"Plz Upload chequeImage"} });
       
                     }
                     else{
                      var chequeImage1 =req.files.ChequeImage[0].originalname;

                     }
                    


                 // console.log({driverId:driverid.toString(),driverName:dname,truckNumber:tnumber,dlNUmber:dlnumber,accountName:name,accountNumber:baccountnumber,bankName:bname,ifscCode:ifsccode,bankBranch:branch,sessionToken:token,created_at: new Date(Date.now()).toISOString(),updated_at: new Date(Date.now()).toISOString()});
                      const driverdetails =  driverdetails1({driverId:driverid.toString(),dlPhoto:dlPhoto1,chequeImage:chequeImage1,driverName:dname,truckNumber:tnumber,dlNUmber:dlnumber,accountName:name,accountNumber:baccountnumber,bankName:bname,ifscCode:ifsccode,bankBranch:branch,sessionToken:token,created_at: new Date(Date.now()).toISOString(),updated_at: new Date(Date.now()).toISOString()});
                      driverdetails.save()
                      .then(
                        () => {
                        //  console.log(driver);
                        if(err){
                        return res.status(401).json({ "Data":{},"Status":{"code":401,"message":"invalid_number"} });
                        }

                        driver1.update({'_id':driver_object_id},   {$set:{hasSubmittedDetails:true}},function(err){
                          //  console.log(driver);
                           res.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"invalid_token"} });
                 
                        })

                        return res.status(200).json({ "Data":{},"Status":{"code":200,"message":"success"} });
                                            

                      })

        


                    }
                  }
         
              });
            }
            else
            {  return res.status(401).json({ "Data":{},"Status":{"code":401,"message":"driver not exist"} });
       
              
            }


      });
  }).catch((err) => {
    
      return res.status(401).json({ "Data":{},"Status":{"code":401,"message":"error in details inserting"} });
       
   })

  },
);














app.post(
  '/OtpVerification', 
  body('MobileNumber').isLength({ min:10, max:10 })
                       .withMessage('must be 10 chars long'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({  "Data":{"otp":''},"Status":{"code":401,"message":"Invalid number"} });
    }

 var mnum1= req.body['MobileNumber'];
 
 var cipher = crypto.createCipher(algorithm,'');  
 var mnum = cipher.update(mnum1.toString(), 'utf8', 'hex') + cipher.final('hex');
 console.log(mnum);
 
 console.log(mnum);
 var otp= req.body['OTP'];
 console.log(otp);

    MongoClient.connect(url).then((client) =>
     {
       const connect = client.db(databasename)
       connect.collection("drivers").find({mobile: mnum.toString()}).count(function(err, count)
        {   
          if(err) 
          {
              return res.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"invalid_number"} });
          }
         
          if(count > 0)
           {
             connect.collection("drivers").find({mobile: mnum.toString()}).toArray(function(err, data) 
               { 
                   
                 var driver_id=data[0]._id;
                 var hasSubmittedDetailsstatus=data[0].hasSubmittedDetails;

                
               connect.collection("otps").find({User:driver_id.toString()}).count(function(err, count) 
               {
                if(count > 0) 
                      {
                        connect.collection("otps").find({User:driver_id.toString()}).toArray(function(err, dataotp) {
                    
                           console.log(otp);
                           console.log("hello");
                          var db_otp=dataotp[0].otp;
                          var expireotp=dataotp[0].expireAt;
                          console.log(expireotp);
                          let currentDate = new Date().toISOString();
                          console.log(currentDate);
                          var date1 = new Date(expireotp);
                       var date2 = new Date(currentDate);


                         

                         if(otp!=db_otp)
                         {
                          return res.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"invalid OTP"} });
                         }
                         else
                         {
                           if(date1.getTime() > date2.getTime())
                           {
                          

                              if(hasSubmittedDetailsstatus)
                              {
                                return res.status(401).json({ "Data":{"":''},"Status":{"code":403,"message":"Submitted Details already exit "} });
                              }

                              else
                              {

                                var token=require('crypto').randomBytes(64).toString('hex')

                                
                                
                                //const driver =  driver1({token:token});
                               

                                driver1.update({'_id':ObjectId(driver_id.toString())},   {$set:{token:token,isVerified:true}},function(err){
                                  //  console.log(driver);
                                   res.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"invalid_token"} });
                         
                                })

                                var decipher = crypto.createDecipher(algorithm,'');
var decrypted = decipher.update(mnum, 'hex', 'utf8') + decipher.final('utf8');

console.log(decrypted);
                                var success_obj={
                                  "Data":{
                                    "_id":driver_id,
                                  "mobileNumber":decrypted,
                                  "session_token":token
      
                                      },
                                  "Status":{
                                      "Code":200,
                                      "Message":"Success"
                                  }
                                   }
                      
      
                                   res.status(200).json(success_obj);

                              }


                           }
                           else
                           {
                            return res.status(401).json({ "Data":{"otp":''},"Status":{"code":402,"message":"OTP Expired"} });
                        
                           }

                         }


                          /*var success_obj={
                          "Data":{
                          "Otp":dataotp[0].otp
                              },
                          "Status":{
                              "Code":200,
                              "Message":"Success"
                          }
                           }
                               */

                       /*   var invalid_obj={
                              "Data":{
                                  "Otp":''
                              },
                              "Status":{
                                  "Code":401,
                                  "Message":"Invalid NUmber"
                              }
                          }
                          */

                         /* if(err)
                          {
                              res.json(invalid_obj);   
                          }
                          else{console.log(success_obj);
                          res.send(success_obj)}*/
                          });
                      }
                  else
                  {
                      //var randomotp = Math.floor(1000 + Math.random() * 9000);
                    //  const otp =  otp1({User:driver_id,otp:randomotp,expireAt: new Date(Date.now()+1).toISOString()});
                      //        otp.save(function(err){
                                 // if(err)
                                  //{
                                      return res.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"invalid Number"} });
       
                                 // }
                              
                            //  })
                  }
            });
         });
       }
          else
          {
              //console.log("No Found Records.");
             // const driver =  driver1({mobile:mnum,isVerified:true,hasSubmittedDetails:false,created_at: new Date(Date.now()).toISOString()});
             // driver.save(function(err){
                //  console.log(driver);
                return res.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"invalid_number"} });
       
             // })

           
          }


      });
  }).catch((err) => {
    
      return res.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"invalid_number"} });
       
   })

  },
);




app.get(
    '/GetOtp', 
    body('MobileNumber').isLength({ min:10, max:10 })
                         .withMessage('must be 10 chars long'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({  "Data":{"otp":''},"Status":{"code":401,"message":"Invalid number"} });
      }
  
   var mnum1= req.body['MobileNumber'];

  var cipher = crypto.createCipher(algorithm,'');  
var mnum = cipher.update(mnum1, 'utf8', 'hex') + cipher.final('hex');

      MongoClient.connect(url).then((client) =>
       {
         const connect = client.db(databasename)
         connect.collection("drivers").find({mobile: mnum}).count(function(err, count)
          {   
            if(err) 
            {
                return res.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"invalid_number"} });
            }
           
            if(count > 0)
             {
              return res.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"Driver Already EXist"} });
         
            
         }
            else
            {
                //console.log("No Found Records.");
                const driver =  driver1({mobile:mnum,isVerified:false,hasSubmittedDetails:false,token:'',created_at: new Date(Date.now()).toISOString()});
                driver.save().
                  //  console.log(driver);
                 // if(err){
                 // res.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"invalid_number"} });
                 // }
                  
               // })


                then(
                  () => {
                    
                    connect.collection("drivers").find({mobile:mnum}).toArray(function(err, data) 
                    { 
                     
                     
                      var driver_id=data[0]._id;
                    connect.collection("otps").find({User:driver_id.toString()}).count(function(err, count) 
                    {
                     if(count > 0) 
                           {
    
                            return res.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"Otp Already EXist"} });
           
                       
                           }
                       else
                       {
                           var randomotp = Math.floor(1000 + Math.random() * 9000);
                           const otp =  otp1({User:driver_id,otp:randomotp,expireAt: new Date(Date.now()+1).toISOString()});
                                   otp.save().
                                       
                                   then(
                                    () => {

                                      connect.collection("otps").find({User:driver_id.toString()}).toArray(function(err, dataotp) 
                                   {
                                   var success_obj={
                                     "Data":{
                                     "Otp":dataotp[0].otp
                                         },
                                     "Status":{
                                         "Code":200,
                                         "Message":"Success"
                                     }
                                      }
                         
         
                                     var invalid_obj={
                                         "Data":{
                                             "Otp":''
                                         },
                                         "Status":{
                                             "Code":401,
                                             "Message":"Invalid NUmber"
                                         }
                                     }
         
                                     if(err)
                                     {
                                         res.json(invalid_obj);   
                                     }
                                     else{
                                       console.log(success_obj);
                                       res.send(success_obj);
                                   // res.send(success_obj)}
                                      //return callBack(success_obj);
                                      return JSON.parse(JSON.stringify(success_obj));
                                     }
                                     });
                                    });
    
                                   
    
    
    
    
    
                       }
                 });
              });




                  }
                )
                     
              


               












                
             
            }


        });
    }).catch((err) => {
      
        return res.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"invalid_number"} });
         
     })

    },
);

app.get('/test12', (req,res)=>{ 

  var password='12345';
  var cipher = crypto.createCipher(algorithm,'');  
  var password = cipher.update(password.toString(), 'utf8', 'hex') + cipher.final('hex');

  var mobile=9090909090;
  var cipher = crypto.createCipher(algorithm,'');  
  var mobile = cipher.update(mobile.toString(), 'utf8', 'hex') + cipher.final('hex');
  var token=require('crypto').randomBytes(64).toString('hex');
  
   
  const admin =  admin1({mobile:mobile,email:'demo@gmail.com',password:password,session_token:token});
  admin.save().
      
  then(
   () => {
console.log("save");
   });


/*const cryptr = new Cryptr('myTotalySecretKey');
 
const encryptedString = cryptr.encrypt('bacon');
const decryptedString = cryptr.decrypt(encryptedString);
 
console.log(encryptedString); 

  //var hw = encrypt("Some serious stuff")
  //console.log(hw)
  //console.log(decrypt(hw))
    
  //var hw = encrypt(Buffer.from("Some serious stuff","utf-8"))
  //console.log(hw);
  //console.log(decrypt(hw));
 // var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
  //var key = 'password';
  var text = 'I love kittens';
  var cipher = crypto.createCipher(algorithm,'');  
var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
console.log(encrypted);
var decipher = crypto.createDecipher(algorithm,'');
var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');

console.log(decrypted);
*/
});


app.post(
  '/AdminLogin',
  body('EmailId').notEmpty()
  .withMessage('EmailId should not be empty'),
 body('Password').notEmpty()
.withMessage('Password should not be empty'),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array()[0].param);
     
      //errorMessage(errors.array()[0].param)
      return res.status(400).json(errorMessage(errors.array()[0].param,errors.array()[0].msg));
    }


    function errorMessage(errorType,msg)
    {
    if(errorType=='EmailId')
    {
      var invalid_obj={
        "Data":{
            "session_token":'',
            "Id":''
        },
        "Status":{
            "Code":401,
            "Message":msg
        }
    }
    return  invalid_obj;
    }

    if(errorType=='Password')
    {
      var invalid_obj={
        "Data":{
            "session_token":'',
            "Id":''
        },
        "Status":{
            "Code":401,
            "Message":msg
        }
    }
    return  invalid_obj;
    }
  }


  var email= req.body['EmailId'];
 
 

  var password1= req.body['Password'];
 
  var cipher = crypto.createCipher(algorithm,'');  
  var password = cipher.update(password1.toString(), 'utf8', 'hex') + cipher.final('hex');

 
 
   
   MongoClient.connect(url).then((client) =>
      {
        const connect = client.db(databasename)
        connect.collection("admins").find({email: email}).count(function(err, count)
         {   
          if(count > 0) 
          {
            connect.collection("admins").find({password: password}).count(function(err, count)
            { 
              if(count > 0) 
              {
                connect.collection("admins").find({email: email,password: password}).toArray(function(err, data) 
           
            
                   {

                    if(err)
                    {
                      return res.status(401).json({ "Data":{"session_token":'',"Id":''},"Status":{"Code":401,"message":"invalid data"} });
 
                    }


                   var token= data[0].session_token;
                   var id= data[0]._id;
                  //  consol

                  return res.status(200).json({ "Data":{"session_token":token,"Id":id},"Status":{"Code":200,"message":"Success"} });


                  });

              }
              else
              {
                return res.status(401).json({ "Data":{"session_token":'',"Id":''},"Status":{"Code":401,"message":"invalid password"} });

              }

            });


          
      
          }
          else
          {
            return res.status(401).json({ "Data":{"session_token":'',"Id":''},"Status":{"Code":401,"message":"invalid email"} });

      
          }

         });
         });

  });

    app.listen(port,()=>{
        console.log('we are live at '+ port);
    });



