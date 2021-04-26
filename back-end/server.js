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
var cors = require('cors');
app.use(cors());
const { body, validationResult } = require('express-validator');
const algorithm = 'aes-256-cbc';







var ObjectId = require('mongodb').ObjectID;
var path = require('path');



const conn = mongoose.createConnection(url1, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(express.json());  
var formidable = require('formidable');
const { Mongoose } = require('mongoose');

app.get('/test12', (req,res)=>{ 

 var token=require('crypto').randomBytes(64).toString('hex');

 var password='12345';
 var cipher = crypto.createCipher(algorithm,'');  
 var password = cipher.update(password.toString(), 'utf8', 'hex') + cipher.final('hex');

   

  const admin =  admin1({email:'demo2@gmail.com',password:password,session_token:token
  

});
  admin.save().
      
  then(
   () => {
console.log("save");
   });
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







  app.get(
    '/GetOtp',
    body('MobileNumber').notEmpty()
    .withMessage('MObile should not be empty'),
    body('MobileNumber').isLength({ min:10, max:10 })
    .withMessage('MObile Number should be 10 digits'),
  

  
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array()[0].param);
       
        //errorMessage(errors.array()[0].param)
        return res.status(400).json(errorMessage(errors.array()[0].param,errors.array()[0].msg));
      }
  
  
      function errorMessage(errorType,msg)
      {
      if(errorType=='MobileNumber')
      {
        var invalid_obj={
          "Data":{
              "otp":''
            
          },
          "Status":{
              "Code":401,
              "Message":msg
          }
      }
      return  invalid_obj;
      }
  
    
    }
  
  
    var mobile1= req.body['MobileNumber'];
    var cipher = crypto.createCipher(algorithm,'');  
    var mobile = cipher.update(mobile1.toString(), 'utf8', 'hex') + cipher.final('hex');
  
   
   
     
     MongoClient.connect(url).then((client) =>
        {
          const connect = client.db(databasename)
          connect.collection("admins").find({mobile: mobile}).count(function(err, count)
           {   
            if(count > 0) 
            {
            
                  connect.collection("admins").find({mobile: mobile}).toArray(function(err, data) 
                     {
  
                      if(err)
                      {
                        return res.status(401).json({ "Data":{"otp":''},"Status":{"Code":401,"message":"invalid data"} });
   
                      }
  
  
                     //var token= data[0].session_token;
                     var id= data[0]._id;
                     var randomotp = Math.floor(1000 + Math.random() * 9000);
                     const otp =  otp1({User:id,otp:randomotp,expireAt:new Date(Date.now()+1).toISOString()});
                     otp.save().
                         
                     then(
                      () => {
                   console.log("save");
                   return res.status(200).json({ "Data":{"otp":randomotp},"Status":{"Code":200,"message":"Success"} });
                  
                      });


                    //  consol
  
                   });
        
            }
            else
            {
              return res.status(401).json({ "Data":{"otp":''},"Status":{"Code":401,"message":"invalid number"} });
  
        
            }
  
           });
           });
  
    });



    app.get(
        '/ForgetPassword',
        body('MobileNumber').notEmpty()
        .withMessage('MObile should not be empty'),
        body('MobileNumber').isLength({ min:10, max:10 })
        .withMessage('MObile Number should be 10 digits'),

        body('NewPassword').notEmpty()
        .withMessage('NewPassword should not be empty'),
        body('OTP').notEmpty()
        .withMessage('OTP should not be empty'),
   


        (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            console.log(errors.array()[0].param);
           
            //errorMessage(errors.array()[0].param)
            return res.status(400).json(errorMessage(errors.array()[0].param,errors.array()[0].msg));
          }
      
      
          function errorMessage(errorType,msg)
          {
          if(errorType=='MobileNumber')
          {
            var invalid_obj={
              "Data":{
                  "":''
                
              },
              "Status":{
                  "Code":401,
                  "Message":msg
              }
          }
          return  invalid_obj;
          }



          if(errorType=='NewPassword')
          {
            var invalid_obj={
              "Data":{
                  "":''
                
              },
              "Status":{
                  "Code":401,
                  "Message":msg
              }
          }
          return  invalid_obj;
          }

          if(errorType=='OTP')
          {
            var invalid_obj={
              "Data":{
                  "":''
                
              },
              "Status":{
                  "Code":401,
                  "Message":msg
              }
          }
          return  invalid_obj;
          }
      
        
        }
      
      
        var mobile1= req.body['MobileNumber'];
        var cipher = crypto.createCipher(algorithm,'');  
        var mobile = cipher.update(mobile1.toString(), 'utf8', 'hex') + cipher.final('hex');
      
        var newpassword1= req.body['NewPassword'];
        var cipher = crypto.createCipher(algorithm,'');  
        var newpassword = cipher.update(newpassword1.toString(), 'utf8', 'hex') + cipher.final('hex');
      
        var otp= req.body['OTP'];
       
         
         MongoClient.connect(url).then((client) =>
            {
              const connect = client.db(databasename)
              connect.collection("admins").find({mobile: mobile}).count(function(err, count)
               {   
                if(count > 0) 
                {
                
                      connect.collection("admins").find({mobile: mobile}).toArray(function(err, data) 
                         {
      
         
      
      
                         //var token= data[0].session_token;
                         var id= data[0]._id;
                        


                          connect.collection("otps").find({User:id.toString(),otp:otp}).toArray(function(err, dataotp) 
                          {


                   

                            var dbotp= dataotp[0].otp;
                               console.log(dbotp);
                          
                            var expireotp=dataotp[0].expireAt;
                            console.log(expireotp);
                            let currentDate = new Date().toISOString();
                            console.log(currentDate);
                            var date1 = new Date(expireotp);
                         var date2 = new Date(currentDate);
                            if(dbotp==otp)
                            {
                                if(date1.getTime() > date2.getTime())
                                {

                                  admin1.update({'_id':ObjectId(id.toString())},   {$set:{password:newpassword}},function(err){
                                    //  console.log(driver);
                                    if(err){
                                     res.status(401).json({ "Data":{"":''},"Status":{"code":401,"message":"Paasword not reset"} });
                                    }
                                    res.status(401).json({ "Data":{"":''},"Status":{"code":200,"message":"Password reset"} });
                                   
  
                                  })

                                 
                                }
                                else
                                {
                                  return res.status(401).json({ "Data":{"":''},"Status":{"Code":401,"message":"OTP Expire"} });
         
                                }


             

                            }
                          else
                          {

                            return res.status(401).json({ "Data":{"":''},"Status":{"Code":401,"message":"Invalid OTP"} });
         
                          }


                          });
    
    
                        //  consol
      
                       });
            
                }
                else
                {
                  return res.status(401).json({ "Data":{"otp":''},"Status":{"Code":401,"message":"invalid number"} });
      
            
                }
      
               });
               });
      
        });





        app.post(
          '/DeletePlayerDetails',
          body('session_token').notEmpty()
          .withMessage('session token should not be empty'),
     
  
          body('_id').notEmpty()
          .withMessage('player id should not be empty'),
       
     
  
  
          (req, res) => {


           
 

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              console.log(errors.array()[0].param);
             
              //errorMessage(errors.array()[0].param)
              return res.status(401).json(errorMessage(errors.array()[0].param,errors.array()[0].msg));
            }
        
        
            function errorMessage(errorType,msg)
            {
            if(errorType=='session_token')
            {
              var invalid_obj={
                "Data":{
                    "":''
                  
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
                    "":''
                  
                },
                "Status":{
                    "Code":401,
                    "Message":msg
                }
            }
            return  invalid_obj;
            }
  
          }
          
          
        
        
          var token= req.body['session_token'];
          console.log(token);
         
         
          var playerid= req.body['_id'];

          console.log(playerid);
         
         
           
           MongoClient.connect(url).then((client) =>
              {
                const connect = client.db(databasename)
                connect.collection("driverdetails").find({driverId:playerid.toString()}).count(function(err, count)
                 {   
                  if(count > 0) 
                  {
                    connect.collection("driverdetails").find({driverId:playerid}).toArray(function(err, datad)
                    { 
                        var session_token= datad[0].sessionToken;
                        
               
                        if(session_token!=token)
                        {
                          return res.status(401).json({ "Data":{"":''},"Status":{"Code":401,"message":"authentication failed"} });
                       
                       }





                       connect.collection("driverdetails").remove({driverId:playerid},function(err){
                                    //  console.log(driver);
                                    if(err){
                                     res.status(401).json({ "Data":{"":''},"Status":{"code":401,"message":"Paasword not reset"} });
                                    }
                                    res.status(200).json({ "Data":{"":''},"Status":{"code":200,"message":"Deleted"} });
                                   
                                   
                                  });




                    });

                       
                              }
                            else
                            {
  
                              return res.status(401).json({ "Data":{"":''},"Status":{"Code":401,"message":"Details not exist"} });
           
                            }
  
  
                            });
                            
      
      
                          //  consol
        
                        
              
                 });
        
       
  
        });










        app.post(
          '/UpdatePlayerDetails',
          body('session_token').notEmpty()
          .withMessage('session token should not be empty'),
     
  
          body('_id').notEmpty()
          .withMessage('player id should not be empty'),
       
     
  
  
          (req, res) => {


           
 

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              console.log(errors.array()[0].param);
             
              //errorMessage(errors.array()[0].param)
              return res.status(401).json(errorMessage(errors.array()[0].param,errors.array()[0].msg));
            }
        
        
            function errorMessage(errorType,msg)
            {
            if(errorType=='session_token')
            {
              var invalid_obj={
                "Data":{
                    "":''
                  
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
                    "":''
                  
                },
                "Status":{
                    "Code":401,
                    "Message":msg
                }
            }
            return  invalid_obj;
            }
  
          }
          
          
        
        
          var token= req.body['session_token'];
          console.log(token);
         
         
          var playerid= req.body['_id'];

          //var mobile = req.body['MobileNumber'];
         // var dor = req.body['DateOfRegistration'];
          

         //var newDateOfRegistration=req.body['created_at'];
                                // var  MobileNumber=req.body['mobile'];
                                    var  newDriverName=req.body['DriverName'];
                                      var newTruckNumber=req.body['TruckNumber'];
                                      var newBankName=req.body['BankName'];
                                      var newDlNumber=req.body['DLNumber'];
                                      var  newBankAccountNumber=req.body['BankAccountNumber'];
                                    var   newIFSCCode=req.body['IFSCCode'];
                                       var newBranch=req.body['Branch'];
                                   var   newChequeImage1=req.body['ChequeImage'];

                                   var   newChequeImage1=  Buffer.from(newChequeImage1, 'base64');

                                    var   newDLPhoto1=req.body['DLPhoto'];

                                    var   newDLPhoto=  Buffer.from(newDLPhoto1, 'base64');

                                   //  var _id=req.body['_id'];
                                   
         
           
           MongoClient.connect(url).then((client) =>
              {
                const connect = client.db(databasename)
                connect.collection("driverdetails").find({driverId:playerid.toString()}).count(function(err, count)
                 {   
                  if(count > 0) 
                  {
                    connect.collection("driverdetails").find({driverId:playerid}).toArray(function(err, datad)
                    { 
                          

                      connect.collection("drivers").find({_id:ObjectId(playerid.toString())}).toArray(function(err, datadu)
                    { 
                        var dbsession_token= datad[0].sessionToken;

                        console.log(dbsession_token);
                        console.log("----");

                        console.log(token);
                       
                       // var mnum=datad[0].mobile
                        //var decipher = crypto.createDecipher(algorithm,'');
                        //var decrypted = decipher.update(mnum, 'hex', 'utf8') + decipher.final('utf8');
                        
                       // console.log(decrypted);
                        if(dbsession_token==token){



                          connect.collection("driverdetails").update({'driverId':playerid.toString()},   {$set:{driverName:newDriverName,truckNumber:newTruckNumber,bankName:newBankName,accountNumber:newBankAccountNumber,ifscCode:newIFSCCode,bankBranch:newBranch,chequeImage:newChequeImage,dlPhoto:newDLPhoto                          
                          }},function(err){
                            //  console.log(driver);
                             res.status(401).json({ "Data":{"otp":''},"Status":{"code":401,"message":"invalid_token"} });
                   
                          })


                                    res.status(200).json({ "Data":{
                                    
                                      
                                       
                                  
                                  }
                                    
                                    
                                    ,"Status":{"code":200,"message":"Updated"} });
                                   
                                   
                             
                                }

                                else
                                {
                                  return res.status(401).json({ "Data":{"":''},"Status":{"Code":401,"message":"Authentication falied"} });
           

                                }

                              });

                    });

                       
                              }
                            else
                            {
  
                              return res.status(401).json({ "Data":{"":''},"Status":{"Code":401,"message":"Driver not exist"} });
           
                            }
  
  
                            });
                            
      
      
                          //  consol
        
                        
              
                 });
        
       
  
        });



