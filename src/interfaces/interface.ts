export interface IRoom {
  id?: number;
  room_number: string;
  room_type: string;
  description: string;
  price_per_night: string;
  is_available: boolean;
  isReserved?: boolean;
  Reservation?: IReservation;
  Customer?: ICustomer;
}

export interface IReservation {
  id: number;
  check_in_date: string;
  check_out_date: string;
  num_of_guests: number;
  total_price: string;
  price_per_night: string;
}

export interface ICustomer {
  first_name: string;
  last_name: string;
  phone_number: string;
  national_id: string;
}
