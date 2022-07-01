import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs/internal/Observable';

// Dto
import { VolumeDto } from './dto/volume/dto';
import { VolumeGetListCriteriaDto } from './dto/volume/getlist-criteria.dto';

// Service
import { expandCollapse } from './animation/expand-collapse.ani';
import { UtilService } from './service/sys/util.service';
import { VolumeService } from './service/volume/volume.service';

// Enum
import { OrderBy } from './dto/order-by.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss'],
  animations: [expandCollapse]
})
export class AppComponent implements OnInit {
  volumeList: VolumeDto[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  searchFormControl = new FormControl();
  searchText = "";

  resultOrder: OrderBy = OrderBy.Relevance;

  OrderBy = OrderBy;

  constructor(
    private volumeService: VolumeService,
    private utils: UtilService
  ) { }

  ngOnInit() {
  }

  getList(): void {
    const criteriaDto = new VolumeGetListCriteriaDto();
    criteriaDto.query = this.searchText;
    criteriaDto.startIndex = this.paginator!.pageIndex * this.paginator!.pageSize;
    criteriaDto.maxResults = this.paginator!.pageSize;
    criteriaDto.orderBy = this.resultOrder == OrderBy.Relevance ? 0 : 1;

    const subs = this.volumeService.getList(criteriaDto).subscribe(
      x => {
        this.utils.unsubs(subs);

        this.volumeList = x.Dto;

        console.log(x);
      },
      err => {
        this.utils.unsubs(subs);
      }
    );
  }

  search(): void {
    this.paginator!.pageIndex = 0;
    this.searchText = this.searchFormControl.value;
    this.getList();
  }

  onSortOrderChange(): void {
    this.paginator!.pageIndex = 0;
    this.getList();
  }
}
