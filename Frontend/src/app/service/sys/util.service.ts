import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
// Inside Service
export class UtilService {
  constructor() {
  }

  calcAverageStar(starSum: number, starCount: number): number {
    if (this.isNull(starSum)) starSum = 0;
    if (this.isNull(starCount)) starCount = 0;

    let result: number = 0;

    if (starCount > 0) {
      result = this.round(starSum / starCount, 1);
    } else {
      result = 0;
    }

    return result;
  }

  round(value: number, places: number): number {
    let multiplier: number = Math.pow(10, places);

    return (Math.round(value * multiplier) / multiplier);
  }

  isNull(value: any): boolean {
    if (value == undefined || value == null) return true;

    if (this.isString(value) && value == '') return true;


    if (this.isString(value) && value.trim() == '') return true;

    return false;
  }
  isNotNull(value: any): boolean {
    return !this.isNull(value);
  }
  isString(value: any): boolean {
    return typeof value === 'string';
  }
  isDate(value: any): boolean {
    return value instanceof Date;
  }

  capitalize(value: string): string {
    if (this.isNull(value)) return null;

    return value && value.length
      ? (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
      : value;;
  }

  unsubs(subs: Subscription): void {
    if (this.isNotNull(subs) && !subs.closed) {
      subs.unsubscribe();

      subs = null;
    }
  }
  unsubsEvent(event: EventEmitter<any>): void {
    if (this.isNotNull(event) && !event.closed) {
      event.unsubscribe();

      event = null;
    }
  }

  isPositiveInteger(s): boolean {
    return /^\+?[0-9][\d]*$/.test(s);
  }

  getDateNumber(value: Date): number {
    if (this.isNull(value)) return null;

    return value.getTime() - (value.getTimezoneOffset() * 60 * 1000);
  }

  addDays(dateNumber: number, days: number): number {
    let result = new Date(dateNumber);
    result.setDate(result.getDate() + days);
    return this.getDateNumber(result);
  }

  getNow(): number {
    // return this.getDateNumber(new Date(Date.now()));
    return Date.now();
  }

  isMobile = /Android|iPhone/i.test(window.navigator.userAgent);
  static isIPad = /IPad/i.test(window.navigator.userAgent);
  static supportsWebSockets = 'WebSocket' in window || 'MozWebSocket' in window;
}
