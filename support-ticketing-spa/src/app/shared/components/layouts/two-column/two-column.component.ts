import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BootstrapColumnSize } from 'src/app/core/enums/common/bootstrap-column-size.enum';

@Component({
  selector: 'app-two-column',
  templateUrl: './two-column.component.html',
  styleUrls: ['./two-column.component.scss']
})
export class TwoColumnComponent implements OnInit {

  @Input() mainContentSizeInput: number = 9;
  @Input() reverseColumns: boolean = false;
  @Input() bootstrapColumnSize: BootstrapColumnSize = BootstrapColumnSize.Medium;
  public remainingColumns: number = 0;
  public mainContentSize: string = '';
  public asideContentSize: string = '';

  constructor() { }

  ngOnInit(): void {
    this.arrangeColumnsSizes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mainContentSizeInput']) {
      this.arrangeColumnsSizes();
    }
  }

  private arrangeColumnsSizes() {
    this.mainContentSize = `col-${this.bootstrapColumnSize}-${this.mainContentSizeInput}`;
    this.remainingColumns = 12 - this.mainContentSizeInput;
    this.asideContentSize = `col-${this.bootstrapColumnSize}-${this.remainingColumns}`;
  }

}
