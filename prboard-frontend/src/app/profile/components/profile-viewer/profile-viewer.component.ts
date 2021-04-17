import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { UserEditor } from '../../models/profile.models';
import { isPlatformServer } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TournamentService } from '../../../shared/services/tournament/tournament.service';
import { TournamentQueryRequest, TournamentSummary } from '../../../shared/models/tournaments.models';
import { UserStatsService } from 'src/app/shared/services/user-stats/user-stats.service';
import { UserStats } from 'src/app/shared/models/auth.models';

@Component({
  selector: 'app-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrls: ['./profile-viewer.component.scss']
})
export class ProfileViewerComponent implements OnInit {
  failed = false;
  loading = false;
  data: UserEditor = new UserEditor();
  userUuid: string;

  organisedTournaments: TournamentSummary[] = [];
  userStats: UserStats = new UserStats();

  queryParams: TournamentQueryRequest = new TournamentQueryRequest();

  currentPage = 0;
  total = 0;

  affiliateUser: UserEditor;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private userService: UserService,
    private tournamentService: TournamentService,
    private userStatsService: UserStatsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.route.queryParamMap.subscribe(queryParams => {
      this.queryParams.page = +queryParams.get('page');
      this.currentPage = +queryParams.get('page');
      this.queryParams.isPrivate = false;

      this.route.paramMap.subscribe(params => {
        this.userUuid = params.get('uuid');

        this.loading = true;

        this.userService
          .getUser(this.userUuid)
          .pipe(finalize(() => this.loading = false))
          .subscribe(result => {
            this.data = result;
            this.data.createdAt = new Date(this.data.createdAt);

            if (!!this.data.affiliateUserUuid) {
              this.userService.getUser(this.data.affiliateUserUuid)
                .pipe(finalize(() => { }))
                .subscribe(p => {
                  this.affiliateUser = p;
                });
            }
          });

        this.queryParams.organiserUserUuid = this.userUuid;

        this.tournamentService
          .listTournaments(this.queryParams)
          .subscribe(organisedTournaments => {
            this.organisedTournaments = organisedTournaments.items;
            this.total = organisedTournaments.totalItems;
          });

        this.userStatsService
          .getStats(this.userUuid)
          .subscribe(p => {
            this.userStats = p;
          });
      });
    });
  }

  prev(): any {
    this.router.navigateByUrl(`profile/${this.userUuid}?page=${this.currentPage - 1}`);
  }

  next(): any {
    this.router.navigateByUrl(`profile/${this.userUuid}?page=${this.currentPage + 1}`);
  }
}
