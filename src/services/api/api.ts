import type { ApisauceInstance } from 'apisauce';
import { create } from 'apisauce';

import type * as Types from './api.types';
import { getGeneralApiProblem } from './apiProblem';

export const DEFAULT_API_CONFIG: Types.ApiConfig = {
  url: 'https://api.emopost.ai',
  timeout: 10000,
};

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance;

  config: Types.ApiConfig;

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: Types.ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  async fetchSingleCalendarData(
    calendarId: string
  ): Promise<Types.SingleCalendatApiRes> {
    const res = await this.apisauce.get(`v1/calendar/${calendarId}`);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    // const;
    const rawRes: any = res?.data;
    const data = {
      _id: rawRes._id || '',
      name: rawRes.name || '',
      user: rawRes?.user,
      data: rawRes?.data,
    };
    return { kind: 'ok', data };
  }

  async createCalendar(name: string): Promise<Types.CreateCalendarApiRes> {
    const res = await this.apisauce.post('v1/calendar', { name });
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    const calendarId: string = (rawRes?._id || '') as string;
    return { kind: 'ok', data: calendarId };
  }

  async generateCalendar(
    params: any
  ): Promise<Types.GenerateCalendarWithSocket> {
    const res = await this.apisauce.post('v1/calendar/generate', { ...params });
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    const channel: string = (rawRes?.channel || '') as string;
    const event: string = (rawRes?.event || '') as string;
    return { kind: 'ok', data: { channel, event } };
  }

  async fetchCalendars(): Promise<Types.CalendarFetchRes> {
    const res = await this.apisauce.get('v1/calendar');
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    const data = rawRes?.calendars?.map((item: Types.CalendarMeta) => {
      return {
        _id: item?._id,
        name: item?.name,
        user: item?.user,
      };
    });
    return { kind: 'ok', data };
  }
}

// Singleton instance of the API for convenience
export const api = new Api();
api.apisauce.setBaseURL('https://api-staging2.emopost.ai/');
// api.apisauce.setBaseURL('https://api.emopost.ai/');

api.apisauce.addAsyncRequestTransform((request) => async () => {
  const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU29oYW0iLCJpZCI6IjY0NzQ1OWI2NGY5NTkxNDNjNzEyZDA1ZiIsInNlc3Npb25JZCI6IjE5ZzZpbGo0MHI3amoiLCJpc0FkbWluIjp0cnVlLCJleHBpcmVzIjoxNzA0NTI5NDQ0NTkxLCJpYXQiOjE2ODcyNDk0NDR9.6B_nzpNkFp57ymU5gehbuXi1s_nQDjPMuVm6j9IIj1A';
  if (userToken) {
    request.headers.token = userToken;
  } else {
    delete request.headers.token;
  }
});
