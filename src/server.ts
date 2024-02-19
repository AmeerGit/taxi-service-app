import express from 'express';
import mongoose from 'mongoose';
import { ClientSchema, FleetSchema, BidSchema, RideSchema } from './model';
const app = express();
app.use(express.json());

const MongoUrl = process.env.MONGO_URL || '';

mongoose.connect(MongoUrl).then(() => {
  console.log('Connected to MongoDB'); 
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
});

const ClientModel = mongoose.model('Client', ClientSchema);
const FleetModel = mongoose.model('Fleet', FleetSchema);
const BidModel = mongoose.model('Bid', BidSchema);
const RideModel = mongoose.model('Ride', RideSchema);

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
  const bid = new BidModel({ ...req.body, rideId: req.params.rideId });
  const result = await bid.save();
  res.json(result);
});

app.get('/rides/:rideId/bids', async (req, res) => {
  const bids = await BidModel.find({ rideId: req.params.rideId });
  res.json(bids);
});

app.patch('/rides/:rideId/bids/:bidId', async (req, res) => {
  const result = await BidModel.updateOne({ _id: req.params.bidId }, { $set: { accepted: true } });
  res.json(result);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;