// declare var global: any;

declare namespace NodeJS {
  interface Global {
    printObject(): void;
    setShowDebugLogs(value: boolean): void;
    order(): string;
    deleteTask(taskId: string): void;
  }

}
