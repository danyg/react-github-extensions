/* eslint-disable @typescript-eslint/no-use-before-define */
/* I normally disable hoist in test files, to allow to define reusables at the end of the file */
import {
  FileListElementType,
  FileList,
  ExtensionCount,
  SortType,
  SortDirection
} from "core/models";
import { RepoLocator } from "core/types";
import { equalsRepoLocator } from "./repoLocatorUtils";
import * as extensionCount from "./";

describe("extensionList", () => {
  describe("fileListToExtensionCount", () => {
    it("generates an empty extension count list from an empty list of files", () => {
      const fileList: FileList = [];

      const extensions: ExtensionCount = extensionCount.fileListToExtensionCount(
        fileList
      );

      expect(extensions).toEqual({});
    });

    it("generates a extension list from a populated list of files", () => {
      const fileList: FileList = [
        {
          path: "file.ts",
          type: FileListElementType.FILE
        },
        {
          path: "anotherFile.ts",
          type: FileListElementType.FILE
        },
        {
          path: "data.json",
          type: FileListElementType.FILE
        }
      ];

      const extensions: ExtensionCount = extensionCount.fileListToExtensionCount(
        fileList
      );

      expect(extensions).toEqual({
        ts: 2,
        json: 1
      });
    });

    it("only consider file extension and not directory extensions", () => {
      const fileList: FileList = [
        {
          path: "Directory.EXT",
          type: FileListElementType.DIRECTORY
        },
        {
          path: "file.txt",
          type: FileListElementType.FILE
        }
      ];

      const extensions: ExtensionCount = extensionCount.fileListToExtensionCount(
        fileList
      );

      expect(extensions).toEqual({
        txt: 1
      });
    });

    it("only uses the text after the last dot in consideration as extension", () => {
      const fileList: FileList = [
        {
          path: ".hiddenFile",
          type: FileListElementType.FILE
        },
        {
          path: "file.with.a.lot.of.dots.in.its.name.txt",
          type: FileListElementType.FILE
        },
        {
          path: ".hidden.dotted.file.txt",
          type: FileListElementType.FILE
        }
      ];

      const extensions: ExtensionCount = extensionCount.fileListToExtensionCount(
        fileList
      );

      expect(extensions).toEqual({
        txt: 2,
        hiddenFile: 1
      });
    });
  });

  describe("sort", () => {
    it("sorts by count desc", () => {
      const sortedExtensionCount = extensionCount.sort(extensionCountToSort, {
        type: SortType.Value,
        direction: SortDirection.DESC
      });

      expect(sortedExtensionCount).toEqual(extensionCountToSort);
      expect(Object.keys(sortedExtensionCount)).toStrictEqual([
        "json",
        "tsx",
        "ts",
        "js",
        "txt"
      ]);
    });

    it("sorts by count asc", () => {
      const sortedExtensionCount = extensionCount.sort(extensionCountToSort, {
        type: SortType.Value,
        direction: SortDirection.ASC
      });

      expect(sortedExtensionCount).toEqual(extensionCountToSort);
      expect(Object.keys(sortedExtensionCount)).toStrictEqual([
        "txt",
        "ts",
        "js",
        "tsx",
        "json"
      ]);
    });

    it("sorts by extension desc", () => {
      const sortedExtensionCount = extensionCount.sort(extensionCountToSort, {
        type: SortType.Key,
        direction: SortDirection.DESC
      });

      expect(sortedExtensionCount).toEqual(extensionCountToSort);
      expect(Object.keys(sortedExtensionCount)).toStrictEqual([
        "js",
        "json",
        "ts",
        "tsx",
        "txt"
      ]);
    });

    it("sorts by extension asc", () => {
      const sortedExtensionCount = extensionCount.sort(extensionCountToSort, {
        type: SortType.Key,
        direction: SortDirection.ASC
      });

      expect(sortedExtensionCount).toEqual(extensionCountToSort);
      expect(Object.keys(sortedExtensionCount)).toStrictEqual([
        "txt",
        "tsx",
        "ts",
        "json",
        "js"
      ]);
    });
  });

  describe("equalsRepoLocator", () => {
    it("should compare to locators that are equal an return true", () => {
      const a: RepoLocator = {
        owner: "owner",
        repo: "repo"
      };
      const b: RepoLocator = JSON.parse(JSON.stringify(a));

      expect(equalsRepoLocator(a, b)).toBe(true);
    });

    it("should compare to locators that are not equal an return false", () => {
      const a: RepoLocator = {
        owner: "owner",
        repo: "repo"
      };
      const b: RepoLocator = JSON.parse(JSON.stringify(a));
      b.owner = "Owner";

      expect(equalsRepoLocator(a, b)).toBe(false);
    });

    it("should compare to locators that are not equal an return false", () => {
      const a: RepoLocator = {
        owner: "owner",
        repo: "repo"
      };
      const b: RepoLocator = JSON.parse(JSON.stringify(a));
      b.repo = "Repo";

      expect(equalsRepoLocator(a, b)).toBe(false);
    });

    it("should compare to locators that are not equal an return false", () => {
      const a: RepoLocator = {
        owner: "owner",
        repo: "repo"
      };
      const b: RepoLocator = {
        owner: "owner2",
        repo: "repo2"
      };

      expect(equalsRepoLocator(a, b)).toBe(false);
    });

    it("should compare against null, undefined, false", () => {
      const a: RepoLocator = {
        owner: "owner",
        repo: "repo"
      };
      const b: RepoLocator = JSON.parse(JSON.stringify(a));

      expect(equalsRepoLocator(undefined, b)).toBe(false);
      expect(equalsRepoLocator(a, undefined)).toBe(false);
      expect(equalsRepoLocator(undefined, undefined)).toBe(false);
    });

    it("should compare against Partial<RepoLocator>", () => {
      const a: Partial<RepoLocator> = {
        owner: "owner"
      };
      const b: RepoLocator = JSON.parse(JSON.stringify(a));

      expect(equalsRepoLocator(a, b)).toBe(false);
      expect(equalsRepoLocator(undefined, b)).toBe(false);
      expect(equalsRepoLocator(a, undefined)).toBe(false);
      expect(equalsRepoLocator(undefined, undefined)).toBe(false);
    });
  });
});

const extensionCountToSort: ExtensionCount = {
  ts: 20,
  js: 20,
  txt: 3,
  json: 44,
  tsx: 32
};
