import * as jwt_decode from "jwt-decode";


export function getDecodedAccessToken(): any {
  try{
      return jwt_decode(localStorage.getItem("id_token"));
  }
  catch(Error){
      return null;
  }
}
