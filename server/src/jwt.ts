import * as jwt from "jwt-simple"


export function jwtEncode(payload, secret){

    var token = jwt.encode(payload, secret, 'HS256');

    return token
}