import { Injectable } from '@angular/core';
import { CommonService} from '../services/common.service'
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { _throw } from "rxjs/observable/throw";
import{ Login ,IProfile} from '../ViewModels/Login';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 public authenticatedUser:boolean;
  constructor(private commonService:CommonService,private http: HttpClient) { }


  userProfile: IProfile = {
    access_token: "",
    expires_in: "",
    username: "",
    currentUser: { usertype: '', username: '', password: ''},
    // claims: null,
    userid: "",
    isAdminRole:""
};


login(loginRequest) {

  var headers = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });// working
  let url = this.commonService.getBaseUrl() + "/Token";

  var credentials = "usertype=" + encodeURIComponent(loginRequest.usertype) + "&tenantid="  + "&username=" + encodeURIComponent(loginRequest.username) + "&password=" + encodeURIComponent(loginRequest.password) + "&remotelogid="  + "&grant_type=password";

  return this.http.post<IProfile>(url, credentials, { headers: headers }).pipe(
      map(response => {

          this.userProfile = response;
          this.userProfile.currentUser = { usertype: loginRequest.usertype,  username: loginRequest.username, password: loginRequest.password }
          this.setProfile(this.userProfile);
          return response;
      }))//catch(this.handleError);
}

//   login(login: Login) {

//     var headers = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });// working
//     let url = this.commonService.getBaseUrl() + "/Token";
//    // headers.append('Content-Type', 'application/json');
//     //headers.append('Accept', 'application/json');
//     //headers.append('Access-Control-Allow-Origin', '*');

//     //headers.Add("Access-Control-Allow-Origin", "*")
//     //headers.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
//    // headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")


//     //headers.append('Access-Control-Allow-Credentials', 'true');



//     var credentials = "usertype=" + encodeURIComponent(login.usertype) + "&tenantid="  + "&username=" + encodeURIComponent(login.username) + "&password=" + encodeURIComponent(login.password) + "&remotelogid="  + "&grant_type=password";

//     return this.http.post<IProfile>(url, credentials, { headers: headers }).pipe(
//         map(response => {

//             this.userProfile = response;
//             this.userProfile.currentUser = { usertype: login.usertype,  username: login.username, password: login.password }
//             this.setProfile(this.userProfile);
//             return response;
//         }))//catch(this.handleError);
// }


isAuthenticated() {
       
  let profile = this.getProfile();
  var validToken = profile.access_token != "" && profile.access_token != null;
  var isTokenExpired = this.isTokenExpired(profile);
  return validToken && !isTokenExpired;
}

getProfile(authorizationOnly: boolean = false): IProfile {
      
  var accessToken = sessionStorage.getItem('access_token');

  if (accessToken) {
      this.userProfile.access_token = accessToken;
      this.userProfile.expires_in = sessionStorage.getItem('expires_in');
      this.userProfile.userid = sessionStorage.getItem('userid');
      if (this.userProfile.currentUser == null) {
          this.userProfile.currentUser = { usertype: '', username: '', password: ''}
      }
      this.userProfile.currentUser.usertype = sessionStorage.getItem('type');
      //this.userProfile.currentUser.tenantid = sessionStorage.getItem('tenantid');
      this.userProfile.currentUser.username = sessionStorage.getItem('username');
      this.userProfile.currentUser.password = sessionStorage.getItem('password');
      //this.userProfile.currentUser.remotelogid = sessionStorage.getItem('remotelogid');

  }

  return this.userProfile;
}

isTokenExpired(profile: IProfile) {
  var expiration = new Date(profile.expires_in)
  return expiration < new Date();
}

private handleError(error: HttpErrorResponse) {
  var err = error.error.error + ',' + error.error.error_description;
  return _throw(err);
}

setProfile(profile: IProfile): void {
  if (profile.currentUser != undefined) {
      var usertype = profile.currentUser.usertype;
     // var tenantid = profile.currentUser.tenantid;
      var username = profile.currentUser.username;
      var password = profile.currentUser.password;
     // var remotelogid = profile.currentUser.remotelogid;
  }
  sessionStorage.setItem('access_token', profile.access_token);
  sessionStorage.setItem('expires_in', profile.expires_in);
  sessionStorage.setItem('type', usertype);
 // sessionStorage.setItem('tenantid', tenantid);
  sessionStorage.setItem('username', username);
  sessionStorage.setItem('password', password);
//  sessionStorage.setItem('remotelogid', remotelogid);
  sessionStorage.setItem('userid', profile.userid);
}
}
