export class GitAccount {
    name: string;
    company: string;
    publicRepoCount: string;
    privateRepoCount: string;
    avatarUrl: string;
    username: string;
    source: string;
}

export class GitRepo {
    id: string;
    name: string;
    ownerName: string;
    description: string;
    openIssuesCount: number;
    source: string;
    avatarUrl: string;
}

