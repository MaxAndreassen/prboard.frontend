export class UserEditor {
    uuid: string;
    createdAt: Date;
    name: string;
    profileUrl: string;
    existingProfileUuid: string;
    profileImage: any;
    isAdmin: boolean;
    isEmailVerified: boolean;
    isOrganiser: boolean;
}

export class SilentAccountResponse {
    uuid: string;
    email: string;
    alreadyInTournament: boolean;
}

export class SilentAccountRequest {
    email: string;
    relatedTournamentUuid: string;
}
