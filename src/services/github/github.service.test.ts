/* eslint-disable @typescript-eslint/no-use-before-define */
/* I normally disable hoist in test files, to allow to define reusables at the end of the file */

import {
  MainBranchNotFound,
  RepositoryNotFound,
  ServiceUnreachable
} from "core/models/errors";
import { makeApiGithubServerBeforeEachTest } from "test/servers/api-github.server";
import { FileList } from "core/models";
import { expectedFileList } from "test/expectedFileList";

import { getFileListFromRepo } from "./";

describe("Github Service", () => {
  makeApiGithubServerBeforeEachTest();

  describe("Error handling", () => {
    it("throws a RepositoryNotFound when no repository is found", async () => {
      try {
        await getFileListFromRepo({
          owner: "ownerNotFound",
          repo: "repoNotFound"
        });
        expect("Enter here").toBe("is a failure");
      } catch (e) {
        const error = e as RepositoryNotFound;
        expect(error).toBeInstanceOf(RepositoryNotFound);
        expect(error.owner).toBe("ownerNotFound");
        expect(error.repo).toBe("repoNotFound");
      }
    });

    it("throws a ServiceUnreachable when a 500 is received", async () => {
      try {
        await getFileListFromRepo({ owner: "owner500", repo: "repo500" });
        expect("Enter here").toBe("is a failure");
      } catch (e) {
        const error = e as ServiceUnreachable;
        expect(error).toBeInstanceOf(ServiceUnreachable);
        expect(error.fn).toBe(getFileListFromRepo);
      }
    });

    it("throws a ServiceUnreachable when a 503 is received", async () => {
      try {
        await getFileListFromRepo({ owner: "owner503", repo: "repo503" });
        expect("Enter here").toBe("is a failure");
      } catch (e) {
        const error = e as ServiceUnreachable;
        expect(error).toBeInstanceOf(ServiceUnreachable);
        expect(error.fn).toBe(getFileListFromRepo);
      }
    });

    it("throws a ServiceUnreachable when a 400 is received", async () => {
      try {
        await getFileListFromRepo({ owner: "owner400", repo: "repo400" });
        expect("Enter here").toBe("is a failure");
      } catch (e) {
        const error = e as ServiceUnreachable;
        expect(error).toBeInstanceOf(ServiceUnreachable);
        expect(error.fn).toBe(getFileListFromRepo);
      }
    });

    it("throws a ServiceUnreachable when a 500 is received in the tree call", async () => {
      try {
        await getFileListFromRepo({
          owner: "ownerDeep500",
          repo: "repoDeep500"
        });
        expect("Enter here").toBe("is a failure");
      } catch (e) {
        const error = e as ServiceUnreachable;
        expect(error).toBeInstanceOf(ServiceUnreachable);
        expect(error.fn).toBe(getFileListFromRepo);
      }
    });

    it("throws a RepositoryNotFound when sha is not found in the tree call", async () => {
      try {
        await getFileListFromRepo({
          owner: "ownerDeep404",
          repo: "repoDeep404"
        });
        expect("Enter here").toBe("is a failure");
      } catch (e) {
        const error = e as RepositoryNotFound;
        expect(error).toBeInstanceOf(RepositoryNotFound);
        expect(error.owner).toBe("ownerDeep404");
        expect(error.repo).toBe("repoDeep404");
      }
    });

    it("throws a MainBranchNotFound when no branches found", async () => {
      try {
        await getFileListFromRepo({
          owner: "failure",
          repo: "noBranches"
        });
        expect("Enter here").toBe("is a failure");
      } catch (e) {
        expect(e).toBeInstanceOf(MainBranchNotFound);
      }
    });

    it("throws a MainBranchNotFound when no main nor master branch is found in repo", async () => {
      try {
        await getFileListFromRepo({
          owner: "fakeBranchName",
          repo: "trunk"
        });
        expect("Enter here").toBe("is a failure");
      } catch (e) {
        expect(e).toBeInstanceOf(MainBranchNotFound);
      }
    });
  });

  it("returns a FileList when branch is main", async () => {
    const fileList: FileList = await getFileListFromRepo({
      owner: "fakeBranchName",
      repo: "main"
    });

    expect(fileList.length).toBeGreaterThan(0);
  });

  it("returns a FileList when branch is master", async () => {
    const fileList: FileList = await getFileListFromRepo({
      owner: "fakeBranchName",
      repo: "master"
    });

    expect(fileList.length).toBeGreaterThan(0);
  });

  it("returns a FileList with expected files for an existing repo", async () => {
    const fileList: FileList = await getFileListFromRepo({
      owner: "danyg",
      repo: "go-to-test"
    });

    expect(fileList).toMatchObject(expectedFileList);
  });
});
