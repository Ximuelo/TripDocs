import { Document } from "mongoose";


export default interface IProfile extends Document {
    username: string;
    name: string;
    characters: string,
}