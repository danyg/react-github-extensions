export enum FileListElementType {
  FILE,
  DIRECTORY
}

export interface FileListElement {
  path: string;
  type: FileListElementType;
}

export type FileList = FileListElement[];
