export type Client = {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  
  export type Fleet = {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  
  export type Bid = {
    id: string;
    fleetId: string;
    bidAmount: number;
  };
  
  export type Ride = {
    id: string;
    clientId: string;
    pickupLocation: string;
    dropoffLocation: string;
    proposedPrice: number;
    bids: Bid[];
  };