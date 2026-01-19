import Product from "../models/product.js";

const getProduct = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "user",
      "fullname email -_id"
    );

    res.send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

  const getProductById = async (req,res) => {
    try {
        const productId=req.params.id;
        const  product=await Product.findById(productId);
        if(!product) return res.status(404).send({error:"product not found"});
        res.send(product);
        
    } catch (error) {
        res.status(500).send({error:error.message});
    };

};

const addProduct = async (req,res) => {
    try {
        const product=await Product.create(req.body);
        res.status(201).send(product)
    } catch (error) {
        res.status(500).semd({error:error.message})
    }
};

const updateProduct = async (req,res) => {
    try {
        const productId=req.params.Id;
        const updateBody=req.body;
        const product=await Product.findByIdAndUpdate(
            productId,
        updateBody,
        { new : true}
    );
    res.send(product)
    } catch (error) {
        res.status(500).send({error:error.message})
    };
};

const deleteProduct = async (req,res) => {
    try {
        const productId=req.params.id;
        const deletedProduct=await Product.findByIdAndDelete(productId)
        if(!deletedProduct)
          return  res.ststus(404).send({error:"Product not found"});
 res.send({message:"Product deleted"});
    } catch (error) {
        res.status(500).send({error:error.message});
    }
};

export{addProduct,getProduct,getProductById,deleteProduct,updateProduct};