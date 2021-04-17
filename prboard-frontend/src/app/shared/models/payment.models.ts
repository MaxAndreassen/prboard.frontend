export class AccountLink {
    url: string;
}

export class Account {
    id: string;
    detailsSubmitted: boolean;
    chargesEnabled: boolean;
    payoutsEnabled: boolean;
}

export class PaymentIntentSecret {
    thirdPartyId: string;
    secretKey: string;
    uuid: string;
}

export class AccountBalance {
    balance: number;
    pendingBalance: number;
    currency: string;
}

export class Transfer {
    type: string;
    amount: number;
    createdAt: Date;
    id: string;
    purchaserUsername: string;
    eventName: string;
}

export class PayOut {
    amount: number;
    createdAt: Date;
    id: string;
    status: string;
}
