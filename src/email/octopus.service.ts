import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class OctopusService {
  constructor(private readonly httpService: HttpService) {}

  async addContact(email: string): Promise<any> {
    // const request = this.httpService
    //   .post(
    //     `https://emailoctopus.com/api/1.6/lists/${process.env.EMAIL_OCTOPUS_LIST_ID}/contacts`,
    //     {
    //       api_key: process.env.EMAIL_OCTOPUS_API_KEY,
    //       email_address: email,
    //       tags: ['user'],
    //       status: 'SUBSCRIBED',
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   )
    //   .pipe(map((res) => res.data))
    //   .pipe(
    //     catchError(() => {
    //       throw new ForbiddenException('API not available');
    //     }),
    //   );
    // await lastValueFrom(request);
  }
}
