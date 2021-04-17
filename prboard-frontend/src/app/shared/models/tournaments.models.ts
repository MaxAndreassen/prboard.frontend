export class  TournamentSummary {
  uuid: string;
  name: string;
  description: string;
  entryFeeInPounds: number;
  organiserUuid: string;
  organiserName: string;
  organiserEmail: string;
  organiserProfileUrl: string;
  status: number;
  statusName: string;
  startDate: string;
  prize: string;
  updatedAt: string;
  modeName: string;
  typeName: string;
  gameUuid: string;
  gameName: string;
  platformName: string;
  maxPlayers: number;
  currentPlayers: number;
  enterable: boolean;
  winnerUsername: string;
  twitchChannel: string;
  logoImageUrl: string;
  coverImageUrl: string;
  bracketImageUrl: string;
  isPrivate: boolean;
  officialEvent: boolean;
}

export class TournamentEditor {
  uuid: string;
  buyIn: number;
  name: string;
  description: string;
  organiserUserUuid: string;
  prize: string;
  maximumPlayers: number;
  startDate?: Date;
  status: number;
  tournamentPlatformUuid: string;
  tournamentTypeUuid: string;
  tournamentGameUuid: string;
  tournamentResultSubmissionTypeUuid: string;
  tournamentModeUuid: string;
  finished: boolean;
  twitchChannel: string;
  isPrivate: boolean;
  playersPerGame: number;
  tournamentStartEmailInfo: string;
  timeToPlay: string;

  // files
  coverImage: any;
  existingCoverImageUuid: string;
  logoImage: any;
  existingLogoImageUuid: string;
  bracketImage: any;
  existingBracketImageUuid: string;
  sponsorImages: any[];
  existingSponsorImageUuids: string[];
}

export class TournamentPromoSummary {
  uuid: string;
  percentageOff: number;
  expiresAt: string;
}

export class TournamentQueryRequest {
  participantUserUuid?: string;
  temporaryOwnerLinkUuid?: string;
  organiserUserUuid?: string;
  searchTerm?: string;
  page?: number;
  status?: number;
  minimumPrice?: number;
  maximumPrice?: number;
  typeUuid?: string;
  gameUuid?: string;
  tournamentStatusUuid?: string;
  platformUuid?: string;
  modeUuid?: string;
  excludeUuid?: string;
  isPrivate?: boolean;
  isActive?: boolean;
  pageSize?: number;
}

export class TournamentEntryLink {
  uuid: string;
  createdAt: Date;
  expiresAt: Date;
  email: string;
  transactionIdentifier: string;
}

export class TournamentEntryCheck {
  inTournament: boolean;
}

/*

export class AssetDownloadLink {
    uuid: string;
    transactionIdentifier: string;
}*/

export class TournamentGameSummary {
  uuid: string;
  name: string;
  modeUuid: string;
}

export class TournamentModeSummary {
  uuid: string;
  name: string;
}

export class TournamentTypeSummary {
  uuid: string;
  name: string;
}

export class TournamentStatusSummary {
  uuid: string;
  name: string;
}

export class TournamentPlatformSummary {
  uuid: string;
  name: string;
  modeUuid: string;
}

export class TournamentUserEditor {
  uuid: string;
  userUuid: string;
  tournamentUuid: string;
  userAlias: string;
  transactionIdentifier: string;
  teamUuid: string;
}

export class TournamentUserSummary {
  uuid: string;
  userUuid: string;
  tournamentUuid: string;
}

export class TournamentUserDetailedSummary {
  uuid: string;
  userUuid: string;
  tournamentUuid: string;
  email: string;
  firstName: string;
  lastName: string;
  lastActiveAt: string;
  playstationUsername: string;
  xboxUsername: string;
  steamUsername: string;
  twitchUsername: string;
  username: string;
  profileUrl: string;
  teamUuid: string;
  userAlias: string;
}

export class TournamentUserQueryRequest {
  userUuid?: string;
  tournamentUuid?: string;
  teamUuid?: string;
}

export class TournamentFileQueryRequest {
  tournamentUuid: string;
  type?: number;
}

export class TournamentFileSummary {
  uuid: string;
  type: number;
  url: string;
  format: string;
}
