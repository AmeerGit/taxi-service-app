 Ride bidding system built with Node.js, Express,typescript and MongoDB.

Endpoints:

the POST /rides - Clients can request a ride by providing their details and the pickup and dropoff locations.

GET /rides - Fleets can view all available rides.

POST /rides/:rideId/bids - Fleets can place a bid on a ride by providing their details and the bid amount.

GET /rides/:rideId/bids - Clients can view all bids for their ride through the  endpoint.

PATCH /rides/:rideId/bids/:bidId - Clients can accept a bid for their ride through the  endpoint.

The application uses the following schemas for data modeling:

ClientSchema: Represents a client with fields for id, name, email, and phone.
FleetSchema: Represents a fleet with fields for id, name, email, and phone.
BidSchema: Represents a bid with fields for id, fleetId, and bidAmount.
RideSchema: Represents a ride with fields for id, clientId, pickupLocation, dropoffLocation, proposedPrice, and bids.