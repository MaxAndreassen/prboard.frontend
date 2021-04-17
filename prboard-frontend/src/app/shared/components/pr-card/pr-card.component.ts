import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pr-card',
  templateUrl: './pr-card.component.html',
  styleUrls: ['./pr-card.component.scss']
})
export class PrCardComponent implements OnInit {

  leftArrow = faArrowLeft;

  constructor() { }

  ngOnInit(): any {
  }

}
