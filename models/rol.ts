import { Schema, model,  Document } from "mongoose";

export interface IRol extends Document{
    role: string
} 


const RoleSchema: Schema = new Schema({
    role: {
	type: String,
	required: [true, 'El rol es obligatorio']
    }
});

export default model<IRol>('Role', RoleSchema);
