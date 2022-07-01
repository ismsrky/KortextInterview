import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { UtilService } from './sys/util.service';

@Injectable({ providedIn: 'root' })
export abstract class BaseService {
    private controllerName: string;

    protected setControllerName(value: string) {
        this.controllerName = value;
    }

    constructor(
        private http1: HttpClient,
        private utilService1: UtilService) {
    }

    protected postMethod(actionName: string, dto: any): any {
        let bodyStr: string = null;
        if (this.utilService1.isNotNull(dto)) {
            bodyStr = JSON.stringify(dto);
        }

        return this.http1.post(this.getUrl(actionName), bodyStr, this.getOptions(false));
    }

    protected putMethod(actionName: string, dto: any, id: number): any {
        let bodyStr: string = null;
        if (this.utilService1.isNotNull(dto)) {
            bodyStr = JSON.stringify(dto);
        }

        return this.http1.put(this.getUrl(actionName, id), bodyStr, this.getOptions(false));
    }

    protected deleteMethod(actionName: string, id: number): any {
        return this.http1.delete(this.getUrl(actionName, id), this.getOptions(false));
    }

    protected getMethod(actionName: string, id: number): any {
        return this.http1.get(this.getUrl(actionName, id), this.getOptions(false));
    }

    protected postFile(actionName: string, file: any): any {
        return this.http1.post(this.getUrl(actionName), file, this.getOptions(true));
    }

    private getUrl(actionName: string, id: number = null): string {
        let idStr: string = id ? `/${id}` : '';

        return `${environment.webApiUrl}/${this.controllerName}/${actionName}${idStr}`;
    }

    private getHeaders(tokenId: string): HttpHeaders {
        return new HttpHeaders({ 'Authorization': `${tokenId}` });
    }

    private getOptions(isFile: boolean): any {
        let tokenId: string = 'no-token-for-now';


        if (isFile) {
            const httpOptions = {
                headers: this.getHeaders(tokenId)
            };

            return httpOptions;
        } else {
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            };

            return httpOptions;
        }
    }
}
