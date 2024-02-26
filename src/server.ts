import express from 'express';
import mongoose from 'mongoose';
import { ClientSchema, FleetSchema, BidSchema, RideSchema } from './model';
const app = express();
app.use(express.json());

const MONGO_URL= 'mongodb://mongodb:27017/my_db';

mongoose.connect(MONGO_URL, {useUnifiedTopology: true} as mongoose.ConnectOptions).then(() => {
  console.log('Connected to MongoDB'); 
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
});

const ClientModel = mongoose.model('Client', ClientSchema,'Clients');
const FleetModel = mongoose.model('Fleet', FleetSchema,'Fleets');
const BidModel = mongoose.model('Bid', BidSchema);
const RideModel = mongoose.model('Ride', RideSchema,'Rides');
 

app.post('/clients', async (req, res) => {
  const client = new ClientModel(req.body);
  try{
    const result = await client.save();
    res.status(201).send(result);
  }catch(e){
    res.status(500).send(e);
  }
});

app.post('/fleets', async (req, res) => {
  const fleet = new FleetModel(req.body);
  const result = await fleet.save();
  res.json(result);
});

app.post('/rides', async (req, res) => {
  const ride = new RideModel(req.body);
  const result = await ride.save();
  res.json(result);
});


app.get('/rides', async (req, res) => {
  const rides = await RideModel.find();
  res.json(rides);
});

app.post('/rides/:rideId/bids', async (req, res) => {
 try{
  const ride = await RideModel.find({ id: req.params.rideId });
  if(!ride) {
    res.status(404).send('Ride not found');
    return;
  }
  const bid = new BidModel(req.body);
  ride[0].bids.push(bid);
  const result = await ride[0].save();
  res.json(result);
 }catch(e){
   res.status(500).send(e);
 }
});

app.get('/rides/:rideId/bids', async (req, res) => {
  const ride = await RideModel.find({ id: req.params.rideId });
  if(!ride) {
    res.status(404).send('Ride not found');
    return;
  }
  res.json(ride[0].bids);
}); 

app.patch('/rides/:rideId/bids/:bidId', async (req, res) => {
  const result = await BidModel.updateOne({ _id: req.params.bidId }, { $set: { accepted: true } });
  res.json(result);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;