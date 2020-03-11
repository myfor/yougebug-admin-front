
export class Global {
    //  名字
    static userName = '';
    //  邮箱
    static email = '';
    /*
    设置用户的全局信息
    */
    public static setGlobalUserInfo(name: string, email: string) {
        Global.userName = name;
        Global.email = email;
    }

    public static isLogged(): boolean {
        if (document.cookie.indexOf(JWT_COOKIC) !== -1) {
            return true;
        }
        return false;
    }
}

export const JWT_COOKIC = '8d0de8f8-61ef-4c56-a23e-de69a5f41681';
