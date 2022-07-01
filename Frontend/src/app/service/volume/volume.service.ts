import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UtilService } from '../sys/util.service';
import { BaseService } from '../base.service';

import { ResponseDto, ResponseGenDto } from '../../dto/response.dto';
import { VolumeDto } from '../../dto/volume/dto';
import { VolumeGetListCriteriaDto } from 'src/app/dto/volume/getlist-criteria.dto';

@Injectable({ providedIn: 'root' })
// Outside Service
export class VolumeService extends BaseService {
  constructor(
    private http: HttpClient,
    private utils: UtilService,
  ) {
    super(http, utils);
    super.setControllerName('Volume');
  }

  getList(dto: VolumeGetListCriteriaDto): Observable<ResponseGenDto<VolumeDto[]>> {
    return super.postMethod('GetList', dto);
  }
}
