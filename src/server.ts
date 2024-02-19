import express from 'express';
import mongoose from 'mongoose';
import { ClientSchema, FleetSchema, BidSchema, RideSchema } from './model';
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.52ozvjb.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
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