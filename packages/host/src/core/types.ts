export type Events<T = any> = T[];

export type ObserverOptions<T = any> = {
  events: T[];
  lastEvent?: T;
};

export type Observer<T = any> = (
  data: T | undefined,
  options: ObserverOptions
) => void;

export type Observers<T = any> = Observer<T>[];

export type Channels<T = any> = {
  observers: Observer<T>[];
  schema: Object | null;
};

export interface Observable<T = any> {
  getEvents(): Events<T>;
  getLastEvent(): T | undefined;
  publish(data: T): void;
  subscribe(observer: Observer<T>): void;
  unsubscribe(observer: Observer<T>): void;
  clear(): void;
}

export interface RemoteObservable<T = any> {
  observable: Observable<T>;
  subscribe(subscription: Observer<T>): void;
  publish(data: T): void;
  usubscribeAll(): void;
}

declare global {
  interface Window {
    __shared__: {
      __events__: Record<string, Events>;
      __channels__: Record<string, Channels>;
      getRemoteObservable: (
        namespace: string,
        schema: Object
      ) => RemoteObservable;
    };
  }
}
