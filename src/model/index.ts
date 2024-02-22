import mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String, 
});

export const FleetSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

export const BidSchema = new mongoose.Schema({
  fleetId: String,
  bidAmount: Number,
});

export const RideSchema = new mongoose.Schema({
  clientId: String,
  pickupLocation: String,
  dropoffLocation: String,
  proposedPrice: Number,
  bids: [BidSchema],
});