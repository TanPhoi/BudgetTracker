export type CustomDataPoint = {
  value: number;
  title: string;
  customDataPoint?: () => JSX.Element;
};
