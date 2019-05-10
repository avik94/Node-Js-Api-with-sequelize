const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const postValidation = require('../../validation');

router.get('/', async(req, res) => {
    try{
        const result = await Product.findAll();
        res.status(200).json({
            count : result.length,
            data : result.map((el)=>{
                return {
                    id: el.id,
                    product_name: el.product_name,
                    price: el.price,
                    info:{
                        metrhod: "GET",
                        url: "http://localhost:3000/product/"+el.id
                    }
                }
            })
        })
    }catch(err){
        res.status(500).json({err:err})
    }
});


router.get('/:id' , async(req,res)=>{
    const id = req.params.id;
    try{
        const singleData = await Product.findAll({
            where:{
                id:id
            },
            attributes:['id', 'product_name', 'price']
        })
        if(singleData.length !== 0){
            res.status(200).json(singleData)
        }else{
            res.status(500).json({
                msg: "Product Not Found!!"
            });
        }
    }catch(err){
        res.status(500).json({err:err})
    }
});



router.post('/', async(req, res) => {
    try{
        const result = await postValidation.validateUser(req.body.name,req.body.price);
        response = {
            product_name: result.name,
            price: result.price
        }
        const storeData = await Product.create(response);
        if (storeData){
            res.json({
                messageSuccess: "Data Store Successfully!"
            });
        }
    }catch(err){
        res.json({err:err})
    }
    
});


// update alternative of Patch !!!!!!!!!!!!!!!!
router.post('/:id', async(req,res)=>{
    const id = req.params.id;
    try{
        const singleData = await Product.findAll({
            where:{
                id:id
            }
        }) 
        if(singleData.length !== 0){
            const requestBody = req.body
            const result = await postValidation.updateValidation(requestBody); 
            const update = await Product.update(
                result,
                {
                    where:{
                        id: id
                    }
                })
            if(update){
                res.json({
                    msg: "Updated Successfully!"
                });
            }    
        }else{
            res.status(404).json({
                mgs: "Product Not Found"
            })
        }
        
    }catch(err){
        res.status(500).json({err:err})
    }    
});

// delete 
router.post('/delete/:id', async(req,res)=>{
    const id = req.params.id;
    try{
        const singleData = await Product.findAll({
            where:{
                id:id
            }
        })                  
        if(singleData.length !== 0){
            const result = Product.destroy({
                where:{
                    id: id
                }
            })
            res.status(200).json({
                msg: "Product Deleted Successfully"
            })  
        }else{
            res.status(404).json({
                mgs: "Product Not Found"
            })
        }
    }catch(err){
        res.status(500).json({err:err})
    }
});

module.exports = router;