function getVerifiedStatusById(id,callback)
{
//console.log(id)
  MongoClient.connect(url).then((client) =>
  {
    const connect = client.db(databasename)
  connect.collection("drivers").find({_id:ObjectId(id.toString())}).toArray(function(err, datad)
  { 
    return callback(datad[0].isVerified);
    

  });
});

}




        app.get(
          '/GetPlayerDetails',
          // body('session_token').notEmpty()
          // .withMessage('session token should not be empty'),
     
  /*
          body('_id').notEmpty()
          .withMessage('player id should not be empty'),
       */
     
  
  
          (req, res) => {


           
 

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              console.log(errors.array()[0].param);
              console.log("testing")
             
              //errorMessage(errors.array()[0].param)
              return res.status(401).json(errorMessage(errors.array()[0].param,errors.array()[0].msg));
            }
        
        
            function errorMessage(errorType,msg)
            {
            if(errorType=='session_token')
            {
              var invalid_obj={
                "Data":{
                    "":''
                  
                },
                "Status":{
                    "Code":401,
                    "Message":msg
                }
            }
            return  invalid_obj;
            }
  
  
  
           /* if(errorType=='_id')
            {
              var invalid_obj={
                "Data":{
                    "":''
                  
                },
                "Status":{
                    "Code":401,
                    "Message":msg
                }
            }
            return  invalid_obj;
            }
            */
  
          }
          
          
        
        
          var token= req.body['session_token'];
          console.log(token);
         
         
          var playerid= 1;

          //var mobile = req.body['MobileNumber'];
         // var dor = req.body['DateOfRegistration'];
          

         
         
           
           MongoClient.connect(url).then((client) =>
              {
                const connect = client.db(databasename)
              /*  connect.collection("driverdetails").find({driverId:playerid.toString()}).count(function(err, count)
                 {   
                  if(count > 0) 
                  {
                    */
                  /*  connect.collection("driverdetails").find({}).toArray(function(err, datad)
                    { 
                          */

                      connect.collection("driverdetails").find({}).toArray(function(err, datadu1)
                    { 


                     /* var userMap={}; 
                      datadu.forEach(function(datadu1){ 
    userMap[datadu1.mobile]=datadu1; 
  });
*/

var userMap=[]; 
                      datadu1.forEach(function(datad){  
                     
                      

                     //   connect.collection("driverdetails").find({driverId:datadu._id}).toArray(function(err, datad)
                    //{ 
                       var dbsession_token= datad.sessionToken;

                       console.log(dbsession_token);
                       console.log("----");
                       console.log("testing 2");
                        console.log("datad",datad)
                        console.log(token);
                        
                        // if(dbsession_token==token){

                       
                        var obj =  {
                       // 'creaDateOfRegistrationted_at':datadu.created_at,
                        //'MobileNumber':datadu.mobile, 
                        //'isVerified':datadu.isVerified,
                       // "DateOfRegistration":datadu.created_at,
//"MobileNumber":datadu.mobile,

                         
                                      "DriverName":datad.driver_name,
                                       "TruckNumber":datad.truck_number,
                                      "BankName":datad.bank_name,
                                       "BankAccountNumber":datad.bank_account,
                                       "IFSCCode":datad.ifscode,
                                        "Branch":datad.branch,
                                      "ChequeImage":datad.CkeckfileName,
                                      "DLPhoto":datad.DLfileName,
                                      "_id":datad._id,
                                      // "Isverfifed":  
                                      // getVerifiedStatusById(datad.user_id, function(response){
                                        // Here you have access to your variable
                                        // console.log(response);
                                    // })

                        }
                      
                      
                       
                        userMap.push(obj);
                      // }
                      // else
                      // {
                      //   return res.status(401).json({ "Data":{"":''},"Status":{"Code":401,"message":"Authentication falied"} });
           
                      // }
                        
                   // } ); 
                       
                       // var mnum=datad[0].mobile
                        //var decipher = crypto.createDecipher(algorithm,'');
                        //var decrypted = decipher.update(mnum, 'hex', 'utf8') + decipher.final('utf8');
                        
                       // console.log(decrypted);
                       // if(dbsession_token==token){
                                  
                                   
                                   
                             
                             //   }
                          

                              /*  else
                                {
                                  return res.status(401).json({ "Data":{"":''},"Status":{"Code":401,"message":"Authentication falied"} });
           

                                }

                                */
                              });
                            

                              res.status(200).json({ "Data":userMap
                              
                              ,"Status":{"code":200,"message":"Success"} });



                            });

                   // });

                       
                           /*   }
                            else
                            {
  
                              return res.status(401).json({ "Data":{"":''},"Status":{"Code":401,"message":"Driver not exist"} });
           
                            }
  
  
                            });
                            */
      
      
                          //  consol
        
                        
              
                 });
        
       
  
        });






    app.listen(port,()=>{
        console.log('we are live at '+ port);
    });



