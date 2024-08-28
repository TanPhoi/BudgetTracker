import {
  AddPriceIcon,
  AddToCartIcon,
  BusFrontIcon,
  Monitor,
  TshirtIcon,
  UserGroupsIcon,
} from '@/assets/svg';

export const CATEGORIES = [
  {
    key: 1,
    option: 'apparels',
    icon: TshirtIcon,
    color: '#A858EE',
  },
  {
    key: 2,
    option: 'electronics',
    icon: Monitor,
    color: '#E3B53C',
  },
  {
    key: 3,
    option: 'groceries',
    icon: AddToCartIcon,
    color: '#61D8D8',
  },
  {
    key: 4,
    option: 'investments',
    icon: AddPriceIcon,
    color: '#FFE870',
  },
  {
    key: 5,
    option: 'life',
    icon: UserGroupsIcon,
    color: '#8EFDAD',
  },
  {
    key: 6,
    option: 'transportation',
    icon: BusFrontIcon,
    color: '#E33C3C',
  },
];
