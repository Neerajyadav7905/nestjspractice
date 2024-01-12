import { Document } from 'mongoose';
export interface IfileInfo extends Document {
title:string,
thumbnail: String,
fileName: String;
}