import {
  BankSyncIcon,
  CreditCard,
  DebitCardIcon,
  PhysicalCashIcon,
} from '@/assets/svg';
import {t} from 'i18next';
import {ElementType} from 'react';

type ActionItem = {
  id: number;
  icon: ElementType;
  title: string;
  onPress: () => void;
};

export const actionPaymentMethods = (
  onPress: (type: string) => void,
): ActionItem[] => {
  return [
    {
      id: 1,
      icon: BankSyncIcon,
      title: t('bank_balance'),
      onPress: () => onPress('bank_balance'),
    },
    {
      id: 2,
      icon: PhysicalCashIcon,
      title: t('physical_cash'),
      onPress: () => onPress('physical_cash'),
    },
  ];
};

export const actionCards = (onPress: (type: string) => void): ActionItem[] => {
  return [
    {
      id: 1,
      icon: CreditCard,
      title: t('credit_card'),
      onPress: () => onPress('credit_card'),
    },
    {
      id: 2,
      icon: DebitCardIcon,
      title: t('debit_card'),
      onPress: () => onPress('debit_card'),
    },
  ];
};

export const languages = [
  {code: 'en', name: 'English'},
  {code: 'vi', name: 'Vietnamese'},
  {code: 'hi', name: 'Hindi'},
];
