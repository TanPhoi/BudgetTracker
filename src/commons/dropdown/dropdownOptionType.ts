import {FunctionComponent, SVGProps} from 'react';

export type DropdownOptionType = {
  key: number;
  option: string;
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  color?: string;
};
