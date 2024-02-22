import mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phone: String, 
});

export const FleetSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phone: String,
});

export const BidSchema = new mongoose.Schema({
  id: String,
  fleetId: String,
  bidAmount: Number,
});

export const RideSchema = new mongoose.Schema({
  id: String,
  clientId: String,
  pickupLocation: String,
  dropoffLocation: String,
  proposedPrice: Number,
  bids: [BidSchema],
});