import React from 'react';
import { useTranslation } from 'next-i18next';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle }) => {
  const { t } = useTranslation('common');

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );
};

export default AdminHeader;
