export class UserEditor {
    uuid: string;
    createdAt: Date;
    firstName: string;
    lastName: string;
    companyName: string;
    username: string;
    profileUrl: string;
    existingProfileUuid: string;
    profileImage: any;
    isAdmin: boolean;
    isEmailVerified: boolean;
    playstationUsername: string;
    xboxUsername: string;
    steamUsername: string;
    twitchUsername: string;
    twitterHandle: string;
    bio: string;
    isBusiness: boolean;
    isOrganiser: boolean;
    affiliateUserUuid: string;
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
