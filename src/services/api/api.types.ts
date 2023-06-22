import type { GeneralApiProblem } from './apiProblem';

export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

export interface CalendarMeta {
  _id: string;
  name: string;
  user: string;
}
export interface ChannelSubscription {
  channel: string;
  event: string;
}
export interface Signal {
  url: string;
  noOfDays: string;
}

export interface Suggestions {
  text: string;
  _id: string;
}
export interface CalendarDayData {
  _id: string;
  date: Date;
  platform: string;
  calendar: string;
  signal: Signal;
  suggestions: Suggestions[];
}

export interface CalendarData {
  _id: string;
  name: string;
  user: string;
  data: CalendarDayData[];
}

export type SingleCalendatApiRes =
  | { kind: 'ok'; data: CalendarData }
  | GeneralApiProblem;
export type CreateCalendarApiRes =
  | { kind: 'ok'; data: string }
  | GeneralApiProblem;

export type GenerateCalendarWithSocket =
  | { kind: 'ok'; data: ChannelSubscription }
  | GeneralApiProblem;

export type CalendarFetchRes =
  | { kind: 'ok'; data: CalendarMeta[] }
  | GeneralApiProblem;

export type SuccessBase = { kind: 'ok' } | GeneralApiProblem;
