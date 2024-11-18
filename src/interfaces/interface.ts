export interface IRoom {
  id?: number;
  room_number: string;
  room_type: string;
  description: string;
  price_per_night: string;
  is_available: boolean;
  is_reserved?: boolean;
  Reservation?: IReservation;
  Customers?: ICustomers[];
}

export interface ICustomers {
  first_name: string;
  phone_number: string;
  national_id: string;
  id?: number;
  room_id?: number;
}

export interface IReservation {
  id?: number; // Güncellemede kullanılacak
  room_id?: number | null;
  check_in_date?: string | null;
  check_out_date?: string | null;
  num_of_guests?: number;
  total_price?: number;
  price_per_night?: number;
  customersData?: {
    first_name: string;
    last_name?: string;
    phone_number: string;
    national_id: string;
  }[];
  room?: IRoom;
}

// interfaces/interface.ts
export interface IRoom {
  room_number: string;
  room_type: string;
}

export interface ICustomer {
  id: number;
  first_name: string;
  phone_number: string;
  national_id: string;
  customerReservations: IReservation[];
}
