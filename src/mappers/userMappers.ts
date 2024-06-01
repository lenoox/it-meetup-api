import {User} from "../model/user";

export const userToDto = (user:User)=>{
    return  {
        name: user.name,
        user: user.email,
        phone: user.phone
    }
}
