// declare var global: any;

declare namespace NodeJS {
  interface Global {
    printObject(): void;
    order(): string;
  }

}
