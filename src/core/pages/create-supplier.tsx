import { useNavigate } from 'react-router-dom';
import { ResourceForm } from '../helpers/ResourceForm';
import type { Supplier } from '../api/supplier';
import { useCreateSupplier } from '../api/supplier';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const supplierFields = (t: any) => [
  {
    name: 'name',
    label: t('forms.supplier_name'),
    type: 'text',
    placeholder: t('placeholders.enter_name'),
    required: true,
  },
  {
    name: 'phone_number',
    label: t('forms.phone'),
    type: 'text',
    placeholder: t('placeholders.enter_phone'),
    required: true,
  },
];

export default function CreateSupplier() {
  const navigate = useNavigate();
  const createSupplier = useCreateSupplier();
  const { t } = useTranslation();

  const handleSubmit = async (data: Supplier) => {
    try {
      await createSupplier.mutateAsync(data);
      toast.success(t('messages.success.created', { item: t('table.supplier') }));
      navigate('/suppliers');
    } catch (error) {
      toast.error(t('messages.error.create', { item: t('table.supplier') }));
      console.error('Failed to create supplier:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <ResourceForm<Supplier>
        fields={supplierFields(t)}
        onSubmit={handleSubmit}
        isSubmitting={createSupplier.isPending}
        title={t('common.create') + ' ' + t('table.supplier')}
      />
    </div>
  );
}