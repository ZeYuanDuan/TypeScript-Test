export type stringInfo = {
  lowercase: string;
  uppercase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export function calculateComplexity(stringInfo: stringInfo) {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}

type LoggerServiceCallBack = (arg: string) => void;

export function toUpperCaseWithCB(
  arg: string,
  callBack: LoggerServiceCallBack
) {
  if (!arg) {
    callBack('Invalid argument!');
    return;
  }
  callBack(`called function with ${arg}`);

  return arg.toUpperCase();
}

export class otherStringUtils {
  private callExternalService() {
    console.log('This is a private method so could not be tested');
  }
  public toUpperCase(arg: string) {
    return arg.toUpperCase();
  }

  public logString(arg: string) {
    console.log(arg);
  }
}
