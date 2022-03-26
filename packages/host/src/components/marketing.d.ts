/// <reference types="react" />

declare module "marketing/MarketingApp" {
  export const mount: (
    el: React.MutableRefObject<null | HTMLDivElement> | null,
    options: any
  ) => any;
}
