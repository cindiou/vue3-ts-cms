interface IAccount {
  name: string;
  password: string;
}

interface IAccountLoginType {
  id: number;
  name: string;
  token: string;
}

interface IDataType<T = any> {
  code: number;
  data: T;
}

export { IAccount, IAccountLoginType, IDataType };
