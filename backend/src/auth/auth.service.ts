import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getUserInfo(req: any) {
    console.log(req);
  }
}
