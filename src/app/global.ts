export class Global {
  //  名字
  static userName = '';
  //  邮箱
  static email = '';
  /*
  设置用户的全局信息
  */
  public static setGlobalUserInfo(name: string, email: string) {
    //  console.log(`${name} -- ${email}`);
    Global.userName = name;
    Global.email = email;
  }

  public static isLogged(): boolean {
    if (document.cookie.indexOf(JWT_COOKIC) !== -1) {
      return true;
    }
    return false;
  }

  public static loggout() {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (let i = keys.length; i--;) {
        document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString(); //    清除当前域名下的,例如：m.kevis.com
        document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString(); // 清除当前域名下的，例如 .m.kevis.com
        document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString(); //   清除一级域名下的或指定的，例如 .kevis.com
      }
    }
  }
}

export const JWT_COOKIC = '8d0de8f8-61ef-4c56-a23e-de69a5f41681';
