import Order from "../models/order.js";
import Product from "../models/product.js";

const addOrder = async (req, res) => {
  const { orderItems, shippingAddress, shippingCharge, paymentMethod } =
    req.body;
  const orderItemsFromDb = await Product.find({
    _id: { $in: orderItems.map((item) => item._id) },
  });

  const newOrderItems = orderItems.map((item) => {
    const actualItem = orderItemsFromDb.find((i) => i._id == item._id);
    return {
      ...item,
      price: actualItem.price,
      _id: null,
      productId: actualItem._id,
    };
  });

  const itemPrice = newOrderItems
    .reduce((total, item) => total + Number(item.qty) * Number(item.price), 0)
    .toFixed(2);

  const totalPrice = (Number(itemPrice) + Number(shippingCharge)).toFixed(2);
  const order = await Order.create({
    orderItems: newOrderItems,
    shippingAddress,
    shippingCharge,
    itemPrice,
    totalPrice,
    paymentMethod,
    user: req.user._id,
  });
  res.send({ message: "Order placed successfully", orderId: order._id });
};

const getorders = async(req,res) =>{
    try {
       const orders = await Order.find().populate("user", "fullname,email") 
       res.send(orders)
    } catch (error) {
        res.status(500).send({error:error.message})
    };
};

const getmyorders =async(req,res) =>{
    try {
        const myorders = await Order.find(({user:req.user._id}));
        res.send(myorders);
    } catch (error) {
     res.status(500).send({error:error.message})   
    };
};

const getorderById = async(req,res) => {
    try {
      const order =await Order.findById(req.parmas.id).populate(
        "user",
        "fullname email"
      );
      res.send(order)
    } catch (error) {
        res.status(500).send({error:error.message})
    };
};

const payorder = async(req,res) => {
    try {
       const id = req.parmas.id;
       const order = await Order.findById(id);
       if (!order) return res.status(404).send({message:"Order nor found!"});
       order.isPaid=true;
       order.paidAt = Date.now();
       order.paymentMethod = req.body.paymentMethod;
       await order.save();
       res.send({message:"Order paid suscessfully!"});
    } catch (error) {
        res.status(500).send({error:error.message});
    };
};

const deliverorder = async(req,res) => {
    try {
        const id = req.parmas.id;
        const order = await Order.findById(id);
        if (!order) return res.status(404).send({message:"Order not found!"});
        if (orderIspaid){
            order.isDelivered = true;
            order.deliverdAt = Date.now();
            await order.save();
            res.send({message:"Order delivered suscessfully"});
        };
    } catch (error) {
        res.status(500).send({error:error.message});
    };
};

export {addOrder,getorders,getmyorders,getorderById,payorder,deliverorder};