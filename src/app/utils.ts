export type stringInfo = {
  lowercase: string;
  uppercase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export class StringUtils {
  public toUpperCase(arg: string) {
    if (!arg) {
      throw new Error("Invalid argument!")
    }
    return arg.toUpperCase();
  }

  public getStringInfo(arg: string): stringInfo {
    const hasHyphen = arg.includes("-");
    const extraInfo = {
      hasHyphen,
    };
  
    return {
      lowercase: arg.toLowerCase(),
      uppercase: arg.toUpperCase(),
      characters: Array.from(arg),
      length: arg.length,
      extraInfo,
    };
  }
}

