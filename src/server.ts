import express from 'express';
import { MongoClient } from 'mongodb';
import { Client, Fleet, Ride } from './types';
import { ObjectId } from 'mongodb';
const app = express();
app.use(express.json());

const client = new MongoClient('mongodb://localhost:27017');
client.connect();

const db = client.db('taxiService');
const ridesCollection = db.collection('rides');
const bidsCollection = db.collection('bids');

app.post('/rides', async (req, res) => {
  const ride : Ride = req.body;
  const result = await ridesCollection.insertOne(ride);
  res.json(result);
});

app.get('/rides', async (req, res) => {
  const rides = await ridesCollection.find().toArray();
  res.json(rides);
});

app.post('/rides/:rideId/bids', async (req, res) => {
  const bid = req.body;
  bid.rideId = req.params.rideId;
  const result = await bidsCollection.insertOne(bid);
  res.json(result);
});

app.get('/rides/:rideId/bids', async (req, res) => {
  const bids = await bidsCollection.find({ rideId: req.params.rideId }).toArray();
  res.json(bids);
});

app.patch('/rides/:rideId/bids/:bidId', async (req, res) => {
  const bidId = new ObjectId(req.params.bidId);
  const result = await bidsCollection.updateOne({ _id: bidId }, { $set: { accepted: true } });
  res.json(result);
});

app.listen(3000, () => console.log('Server is running on port 3000'));

export default app;