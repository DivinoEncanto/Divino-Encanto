import React, { useState } from 'react';
import PayPalPayment from '../../components/payment/PayPalPayment';
import StripePayment from '../../components/payment/StripePayment';
import GooglePayButton from '../../components/payment/GooglePayButton';

interface PaymentMethodSelectorProps {
  amount: number;
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: any) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  amount,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('card');

  const paymentMethods = [
    { id: 'card', name: 'Cartão de Crédito/Débito', icon: 'credit-card' },
    { id: 'paypal', name: 'PayPal', icon: 'paypal' },
    { id: 'googlepay', name: 'Google Pay', icon: 'google' }
  ];

  const renderPaymentMethod = () => {
    switch (selectedMethod) {
      case 'paypal':
        return (
          <PayPalPayment
            amount={amount.toFixed(2)}
            currency="EUR"
            onSuccess={onPaymentSuccess}
            onError={onPaymentError}
          />
        );
      case 'googlepay':
        return (
          <GooglePayButton
            amount={amount.toFixed(2)}
            currency="EUR"
            onSuccess={onPaymentSuccess}
            onError={onPaymentError}
          />
        );
      case 'card':
      default:
        return (
          <StripePayment
            amount={amount}
            onSuccess={onPaymentSuccess}
            onError={onPaymentError}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Método de Pagamento</h3>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center">
              <input
                id={`payment-${method.id}`}
                name="payment-method"
                type="radio"
                checked={selectedMethod === method.id}
                onChange={() => setSelectedMethod(method.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor={`payment-${method.id}`} className="ml-3 block text-sm font-medium text-gray-700">
                {method.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Detalhes do Pagamento</h3>
        {renderPaymentMethod()}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
