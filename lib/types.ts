export type DataSource = 'iot' | 'csv' | 'manual' | 'api';
export type Category = 'appliance' | 'energy' | 'packaging' | 'electronics' | 'industrial';
export type PassportStatus = 'verified' | 'pending' | 'fail';

export interface Material {
  name: string;
  pct: number;
  recycled: number;
}

export interface CarbonBreakdown {
  mfg: number;
  transport: number;
  use: number;
  eol: number;
}

export interface Passport {
  id: string;
  name: string;
  manufacturer: string;
  category: Category;
  manufacturedAt: string;
  dataSource: DataSource;
  materials: Material[];
  repairScore: number;
  spareYears: number;
  co2: number;
  status: PassportStatus;
  proof: string | null;
  carbon: CarbonBreakdown;
}

export interface IoTEvent {
  id: string;
  device: string;
  event: string;
  time: string;
  status: 'live' | 'warn';
}

export interface AuditEntry {
  ts: string;
  action: string;
  id: string;
  src: DataSource;
  schema: string;
  hash: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  desc: string;
  color: string;
}
