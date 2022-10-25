import {
  ExtensionCount,
  FileListElement,
  FileList,
  FileListElementType
} from "core/models";

const extensionMatcher = /\.(?<extension>\w+)$/;

const elementToExtension = (element: FileListElement): string | undefined =>
  element.path.match(extensionMatcher)?.groups?.extension;

const onlyFiles = (element: FileListElement) =>
  element.type === FileListElementType.FILE;

const extensionListToExtensionCount = (
  extensionCount: ExtensionCount,
  extension: string | undefined
): ExtensionCount => {
  if (!extension) return extensionCount;

  const newExtensionCount = {
    ...extensionCount,
    [extension]: extension in extensionCount ? extensionCount[extension] + 1 : 1
  };
  return newExtensionCount;
};

export function fileListToExtensionCount(fileList: FileList): ExtensionCount {
  return fileList
    .filter(onlyFiles)
    .map(elementToExtension)
    .reduce(extensionListToExtensionCount, {});
}
