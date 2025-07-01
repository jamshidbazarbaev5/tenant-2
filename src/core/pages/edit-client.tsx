import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { type Client, useGetClient, useUpdateClient } from '../api/client';
import { ResourceForm } from '../helpers/ResourceForm';

export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [clientType, setClientType] = useState<'Физ.лицо' | 'Юр.лицо'>('Физ.лицо');
  const [formKey, setFormKey] = useState(0); // Add key to force form re-render

  const { data: client, isLoading } = useGetClient(Number(id));
  const updateClient = useUpdateClient();

  useEffect(() => {
    if (client) {
      setClientType(client.type);
      setFormKey(prev => prev + 1); // Force form re-render when client data loads
    }
  }, [client]);

  const commonFields = [
    {
      name: 'type',
      label: t('forms.client_type'),
      type: 'select' as const,
      placeholder: t('placeholders.select_client_type'),
      required: true,
      options: [
        { value: 'Физ.лицо', label: t('client.individual') },
        { value: 'Юр.лицо', label: t('client.corporate') },
      ],
      onChange: (value: 'Физ.лицо' | 'Юр.лицо') => setClientType(value),
    },
    {
      name: 'name',
      label: clientType === 'Юр.лицо' ? t('forms.company_name') : t('forms.name'),
      type: 'text' as const,
      placeholder: clientType === 'Юр.лицо' ? t('placeholders.enter_company_name') : t('placeholders.enter_name'),
      required: true,
    },
    {
      name: 'phone_number',
      label: t('forms.phone'),
      type: 'text' as const,
      placeholder: t('placeholders.enter_phone'),
      required: true,
    },
    {
      name: 'address',
      label: t('forms.address'),
      type: 'text' as const,
      placeholder: t('placeholders.enter_address'),
      required: true,
    },
  ];

  const corporateFields = [
    {
      name: 'ceo_name',
      label: t('forms.ceo_name'),
      type: 'text' as const,
      placeholder: t('placeholders.enter_ceo_name'),
      required: true,
    },
    {
      name: 'balance',
      label: t('forms.balance'),
      type: 'number' as const,
      placeholder: t('placeholders.enter_balance'),
      required: true,
    },
  ];

  const handleSubmit = async (data: Client) => {
    try {
      await updateClient.mutateAsync({ ...data, id: Number(id) });
      toast.success(t('messages.success.updated', { item: t('navigation.clients') }));
      navigate('/clients');
    } catch (error) {
      toast.error(t('messages.error.update', { item: t('navigation.clients') }));
      console.error('Failed to update client:', error);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto py-8 px-4">{t('common.loading')}</div>;
  }

  if (!client) {
    return <div className="container mx-auto py-8 px-4">{t('messages.error.general')}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <ResourceForm<Client>
        key={formKey} // Add key to force form re-render
        fields={clientType === 'Юр.лицо' ? [...commonFields, ...corporateFields] : commonFields}
        onSubmit={handleSubmit}
        isSubmitting={updateClient.isPending}
        title={t('messages.edit') + ' ' + t('navigation.clients')}
        defaultValues={client}
      />
    </div>
  );
}
