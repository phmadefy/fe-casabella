import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { TimelineComponent } from 'src/app/components/timeline/timeline.component';

@Component({
  selector: 'app-movement-statement',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    SelectDefaultComponent,
    TimelineComponent,
  ],
  providers: [ApiService],
  templateUrl: './movement-statement.component.html',
  styleUrls: ['./movement-statement.component.scss'],
})
export class MovementStatementComponent {
  dataSource: any = { data: [] };
  // queryParamsObs!: Subscription;
  loading = false;

  filters: any = { per_page: 30, page: 1 };

  tab: string = 'all';
  constructor(
    // private route: ActivatedRoute,
    private service: ApiService,
    public tools: ToolsService // private dialog: Dialog
  ) {
    service.path = 'v1/floral/extract';
  }

  ngOnInit(): void {
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

  setTab(tab: string) {
    this.tab = tab;
    this.filters.status = tab;
    this.getList();
  }

  changeMovement(movement: string) {
    if (this.filters.movement == movement) {
      delete this.filters.movement;
    } else {
      this.filters.movement = movement;
    }

    this.getList();
  }
}
