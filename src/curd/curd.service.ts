import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Iuser } from './interface/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IfileInfo } from './interface/fileInfo.interface';

@Injectable()
export class CurdService {
  constructor(
    @InjectModel('user')
    private user: Model<Iuser>,

    @InjectModel('fileInfo')
    private fileInfoModel: Model<IfileInfo>,
  ) { }
  
  async signup(file:any,post:any) {
    if(post.password == undefined){
    }
    if(((post.name == undefined) || (post.email == undefined) || (post.password == undefined) || (file == undefined) ) || ((post.name || post.email || post.password || file) == '')){
      return {messege:"Missing Parameter"};
    }
    let query = await this.user.findOne({email:post.email});
    if(query){
      return {messege:"User Already Exists"};
    }
    let name = post.name;
    let email = post.email;
    let pass = await this.hashpassword(post.password);
    if(name && name!=''){
      let query = await this.user.create({name:name,email:email,password:pass,imagePath:file.filename});
    if(query){
      return {status:200, Message:"Data is Inserted Successfully"};
    }
    else{
      return {status:400, Message:"Unable to Save Data"};
    }
    }
  }

  async hashpassword(pass:any){
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(pass, saltOrRounds);
    return hash;
  }

  async remove(email:any) {
    if(email && email!=''){
    let query = await this.user.deleteOne({email:email});
    if(query.deletedCount>0){
      return {status:200, Message:"Data is removed Successfully"};
    }
    else{
      return {status:400, Message:"unable to removed Successfully"};
    }
    }
  }

  async getuser(post:any){
    let query = await this.user.findOne({email:post.email}).exec();
    return query;
  }

  async details(post:any){
    let query = await this.user.findOne({email:post.email}).exec();
    if(query){
      return query;
    }
    else{
      return {message:"Data Not Found"}
    }
  }

  async api(post){
    if(post.password == undefined){
    }
    if(((post.name == undefined) || (post.email == undefined) || (post.password == undefined)) || ((post.name || post.email || post.password) == '')){
      return {message:"Missing Parameter"};
    }
    let query = await this.user.findOne({email:post.email});
    if(query){
      return {message:"User Already Exists"};
    }
    let name = post.name;
    let email = post.email;
    let pass = await this.hashpassword(post.password);
    if(name && name!=''){
      let query = await this.user.create({name:name,email:email,password:pass});
    if(query){
      return {status:200, message:"Data is Inserted Successfully"};
    }
    else{
      return {status:400, message:"Unable to Save Data"};
    }
    }
  }

  async uploadVideo(file:any,thumbnailFile:any,post:any)
  {
      let result:any;
    if(file){
      let payload = {
        title:post.title,
        fileName:file.filename,
        thumbnail: thumbnailFile.filename
      }
      let query = await this.fileInfoModel.create(payload);
      result = { status:200, message:"Files Uploaded Sucessfully", data:query}
    }else{
      result = {status:201, message:"File is Required"}
    }
    return result;
  }

  async latestVideos(){
    let query =await this.fileInfoModel.find({}).sort({createdAt:-1}).limit(10);
     return query;
  }

  async popularVideos(){
    let query =await this.fileInfoModel.find({}).limit(10);
     return query;
  }
  async Search(post:any){
    let query =[];
    if(post.value && post.value.trim()!=""){
    let value = new RegExp(post.value,'i');
     query =await this.fileInfoModel.find({title:value}).limit(5);
    }
     return query;
  }
}
