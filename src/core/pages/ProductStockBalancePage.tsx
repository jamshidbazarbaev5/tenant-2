import { useTranslation } from 'react-i18next';
import { ResourceTable } from '../helpers/ResourseTable';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetStores } from '../api/store';
import { useCurrentUser } from '../hooks/useCurrentUser';

interface ProductStockBalance {
  product__product_name: string;
  store__name: string;
  total_quantity: number;
}

interface StockBalanceResponse {
  count: number;
  total_volume:number;
  total_pages: number;
  current_page: number;
  page_range: number[];
  links: {
    first: string | null;
    last: string | null;
    next: string | null;
    previous: string | null;
  };
  page_size: number;
  results: {
    total_product: number;
    info_products: ProductStockBalance[];
    total_volume :number;
  };
}

export default function ProductStockBalancePage() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [showZeroStock, setShowZeroStock] = useState<'true' | 'false'>('false');
  
  const { data: storesData } = useGetStores({});
  const stores = Array.isArray(storesData) ? storesData : storesData?.results || [];
  const {data:currentUser} = useCurrentUser();
  const { data, isLoading } = useQuery<StockBalanceResponse>({
    queryKey: ['stockBalance', currentPage, selectedStore, showZeroStock],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
      });
      if (selectedStore !== 'all') {
        params.append('store', selectedStore);
      }
      params.append('product_zero', showZeroStock);
      const response = await api.get(`/dashboard/item_dashboard/?${params.toString()}`);
      return response.data;
    }
  });

  const columns = [
    {
      header: t('table.product'),
      accessorKey: 'product__product_name',
    },
    {
      header: t('table.store'),
      accessorKey: 'store__name',
    },
    {
      header: t('table.quantity'),
      accessorKey: 'total_quantity',
      cell: (row: any) => row.total_quantity.toLocaleString(),
    },
     {
      header: t('table.total_kub_volume'),
      accessorKey: 'total_kub_volume',
      cell: (row: any) => row?.total_kub_volume?.toLocaleString() || '0',
    },
  ];

  // Change handler to ensure correct type
  const handleShowZeroStockChange = (value: string) => {
    setShowZeroStock(value === 'true' ? 'true' : 'false');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">{t('navigation.stock_balance')}</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {currentUser?.is_superuser && (
            <Select
              value={selectedStore}
              onValueChange={setSelectedStore}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('forms.select_store')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('forms.all_stores')}</SelectItem>
                {stores.map((store) => (
                  <SelectItem key={store.id} value={store.id?.toString() || ''}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select value={showZeroStock} onValueChange={handleShowZeroStockChange}>
            <SelectTrigger>
              <SelectValue placeholder="Показать нулевые остатки" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Показать нулевые остатки</SelectItem>
              <SelectItem value="false">Не показывать нулевые остатки</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h1 className='text-lg font-bold'>
            {t('table.total_volume')}
            {/* Show as 135,37 if value exists */}
            {typeof data?.results.total_volume === 'number' && (
              <span> {data.results.total_volume.toFixed(2).replace('.', ',')}</span>
            )}
          </h1>
        </div>
      </div>
      <Card className="mt-4">
        <ResourceTable
          data={data?.results.info_products || []}
          columns={columns}
          isLoading={isLoading}
          pageSize={30}
          totalCount={data?.count || 0}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Card>
    </div>
  );
}
