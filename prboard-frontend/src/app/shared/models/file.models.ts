export class Upload {
    format: string;
    url: any;
    file: any;
    tempId: string;
    fileSize: number;
}

export class FileToShow {
    url: any;
    format: string;
    type: string;
    identifier: string;
    fileSize: number;
}

export class FileSummary {
    uuid: string;
    url: string;
    format: string;
}

export class AssetContent {
  fileName: string;
  fileSize: number;
  contents: AssetContent[] = [];

  // local var
  open = true;
  fileSizeFriendly: string;
}
