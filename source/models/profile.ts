import mongoose, {Schema} from "mongoose";
import IProfile from "../interfaces/profile";

const ProfileSchema: Schema = new Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    characters: {type: String, required: true},
},
{
    timestamps: true
})

export default mongoose.model<IProfile>('Profile', ProfileSchema);