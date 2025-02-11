export interface ICoffee {
  id: number;
  name: string;
  qty: number;
  uom: string;
  total_price: number;
}

export interface IInventoryManagementParams {
  limit: number;
  page: number;
  search: string;
}
