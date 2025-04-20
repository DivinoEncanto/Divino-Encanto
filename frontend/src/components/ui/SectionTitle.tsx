import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  actionLink?: string;
  actionText?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  actionLink,
  actionText
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
      </div>
      
      {actionLink && actionText && (
        <Link href={actionLink} className="mt-4 md:mt-0 text-blue-600 hover:text-blue-800 font-medium">
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default SectionTitle;
