import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      region: 'us-east-1',
      accessKeyId: process.env.AWS_S3_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    });
  }

  getClient(): S3 {
    return this.s3;
  }

  async uploadFile(
    bucketName: string,
    fileKey: string,
    fileBody: Buffer,
    contentType: string
  ): Promise<void> {

    const params = {
      Bucket: bucketName,
      Key: fileKey,
      Body: fileBody,
      ContentType: contentType
    }

    await this.s3.upload(params).promise()
  }

  async listObjects(bucketName: string): Promise<any> {
    const params = {
        Bucket: bucketName,
    };

    // List objects in the bucket
    return this.s3.listObjectsV2(params).promise();
}
}
