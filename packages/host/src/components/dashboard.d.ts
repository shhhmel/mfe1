/// <reference types="react" />

declare module "dashboard/DashboardApp" {
  export const mount: (
    el: React.MutableRefObject<null | HTMLDivElement> | null,
    options: any
  ) => any;
}
