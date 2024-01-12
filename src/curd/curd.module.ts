import { Module } from '@nestjs/common';
import { CurdService } from './curd.service';
import { CurdController } from './curd.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schema/curd.schema';
import { fileInfoSchema } from './schema/video-upload.schema';


@Module({
  imports:[
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/userdata"),
    MongooseModule.forFeature([
      { name: 'user', schema: userSchema },
      { name: 'fileInfo', schema: fileInfoSchema }])
  ],
  controllers: [CurdController],
  providers: [CurdService],
  exports: [CurdService],
})
export class CurdModule {}
