/// <reference types="react" />

declare module "auth/AuthApp" {
  export const mount: (
    el: React.MutableRefObject<null | HTMLDivElement> | null,
    options: any
  ) => any;
}
