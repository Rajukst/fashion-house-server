const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const ObjectId= require("mongodb").ObjectId;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yyhry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("assignment_test");
    const TestProductList = database.collection("testProduct");
    const AllOrders= database.collection("all-orders")
  
    // const UsersTestCollection = database.collection("Medical-Test");
    // const userReview = database.collection("Reviews");
    // const AppointBooking = database.collection("Appoints");
    // const userCollection= database.collection('users')
    // creating add doctors bio
    app.post("/add-product", async (req, res) => {
      const add = req.body;
      const products = await TestProductList.insertOne(add);
      console.log("getting a Product", products);
      res.json(products);
      console.log(products);
    });
    app.get("/products", async (req, res) => {
      const cursor = TestProductList.find({});
      const getProductList = await cursor.toArray();
      res.send(getProductList);
      console.log(getProductList);
    });

    app.post("/order-info", async(req, res)=>{
      const addOrder= req.body;
      const getOrder= await AllOrders.insertOne(addOrder)
      res.json(getOrder)
      console.log(getOrder);
    })
    app.get("/orders", async(req, res)=>{
      const cursor= AllOrders.find({})
      const getOrders= await cursor.toArray()
      res.send(getOrders)
      console.log(getOrders)
    })
app.get("/products/:id", async(req, res)=>{
  const productId= req.params.id;
  const query = {_id: new ObjectId(productId)};
  const getSingleProduct= await TestProductList.findOne(query);
  console.log("getting a single product", getSingleProduct);
  res.send(getSingleProduct);
})
app.delete("/products/:id", async(req, res)=>{
const id= req.params.id;
const query= {_id:ObjectId(id)}
const result= await TestProductList.delete(query)
res.send(result)
})
// 
  } finally {
    // client.close()
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Project Server Is Running");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});