export class Login
{
    usertype: string= "";
    //tenantid: string= "";
    username: string= "";
    password: string= "";
    //remotelogid: string= "";
  

}

export interface IProfile {
    access_token: string;
    expires_in: string;
    username: string;
  //  claims: IClaim[]; not required
    currentUser: Login;
 //  usertype: string;
   // tenantid: string;
   // username: string;
   // password: string;
   // remotelogid: string;
    userid: string;
    isAdminRole:string;
}
