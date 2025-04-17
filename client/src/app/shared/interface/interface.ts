export interface User {
  id: number;
  username: string;
  email: string;
  password: number;
}

export interface Users {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  password: string;
  phone?: string;
  provider?: string;
  provider_id?: string;
  is_primary: boolean;
  verification_code?: string;
  status: boolean;
  tenant_id?: number;
  remember_token?: string;
  created_at: Date;
  updated_at: Date;
}

export interface State {
  id: number;
  name: string;
  status: boolean;
}

export interface City {
  id: number;
  name: string;
  state_id: number;
  pincode?: string;
  status: boolean;
  stateName: string;
}
