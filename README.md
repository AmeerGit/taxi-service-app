 Ride bidding system built with Node.js, Express,typescript and MongoDB.

Endpoints:

the POST /rides - Clients can request a ride by providing their details and the pickup and dropoff locations.

GET /rides - Fleets can view all available rides.

POST /rides/:rideId/bids - Fleets can place a bid on a ride by providing their details and the bid amount.

GET /rides/:rideId/bids - Clients can view all bids for their ride through the  endpoint.

PATCH /rides/:rideId/bids/:bidId - Clients can accept a bid for their ride through the  endpoint.

The application uses the following schemas for data modeling:

ClientSchema: 

FleetSchema: 

BidSchema: 

RideSchema: 

Run the Docker : docker compose up