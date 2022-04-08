const db = require('../models/sequelize.configs')
const Products = db.Products
const Op = db.Sequelize.Op;
module.exports ={
    insert : async (req, res) => {
        try {
            const { product_name , price } =req.body 
            if(product_name == '' || product_name == undefined || typeof price != 'number') {
                return res.status(400).send({ message : "Bad Requst Value "})
            }   
            let findOne = await Products.findOne({  order : [ [ 'PRD_ID' , 'DESC'] ]  ,   raw: true,  nest: true } )
            let idLast = findOne.PRD_ID
            idLast = Number(idLast) +1 
             let id = ("000" + idLast.toString()).slice(-5);
             let ObjectCreate = {
                PRD_ID : id ,
                PRD_NAME : product_name , 
                 PRD_PRICE : price
             } 
             let product = await Products.create(ObjectCreate)
              if(!product) {
                 return res.status(400).send({ message : "Error "})
             }
            res.status(200).send({ message : "Prodcut Success" , data :product})

        }catch(err) {
            console.error("Error Message: " ,err.message )
            console.log()
            console.log("Error Stack")
            console.log(err.stack)
            res.status(500).send({message : err.message})
        }
    } ,
    getAll : async (req, res) => {
        try {
            let products = await Products.findAll({ raw : true , nest:true } )
            if(!products ) {
                return res.status(400).send({message  : "Error"})
            }
            res.status(200).send(products)

        }catch(err) {
            console.error("Error Message: " ,err.message )
            console.log()
            console.log("Error Stack")
            console.log(err.stack)
            res.status(500).send({message : err.message})
        }
    } ,
    getOne : async (req, res) => {
        try {
            let {id} = req.params 
            if(typeof id  != 'string' || id == ''|| id == undefined) {
                return res.status(400).send({ message : "Bad Requst Value PRODUCT ID "})
            }
            let product = await Products.findByPk(id)
            if(!product) {
             return   res.status(200).send({ status : false , message :`PRODUCT BY ${id} NOT FOUND `})
            }
            res.status(200).send({status : true , message: `PRODUCT BY ${id}` , data : product})

        }catch(err) {
            console.error("Error Message: " ,err.message )
            console.log()
            console.log("Error Stack")
            console.log(err.stack)
            res.status(500).send({message : err.message})
        }
    } ,
    updateOneBYName : async (req, res) => {
        try {
            let { product_price , product_name } = req.body
            if(product_name == undefined || product_name =='' || typeof product_price == 'string' )  {
                return res.status(400).send({message : `Bed Request Value Error ` } )
            }
           
            let update = await Products.update({ 'PRD_PRICE' : product_price } , {where : { 'PRD_NAME' : product_name }  } )
            let AfterUpdate = await Products.findOne({where : { 'PRD_NAME' : product_name }  , raw : true  } )
            if(update[0] <= 0) {
                return res.status(204).send({ message : "Null"} )
            } 
            res.status(200).send({status : true , message: ` UPDATE PRODUCT  ${product_name} SUCCESS ` , data :AfterUpdate})

        }catch(err) {
            console.error("Error Message: " ,err.message )
            console.log()
            console.log("Error Stack")
            console.log(err.stack)
            res.status(500).send({message : err.message})
        }
    } ,
    delete : async (req , res ) => {
        try {
            let {product_name } = req.body
            if(product_name == undefined || product_name ==''  )  {
                return res.status(400).send({message : `Bed Request Value Error ` } )
            }

            let deleteProduct = await Products.destroy( {where : { 'PRD_NAME' : product_name } } ) 

            if(deleteProduct == 0 ){
              return  res.status(204).send({ message : `Not Delete Product : ${product_name} ` })
            }

            res.status(200).send({ message : ` Delete Product : ${product_name} `  , data : deleteProduct})

        } catch (err) {
            console.error("Error Message: " ,err.message )
            console.log()
            console.log("Error Stack")
            console.log(err.stack)
            res.status(500).send({message : err.message})
        }
     }
} 