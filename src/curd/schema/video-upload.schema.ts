import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type videoInfoDocument = HydratedDocument<fileInfo>;

@Schema({ collection: 'fileInfo',autoCreate: false, versionKey: false, timestamps: {createdAt: true,updatedAt: true}})
export class fileInfo {
 
  @Prop()
  title: String;

  @Prop()
  thumbnail: String;

  @Prop()
  fileName: String;

}

export const fileInfoSchema = SchemaFactory.createForClass(fileInfo);