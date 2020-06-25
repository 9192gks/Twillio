const https = require('https');



exports.handler = function(context, event, callback) {
    let responseObject ={};
    let questions = [
        {
                    "question": "Please upload a picture of your Pan Card?",
                    "name": "id_card",
                    "type": "Twilio.MEDIA",
                    "validate": {
                        "allowed_types": {
                            "list": [
                                "image/jpeg",
                                "image/gif",
                                "image/png",
                                "image/bmp"
                            ]
                        }
                    }
        },
        {
                    "question": "Please upload a Selfie?",
                    "name": "selfie",
                    "type": "Twilio.MEDIA",
                    "validate": {
                        "allowed_types": {
                            "list": [
                                "image/jpeg",
                                "image/gif",
                                "image/png",
                                "image/bmp"
                            ]
                        }
                    }
        }
    ];
    let data ;
    console.log(event);
    let memory = JSON.parse(event.Memory);
    console.log(memory.twilio.collected_data.ask_questions.answers)

    
    let first_name = memory.twilio.collected_data.ask_questions.answers.first_name.answer || 'No First Name'  ;
    let mid_name = memory.twilio.collected_data.ask_questions.answers.mid_name.answer || 'No Middle Name'  ;
    let last_name =memory.twilio.collected_data.ask_questions.answers.last_name.answer ||'No Last Name' ;
    let city = memory.twilio.collected_data.ask_questions.answers.city.answer || 'No city Selected' ;
    let phone_number =  memory.twilio.collected_data.ask_questions.answers.phone_number.answer || 'No Number provided' ;

    
    let message = `Hi ${first_name} ${mid_name} ${last_name} ! Please confirm your provided information you are from ${city} and your phone number is ${phone_number} `;

    //  responseObject = {
    //      "actions" : [
    //          {
    //              "say" : message
    //          }
    //      ]
    //  };
    
    responseObject = {
        "actions": [
            {
                "collect" :{
                    "name":"collectId",
                    "questions":questions,
                    //"data" : data,
                    "on_complete":{
                        "redirect": "task://collectId"

                    }
                }
            }
        ]
    };
     responseObject1 = {
         "actions" : [
            {
                "collect" :{
                    "name":"collectId",
                    "questions":questions,
                    "on_complete":{
                        "redirect": "task://CentGreeting"

                    }
                }
            }
         ]
     };

    
    var postData = JSON.stringify({ "mob_number":phone_number,
                    "city":city,
                    "first_name":first_name,
                    "mid_name":mid_name,
                    "last_name":last_name });
    console.log(postData);
    
    let postOptions = {
        host: 'dm.centroxy.com',
        port: '5000',
        path: '/loan/client_register',
        method: 'POST',
        rejectUnauthorized: false,
        requestCert: true,
        agent: false,
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Length': Buffer.byteLength(postData)
            'Content-Length': postData.length

            }
    }; 
     console.log('postOptions');
        console.log(postOptions);
    let req = https.request(postOptions, (res) => {
        // console.log(typeof(res))
    if (res.statusCode == 200){
          res.on('data', (d) => {
            process.stdout.write(d);
            d =JSON.parse(d.toString())
            callback(null,responseObject);
          })}else if (res.statusCode == 203){
          console.log(res.statusCode);
          callback(null,responseObject1);
        }
    }
     );
    
    req.on('error', (error) => {
      console.error(error);
      callback(null,responseObject1);
    })
    
    req.write(postData);
    req.end();
};
