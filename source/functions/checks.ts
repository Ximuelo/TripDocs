import User from "../models/user";

export const userExists = async(username: string) => {

    let user = await User.findOne({username}).exec()
    if(user!=null){
            return true
        } else {
            return false
        }
}