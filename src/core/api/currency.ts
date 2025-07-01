import api from './api';
import { getAccessToken } from './auth';

export interface Currency {
  id: number;
  currency_rate: string;
}

export async function fetchCurrency(): Promise<Currency | null> {
  try {
    const token = getAccessToken();
    const res = await api.get('/items/currency/', {
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    });
    if (res.data.results && res.data.results.length > 0) {
      return res.data.results[0];
    }
    return null;
  } catch (e) {
    return null;
  }
}
