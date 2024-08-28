declare module '*.svg' {
  import {FunctionComponent, SVGProps} from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.png' {
  const value: any;
  export default value;
}
