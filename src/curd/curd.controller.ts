import { Controller, Get, Post, Body, Patch, Param, Res, Req, Query, UseInterceptors, UploadedFile, UseGuards, UploadedFiles } from '@nestjs/common';
import { Response } from 'express';
import { CurdService } from './curd.service';
import { CreateCurdDto } from './dto/create-curd.dto';
import { loginDto } from './dto/login.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { AuthGuard } from '../auth/auth.guard';
import * as fs from 'fs';
import * as path from 'path';
import { searchDto } from './dto/search.dto';
import { demoDto } from './dto/demo.dto';

@Controller('curd')
export class CurdController {
  constructor(private readonly curdService: CurdService) {}

  // @Post('add')
  // insert(@Body() insert: CreateCurdDto){
  //   return this.curdService.signup(insert);
  // }
  
  @ApiQuery({ name: 'email', required: true })
  @Get('remove')
  findOne(@Query('email') email: string,){
    const imagePath = join(__dirname, '..', 'uploads',"sd.phg");
    console.log('imagePath',imagePath)
    return this.curdService.remove(email);
  }

  // @Post('upload')
  //   @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './uploads'
  //     , filename: (req, file, cb) => {
  //       const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
  //       cb(null, `${randomName}${extname(file.originalname)}`)
  //     }
  //   })
  // }))
  // async uploadvideo( @UploadedFile() file,@Body() post: any,) {
  //   return this.curdService.uploadVideo(file,post);
  // }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadType = file.fieldname === 'file' ? 'videos' : 'thumbnails';
          cb(null, `./uploads/${uploadType}`);
        },
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFiles(
    @UploadedFiles() files: { file: Express.Multer.File[], thumbnail: Express.Multer.File[], }, @Body() post: any,
  ) {
    const videoFile = files.file[0];
    const thumbnailFile = files.thumbnail[0];
    return this.curdService.uploadVideo(videoFile,thumbnailFile,post);
  }


  // @UseInterceptors(FileInterceptor('file'))
  // uploadVideo(@UploadedFile() file: Express.Multer.File) {
  //   const videoId = path.basename(file.originalname, path.extname(file.originalname));
  //   const videoFolderPath = path.join(__dirname, '..', 'uploads');
  //   if (!fs.existsSync(videoFolderPath)) {
  //     fs.mkdirSync(videoFolderPath);
  //   }

  //   const videoFilePath = path.join(videoFolderPath, `${videoId}.mp4`);
  //   fs.writeFileSync(videoFilePath, file.buffer);
  //   return { message: 'Video uploaded successfully.' };
  // }

  @Get(':videoId')
  streamVideo(@Param('videoId') videoId: string, @Res() res: Response, @Req() req: Request) {
    try{
    const videoFilePath = path.join('uploads/videos', `${videoId}`);

    const stat = fs.statSync(videoFilePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      console.log(parts);
      const start = parseInt(parts[0], 10);
      let chunk = parseInt(parts[0]) + 1098304
      const end = parts[1] ? parseInt(parts[1], 10) : chunk >= fileSize ? fileSize - 1: chunk;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoFilePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Range': `bytes ${0}-${fileSize}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',

      };
      res.writeHead(200, head);
      fs.createReadStream(videoFilePath).pipe(res);
    }
  }
  catch(e){
    return {status:501, message:"Not Allowed"}
  }
  }

  @Post('latestVideos')
  async latestVideo(){
    return this.curdService.latestVideos();
  }

  @Post('popularVideos')
  async popularVideo(){
    return this.curdService.popularVideos();
  }

  @Post('search')
  async search(@Body() post:searchDto){
    return this.curdService.Search(post);
  }

    
  @Post('demo')
  async demosearch(@Body() post:demoDto){
    
    return this.curdService.Search(post);
  }

  @Post('next')
  async next(@Body() @Req() req: Request){
   console.log('dsfsdfsdf ',req);
  }

  // @Get('chunk/:chunkIndex')
  // async getVideoChunk(@Param('chunkIndex') chunkIndex: string, @Res() res: Response) {
  //   const filePath = './uploads/8182a16d22f1a98fc001b3f143c255db.mp4'; 
  //   const chunkSize = 1024 * 1024; 

  //   const startByte = Number(chunkIndex) * chunkSize;
  //   const endByte = startByte + chunkSize - 1;

  //   try {
  //     const stats = await fs.promises.stat(filePath);
  //     const fileSize = stats.size;
  //     if (startByte >= fileSize) {
  //       return res.status(416).end();
  //     }

  //     res.status(206).header({
  //       'Content-Range': `bytes ${startByte}-${endByte}/${fileSize}`,
  //       'Accept-Ranges': 'bytes',
  //       'Content-Length': (endByte - startByte + 1).toString(),
  //       'Content-Type': 'video/mp4',
  //     });

  //     const fileStream = fs.createReadStream(filePath, { start: startByte, end: endByte });
  //     fileStream.pipe(res);
  //   } catch (err) {
  //     console.error('Error reading video:', err);
  //     res.status(500).send('Error reading video');
  //   }
  // }


  // @Post('login')
  // login(@Body() loginDto:loginDto){
  //   return this.curdService.login(loginDto);
  // }

  @Post('frontend')
  api(@Body() loginDto:loginDto){
    return this.curdService.api(loginDto);
  }
  
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Post('details')
  details(@Body() loginDto:loginDto){
    return this.curdService.details(loginDto);
  }


  @Post('signup')
  @ApiBody({
    description: 'Reason Code',
    required: true,
})
  @ApiBody({
      required: true,
      type: "multipart/form-data",
      schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            format: "string",
          },
          email: {
            type: "string",
            format: "string",
          },
          password: {
            type: "string",
            format: "string",
          },
          file: {
            type: "string",
            format: "binary",
          },
        },
      },
    })
   @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async upload( @UploadedFile() file,@Body() name: any,) {
    return this.curdService.signup(file,name);
  }
}

