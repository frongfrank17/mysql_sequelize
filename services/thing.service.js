const request = require('request');
const config = require('../config') 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'
const serviceUrl = ( //'http://localhost:3003' ||  
//'http://10.224.188.14:3000' ||
process.env.SERVICE_THING || 'http://10.224.187.41:3004');
module.exports.getThingType = (payload) => {
    return new Promise((resolve, reject) => {

        const opts = { gzip:true,
            headers: {'Content-Type': 'application/json' , 'Authorization' : payload.token },
            url: (serviceUrl) + '/thing/' +payload.owner+'/type',
            method: 'GET',
            json: true,
        }
        

        if (payload.authorization != undefined) {
            opts.headers.Authorization = payload.token
        }
        console.log(opts)
        request(opts, function(error, response, body) {
            if (error){ reject(error) }
            else if (response.statusCode == 200) resolve(body)
            else reject(body)
        })
    })
}
module.exports.getThingBrands = (payload) => {
    return new Promise((resolve, reject) => {

        const opts = { gzip:true,
            headers: {'Content-Type': 'application/json' , 'Authorization' : payload.token },
            url: (serviceUrl) + '/thing/'+payload.owner+'/brand/'+payload.type,
            method: 'GET',
            json: true,
        }
        /*
        if (payload.authorization != undefined) {
            opts.headers.Authorization = payload.token
        }*/
        console.log(opts)
        request(opts, function(error, response, body) {
            //console.log(response.statusCode)
            if (error){ reject(error) }
            else if (response.statusCode == 200) resolve(body)
            else if (response.statusCode == 201) resolve(body)
            else reject(body)
        })
    })
   
}
module.exports.getThingModel = (payload) => {
    return new Promise((resolve, reject) => {

        const opts = { gzip:true,
            headers: {'Content-Type': 'application/json' , 'Authorization' : payload.token },
            url: (serviceUrl) + '/thing/' +payload.owner+'/model/'+payload.brand ,
            method: 'GET',
            json: true,
        }
        
        if (payload.authorization != undefined) {
            opts.headers.Authorization = payload.token
        }
        
        request(opts, function(error, response, body) {
            if (error){ reject(error) }
            else if (response.statusCode == 200) resolve(body)
            else reject(body)
        })
    })
}

module.exports.getThingStatus = (payload) => {
    return new Promise((resolve, reject) => {

        const opts = { gzip:true,
            headers: {'Content-Type': 'application/json' , 'Authorization' : payload.token },
            url: (serviceUrl) + '/thing/' +payload.owner+'/status',
            method: 'GET',
            json: true,
        }
        
        if (payload.authorization != undefined) {
            opts.headers.Authorization = payload.token
        }
        
        request(opts, function(error, response, body) {
            if (error){ reject(error) }
            else if (response.statusCode == 200) resolve(body)
            else reject(body)
        })
    })
}
module.exports.createThing = (payload) => {
    return new Promise((resolve, reject) => {
        console.log(payload)
        const opts = { gzip:true,
            headers: {'Content-Type': 'application/json' , 'Authorization' : payload.token },
            url: (serviceUrl) + '/thing/' +payload.owner+'/create' ,
            method: 'POST',
            json: payload.body,
        }
        
     /*   if (payload.authorization != undefined) {
            opts.headers.Authorization = payload.token
        }*/
        
        request(opts, function(error, response, body) {
            if (error){ reject(error) }
            else if (response.statusCode == 200) resolve(body)
            else reject(body)
        })
    })
}
