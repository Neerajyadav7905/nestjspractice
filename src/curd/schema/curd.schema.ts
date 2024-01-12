import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type userDocument = HydratedDocument<userData>;

@Schema({ collection: 'signup',autoCreate: false, versionKey: false, timestamps: {createdAt: 'created_date',updatedAt: false}})
export class userData {
 
  @Prop()
  name: String;

  @Prop()
  email: String;

  @Prop()
  password: String;

  @Prop()
  imagePath: String;

  @Prop()
  file: String;

}

export const userSchema = SchemaFactory.createForClass(userData);