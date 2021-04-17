import { Component, OnInit, Input } from '@angular/core';
import { UserEditor } from '../../../profile/models/profile.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() linkUrl: string;
  @Input() pictureUrl: string;
  @Input() buttonText: string;
  @Input() height = 200;
  @Input() status: number;
  @Input() user: UserEditor;
  @Input() subText: string;
  @Input() userUuid: string;
  @Input() username: string;
  @Input() profileUrl: string;
  @Input() showBottom: boolean;
  @Input() title: string;
  @Input() description: string;
  @Input() officialEvent: boolean;

  @Input() info1: string;
  @Input() info1Title: string;
  @Input() info2: string;
  @Input() info2Title: string;
  @Input() info3: string;
  @Input() info3Title: string;

  constructor() { }

  ngOnInit(): any {
  }

}
