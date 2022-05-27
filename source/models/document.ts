import mongoose, {Schema} from "mongoose";
import IDocument from "../interfaces/document";

const DocumentSchema: Schema = new Schema({
    username: {type: String, required: true},
    profile_id: {type: String, required: true},
    name: {type: String, required: true},
    collectionIndex: {type: Number, required: true},
    img_url: {type: String, required: true},
    effective_date: {type: Date, required: true},
},
{
    timestamps: true
})

export default mongoose.model<IDocument>('Document', DocumentSchema);