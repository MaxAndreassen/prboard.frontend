import { Component, Input, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { GitAccount } from '../../models/git-account.models';

@Component({
  selector: 'app-connected-account-card',
  templateUrl: './connected-account-card.component.html',
  styleUrls: ['./connected-account-card.component.scss']
})
export class ConnectedAccountCardComponent implements OnInit {

  @Input() account: GitAccount;

  leftArrow = faArrowLeft;

  constructor() { }

  ngOnInit(): any {
  }

}
