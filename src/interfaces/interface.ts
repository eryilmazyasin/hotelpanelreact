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

export interface ICustomer {
  first_name: string;
  last_name?: string;
  phone_number: string;
  national_id: string;
  id?: number;
  room_id?: number;
}

export interface IReservation {
  room_id: number | undefined; // Oda ID'si, undefined olabilir
  customer_id: number | undefined; // Müşteri ID'si, undefined olabilir
  check_in_date: string | undefined; // Giriş tarihi, undefined olabilir
  check_out_date: string | undefined; // Çıkış tarihi, undefined olabilir
  num_of_guests: number;
  total_price: number;
  price_per_night: number;
}
