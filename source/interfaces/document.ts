import { Document } from "mongoose";


export default interface IDocument extends Document {
    username: string;
    profile_id: string;
    name: string;
    collectionIndex: number;
    img_url: string;
    effective_date:Date;
}