import { useTokenStore } from "../../zustand/useTokenStore"

export function checkLoggedIn(){
    const value = useTokenStore((state:any)=>state.access_token)
    if(value!=""){
        return true
    }
    return false
}
