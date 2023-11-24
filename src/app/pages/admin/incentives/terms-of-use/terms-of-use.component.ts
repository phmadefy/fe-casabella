import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardComponent } from 'src/app/components/card/card.component';

@Component({
  selector: 'app-terms-of-use',
  standalone: true,
  imports: [
    CommonModule,
    ButtonCbComponent,
    SpinnerComponent,
    RouterModule,
    CardComponent,
  ],
  providers: [ApiService],
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent {
  dataSource: any = { data: [] };
  loading = false;

  filters: any = { per_page: 50, page: 1 };

  @Input() type: any;

  constructor(
    private service: ApiService,
    public tools: ToolsService,
    private activeRoute: ActivatedRoute
  ) {
    service.path = 'v1/terms';
  }

  ngOnInit(): void {
    const type = this.activeRoute.snapshot.queryParamMap.get('type');
    if (this.type) {
      this.filters.type = this.type;
    } else if (type) {
      this.type = type;
      this.filters.type = type;
    }
    this.getList();
  }

  getList() {
    this.loading = true;
    this.service
      .listing(this.filters)
      .then((res) => {
        this.dataSource = res;
      })
      .finally(() => (this.loading = false));
  }
}
