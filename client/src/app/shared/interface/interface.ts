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
  tenants_count?: number;
}

export interface City {
  id: number;
  name: string;
  state_id: number;
  pincode?: string;
  status: boolean;
  stateName: string;
  tenantCount?: number;
}

export interface Transport {
  id: number;
  name: string;
  prefix: string;
  dbname: string;
  email: string;
  activated_at: Date;
  deactivated_at: Date;
  image: string;
  status: boolean;
  subscription_type_id: number;
  city_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface TransportRequest {
  id: number;
  request_id: string;
  name: string;
  user_id: number;
  city_id: number;
  contact: string;
  message: string;
  status: string;
  created_at: Date;
  City?: {
    name: string;
    State: {
      name: string;
    };
  };
}

export interface SubscriptionTypes {
  id: number;
  name: string;
  price: number;
  duration: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Transport {
  id: number;
  name: string;
  prefix: string;
  dbname: string;
  email: string;
  activated_at: Date;
  deactivated_at: Date;
  image: string;
  status: boolean;
  subscription_type_id: number;
  city_id: number;
  created_at: Date;
  updated_at: Date;
}
