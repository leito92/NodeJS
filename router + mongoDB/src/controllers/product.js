import Product from '../models/mongoDB/product.js'

export const productController = {
    async getAll(req, res){
        try {
        const products = await Product.find()
        products.length?
            res.status(200).json({success: true, data: products})
            :
            res.status(404).json({success: false, message: 'DB is empty'})
        } catch (error) {
            res.status(500).json({success: false, message: 'Internal Server Error'})
        }
    },

    async getByName(req, res) {
        const { name } = req.query
        if(!name){
            return res.status(400).json({success: false, message: "missing name"})
        }
        try {
            const products = await Product.find({name: {$regex: name, $options: "i"}})
            products.length?
                res.status(200).json({success: true, data: products})
                :
                res.status(404).json({success: false, message: `products not found with '${name}' name`})  
        } catch (error) {
                res.status(500).json({success: false, message: 'Internal Server Error'})
        }
    },

    async createOne(req, res){
        const { name } = req.body
        try {
            const newProduct = new Product({
                name
            })
            const saveProduct = await newProduct.save()
            res.status(200).json({success: true, message: 'product created'})
        } catch (error) {
            res.status(500).json({success: false, message: 'Internal Server Error'})
        }
    },

    async updateOne(req, res) {
        try {
            const updateProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{new: true})
            if(!updateProduct) {
                return res.status(404).json({success: false, message: "product not found"})
            }
            res.status(200).json({success: true, message: 'product updated'})
        } catch (error) {
            res.status(500).json({success: false, message: 'Internal Server Error'})
        }
    },

    async deleteOne(req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id)
            if(!product) {
                return res.status(404).json({success: false, message: "product not found"})
            }
            res.status(204)
        } catch (error) {
            res.status(500).json({success: false, message: 'Internal Server Error'})
        }
    },
}