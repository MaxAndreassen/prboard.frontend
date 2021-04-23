import { Component, Input, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { GitRepo } from '../../models/git-account.models';

@Component({
  selector: 'app-repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss']
})
export class RepoCardComponent implements OnInit {
  @Input() repo: GitRepo;

  leftArrow = faArrowLeft;

  constructor() { }

  ngOnInit(): any {
  }

}
