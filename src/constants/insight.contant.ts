import {t} from 'i18next';

export const tabFinancial: {key: Insign; label: string}[] = [
  {key: 'statistics', label: 'statistics'},
  {key: 'savingsplan', label: 'savings_plan'},
];

export const tabTransaction: {key: InsignTransaction; label: string}[] = [
  {key: 'income', label: 'income_lowercase'},
  {key: 'expense', label: 'expense_lowercase'},
];

export const tabTimeFrameOptions = [
  {key: 'daily', label: 'daily'},
  {key: 'monthly', label: 'monthly'},
  {key: 'yearly', label: 'yearly'},
];

export const monthsOfYear = [
  t('jan'),
  t('feb'),
  t('mar'),
  t('apr'),
  t('may'),
  t('jun'),
  t('jul'),
  t('aug'),
  t('sep'),
  t('oct'),
  t('nov'),
  t('dec'),
];

export type Insign = 'statistics' | 'savingsplan';
export type InsignTransaction = 'income' | 'expense';
