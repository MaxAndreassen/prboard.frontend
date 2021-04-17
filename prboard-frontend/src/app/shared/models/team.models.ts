export class TeamSummary {
    uuid: string;
    name: string;
    description: string;
    profileUrl: string;
    memberCount: number;
}

export class TeamWithMembersSummary {
    uuid: string;
    name: string;
    description: string;
    profileUrl: string;
    memberCount: number;
    teamMembers: TeamUserSummary[] = [];

    // local

    teamCaptainIngameUsername: string;
}

export class TeamEditor {
    uuid: string;
    name: string;
    description: string;
    teamUserEditors: TeamUserEditor[] = [];
}

export class TeamUserSummary {
    uuid: string;
    teamName: string;
    teamUuid: string;
    username: string;
    userUuid: string;
    userProfileUrl: string;
    firstName: string;
    lastName: string;
    lastActiveAt: string;
    createdAt: string;
    isAdmin: boolean;
    email: string;
}

export class TeamUserEditor {
    uuid: string;
    teamUuid: string;
    username: string;
    userUuid: string;
    isAdmin: boolean;
}

export class TeamQueryRequest {
    userUuid: string;
    tournamentUuid: string;
    inTournament: boolean;
    page: number;
    pageSize: number;
    searchTerm: string;
    uuids: string[] = [];
}

export class TeamUserQueryRequest {
    teamUuid: string;
    page: number;
    pageSize: number;
}
