import { makeApiGithubServerBeforeEachTest } from "./api-github.server";
import matchingRefs from "./__fixtures__/matching-refs.response.ok";
import treesResponse from "./__fixtures__/trees.response.ok";

describe("Api GitHub Mock Server", () => {
  makeApiGithubServerBeforeEachTest();

  describe("trees endpoint", () => {
    it("returns a treefor the last commit sha from main branch", async () => {
      const response = await fetch(
        "https://api.github.com/repos/danyg/go-to-test/git/trees/1849d3736a51b4afda8575169b8e0ee01ad070ae"
      );

      expect(await response.json()).toEqual(treesResponse);
    });

    it("returns a treefor the fake sha `happyPathCommitSHA`", async () => {
      const response = await fetch(
        "https://api.github.com/repos/someOwner/someRepo/git/trees/happyPathCommitSHA"
      );

      expect(await response.json()).toEqual(treesResponse);

      const response2 = await fetch(
        "https://api.github.com/repos/OwNer/RePosItorY/git/trees/happyPathCommitSHA"
      );

      expect(await response2.json()).toEqual(treesResponse);
    });

    it("returns 404 for not mocked shas", async () => {
      const response = await fetch(
        "https://api.github.com/repos/danyg/go-to-test/git/trees/30e0aa128b15615a71998d59d336e4008adf629e" // Existing sha, if this test doesn't return 404 we are calling to the real deal
      );

      expect(response.status).toBe(404);
    });

    it("returns 404 for all repos other than danyg:go-to-test", async () => {
      const response = await fetch(
        "https://api.github.com/repos/owner404/repo404/git/trees/:sha"
      );

      expect(response.status).toBe(404);
    });

    it("returns 404 for ownerDeep404:repoDeep404 with sha fakedeep404sha", async () => {
      const response = await fetch(
        "https://api.github.com/repos/ownerDeep404/repoDeep404/git/trees/fakedeep404sha"
      );

      expect(response.status).toBe(404);
    });

    it("returns 500 for the sha fakeDeep500 for repo ownerDeep500:repoDeep500", async () => {
      const response = await fetch(
        "https://api.github.com/repos/ownerDeep500/repoDeep500/git/trees/fakedeep500sha"
      );

      expect(response.status).toBe(500);
    });
  });

  describe("matching-refs endpoint", () => {
    it("returns the list of branches", async () => {
      const response = await fetch(
        "https://api.github.com/repos/danyg/go-to-test/git/matching-refs/heads"
      );

      expect(await response.json()).toEqual(matchingRefs);
    });

    it("returns 404 when calling other ref", async () => {
      const response = await fetch(
        "https://api.github.com/repos/danyg/go-to-test/git/matching-refs/otherref"
      );

      expect(response.status).toBe(404);
    });

    it("returns 404 when calling other repo than danyg:go-to-test", async () => {
      const response = await fetch(
        "https://api.github.com/repos/ownerNotFound/repoNotFound/git/matching-refs/heads"
      );

      expect(response.status).toBe(404);
    });

    it("returns 500 when calling ref mathcing endpoint with owner500 and repo500", async () => {
      const response = await fetch(
        "https://api.github.com/repos/owner500/repo500/git/matching-refs/heads"
      );

      expect(response.status).toBe(500);
    });

    it("returns 503 when calling ref mathcing endpoint with owner503 and repo503", async () => {
      const response = await fetch(
        "https://api.github.com/repos/owner503/repo503/git/matching-refs/heads"
      );

      expect(response.status).toBe(503);
    });

    it("returns 400 when calling ref mathcing endpoint with owner400 and repo400", async () => {
      const response = await fetch(
        "https://api.github.com/repos/owner400/repo400/git/matching-refs/heads"
      );

      expect(response.status).toBe(400);
    });

    it("returns 200 with a main branch and a sha when calling ref mathcing endpoint with ownerDeep500 and repoDeep500", async () => {
      const response = await fetch(
        "https://api.github.com/repos/ownerDeep500/repoDeep500/git/matching-refs/heads"
      );

      expect(response.status).toBe(200);
      expect((await response.json())[0].object.sha).toEqual("fakedeep500sha");
    });

    it("returns 200 with a main branch and a sha when calling ref mathcing endpoint with ownerDeep404 and repoDeep404", async () => {
      const response = await fetch(
        "https://api.github.com/repos/ownerDeep404/repoDeep404/git/matching-refs/heads"
      );

      expect(response.status).toBe(200);
      expect((await response.json())[0].object.sha).toEqual("fakedeep404sha");
    });

    it("returns empty array for failure:noBranches", async () => {
      const response = await fetch(
        "https://api.github.com/repos/failure/noBranches/git/matching-refs/heads"
      );

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual([]);
    });

    it("returns branch name equal to repo name for owner fakeBranchName and points to happyPathCommitSHA", async () => {
      const response = await fetch(
        "https://api.github.com/repos/fakeBranchName/MyWeirdBranchName/git/matching-refs/heads"
      );

      expect(response.status).toBe(200);
      const branches = await response.json();
      expect(branches[0].ref).toEqual("refs/heads/MyWeirdBranchName");
      expect(branches[0].object.sha).toEqual("happyPathCommitSHA");
      expect(branches.length).toBe(1);
    });
  });
});
