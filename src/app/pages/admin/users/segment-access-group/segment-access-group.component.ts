import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-segment-access-group',
  standalone: true,
  templateUrl: './segment-access-group.component.html',
  styleUrls: ['./segment-access-group.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    InputFloatingComponent,
    SpinnerComponent,
    CardComponent,
  ],
  providers: [ApiService],
})
export class SegmentAccessGroupComponent {
  segment: any[] = [];
  loadingSegment = false;
  accessGroup: any[] = [];
  loadingAccessGroup = false;

  constructor(
    private service: ApiService,
    private messageService: MessageService,
    public tools: ToolsService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDados();
  }

  async getSegment() {
    this.loadingSegment = true;
    await this.service
      .getCustom('v1/roles')
      .then((res: any[]) => {
        console.log('getSegment', res);
      })
      .finally(() => (this.loadingSegment = false));
  }

  async getAccessGroup() {
    this.loadingAccessGroup = true;
    await this.service
      .getCustom('v1/departments')
      .then((res: any[]) => {
        console.log('getSegment', res);
      })
      .finally(() => (this.loadingAccessGroup = false));
  }

  async getDados() {
    Promise.all([this.getSegment(), this.getAccessGroup()]);
  }

  submit(form: NgForm, formName: string) {
    if (!form.valid) {
      return;
    }

    if (formName == 'segment') {
      this.saveSegment(form.value);
    } else {
      this.saveAccessGroup(form.value);
    }
  }

  async saveSegment(data: any) {
    this.loadingSegment = true;
    await this.service
      .postCustom('v1/users/roles', data)
      .then(async () => {
        await this.getSegment();
      })
      .finally(() => (this.loadingSegment = false));
  }

  async saveAccessGroup(data: any) {
    this.loadingAccessGroup = true;
    await this.service
      .postCustom('v1/users/departments', data)
      .then(async () => {
        await this.getAccessGroup();
      })
      .finally(() => (this.loadingAccessGroup = false));
  }
}
