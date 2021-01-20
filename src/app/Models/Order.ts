export interface Order {
  id: string;
  name: string;
  phone: string;
  createdDate: Date;
  ipAddress?: any;
  status: number;
  note: string;
  address: string;
}
