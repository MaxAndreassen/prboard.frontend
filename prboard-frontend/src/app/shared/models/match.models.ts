export class MatchRoundSummary {
    uuid: string;
    name: string;
    matches: MatchSummary[] = [];
}

export class MatchSummary {
    uuid: string;
    name: string;
    ordinal: number;
    matchRoundUuid: string;
    matchRoundName: string;
    isBye: boolean;
    isDraw: boolean;
    nextMatchUuid: string;
    matchUserSummaries: MatchUserSummary[] = [];
    winnerUuid: string;
    winnerUserUuid: string;
    readyForResults: boolean;
    organiserUserUuid: string;
    isDisputed: boolean;
    resultFinalisedAt: string;
    submissionTypeId: number;

    // local vars
    resultsSubmitted: boolean;
}

export class MatchDetailedSummary {
    uuid: string;
    name: string;
    ordinal: number;
    matchRoundUuid: string;
    matchRoundName: string;
    isBye: boolean;
    isDraw: boolean;
    nextMatchUuid: string;
    matchUserSummaries: MatchUserSummary[] = [];
    winnerUuid: string;
    winnerUserUuid: string;
    readyForResults: boolean;
    tournamentName: string;
    organiserUserUuid: string;
    submissionTypeId: number;
}

export class MatchQueryRequest {
    hasWinner?: boolean;
    matchOver?: boolean;
    winnerUserUuid: string;
    matchRoundUuid: string;
    tournamentUuid: string;
    participantUuid: string;
    page: number;
    pageSize: number;
    disputed?: boolean;
}

export class MatchUserSummary {
    username: string;
    profileUrl: string;
    userUuid: string;
    score: number;
    isByeUser: boolean;
    isWinner: boolean;
}

export class MatchResultSubmissionQueryRequest {
    matchUuids: string[] = [];
    submitterUserUuid?: string;
    excludeSubmitterUserUuid?: string;
}

export class MatchResultSubmissionSummary {
    uuid: string;
    submitterUserUuid: string;
    submitterUsername: string;
    matchUuid: string;
    matchResultScoreSubmissionSummaries: MatchResultScoreSubmissionSummary[] = [];
    evidence: any;
    submitterUserUsername: string;
}

export class MatchResultSubmissionWithEvidenceSummary {
    uuid: string;
    submitterUserUuid: string;
    submitterUsername: string;
    matchUuid: string;
    matchResultScoreSubmissionSummaries: MatchResultScoreSubmissionSummary[] = [];
    evidence: MatchResultSubmissionFileSummary[] = [];
}

export class MatchResultScoreSubmissionSummary {
    uuid: string;
    matchUserUuid: string;
    matchUserUsername: string;
    matchResultSubmissionUuid: string;
    proposedScore: number;
    profileUrl: string;
}

export class MatchResultSubmissionEditor {
    uuid: string;
    submitterUuid: string;
    matchUuid: string;
    matchResultScoreSubmissions: MatchResultScoreSubmissionEditor[] = [];
    isDispute: boolean;

    // files
    evidenceImages: any[];
    existingEvidenceImageUuids: string[];
}

export class MatchResultScoreSubmissionEditor {
    uuid: string;
    matchUuid: string;
    userUuid: string;
    matchResultSubmissionUuid: string;
    proposedScore: number;
}

export class MatchResultSubmissionFileQueryRequest {
    matchResultSubmissionUuid: string;
    type?: number;
}

export class MatchResultSubmissionFileSummary {
    uuid: string;
    type: number;
    url: string;
    format: string;
}
