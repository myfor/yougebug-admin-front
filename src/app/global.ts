
export class Global {
    //  头像
    static avatar = '';
    //  名字
    static userName = '';
    //  邮箱
    static email = '';
    /*
    设置用户的全局信息
    */
    public static setGlobalUserInfo(avatar: string, name: string, email: string) {
        Global.avatar = avatar;
        Global.userName = name;
        Global.email = email;
    }
}
