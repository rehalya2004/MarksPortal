import jwt_decode from "jwt-decode";
import {Navigate,Outlet} from "react-router-dom";

function ProtectCreate(){
  const token=localStorage.getItem("token");
  if(token){
   var decoded=jwt_decode(token);
   console.log(decoded.role)
  }
return token?(decoded.role==="teacher"?<Outlet/>:<Navigate to="/view"/>):
<Navigate to="/" replace/>
}

export default ProtectCreate;