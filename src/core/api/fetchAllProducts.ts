import api from './api';
import { getAccessToken } from './auth';

export async function fetchAllProducts(productSearchTerm: string = ''): Promise<any[]> {
  let page = 1;
  let products: any[] = [];
  let totalPages = 1;
  const token = getAccessToken();
  try {
    do {
      const url = `/items/product/?page=${page}` + (productSearchTerm ? `&product_name=${encodeURIComponent(productSearchTerm)}` : '');
      const res = await api.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      products = products.concat(res.data.results);
      totalPages = res.data.total_pages;
      page++;
    } while (page <= totalPages);
    return products;
  } catch (error) {
    return [];
  }
}
