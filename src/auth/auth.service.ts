import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CurdService } from '../curd/curd.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CurdService)
    private readonly CurdService: CurdService,
    private jwtService: JwtService
    ){}

  async create(post: any) {

    if((post.email&&post.password)==''){
      return {messege:"Please provide Email/Password"};
    }
    let result = await this.CurdService.getuser({email:post.email});
    if(result){
      let verify =  await bcrypt.compare(post.password, result.password);
      if(verify){
        const payload = { sub: result.name, username: result.email };
        let access_token = await this.jwtService.signAsync(payload);
        return {message:"Login Sucessful", access_token : access_token}
      }
      else{
        return {message:"Password Incorrect"}
      }
    }else{
      return {message:"User not Registered"}
    }
  }

}
