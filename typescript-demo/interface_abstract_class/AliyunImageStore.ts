/**
 * 图片存储
 */
/* class AliyunImageStore {
  public createBucketIfNotExisting(bucketName: string): void {
    // bucket创建逻辑
  }
  public generateAccessToken(): string {
    // 根据 accesskey、secrectkey 生成 access token
    const accessToken = '';
    return accessToken;
  }
  public uploadToAliyun(
    image: Blob,
    bucketName: string,
    accessToken: string
  ): string {
    // 上传图片到阿里云，返回图片url
    const url = '';
    return url;
  }

  public downloadFromAliyun(url: string, accessToken: string) {
    // 从阿里云下载图片
  }
}
 */
// 重构
interface ImageStore {
  update(image: Blob, bucketName: string): string;
  download(url: string): Blob;
}

class AliyunImageStore implements ImageStore {
  update(image: Blob, bucketName: string): string {
    this.createBucketIfNotExisting(bucketName);
    const accessToken: string = this.generateAccessToken();
    // 上传到阿里云得到图片url
    return '';
  }
  download(url: string): Blob {
    const accessToken: string = this.generateAccessToken();
    // 从阿里云下载图片……
    return;
  }

  public createBucketIfNotExisting(bucketName: string): void {
    // bucket创建逻辑
  }
  public generateAccessToken(): string {
    // 根据 accesskey、secrectkey 生成 access token
    const accessToken = '';
    return accessToken;
  }
}

class PrivateImageStorae implements ImageStore {
  update(image: Blob, bucketName: string): string {
    this.createBucketIfNotExisting(bucketName);
    // 上传到私有云，返回图片url……
    return;
  }
  download(url: string): Blob {
    // 从私有云下载图片……
    return;
  }
  public createBucketIfNotExisting(bucketName: string): void {
    // bucket创建逻辑
  }
}
