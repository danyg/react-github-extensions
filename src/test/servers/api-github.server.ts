import { createServer, Response, Server } from "miragejs";
import treesResponse from "./__fixtures__/trees.response.ok";
import matchingRefs from "./__fixtures__/matching-refs.response.ok";
import matchingRefsDeep500 from "./__fixtures__/matching-refs.deep500.response.ok";
import matchingRefsDeep404 from "./__fixtures__/matching-refs.deep404.response.ok";
import { RepoLocator } from "core/types";

const getBranch = (name: string, { owner, repo }: RepoLocator) => {
  return {
    ref: `refs/heads/${name}`,
    node_id: "MDM6UmVmMjY0MTE4MDczOnJlZnMvaGVhZHMvbWFpbg==",
    url: `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${name}`,
    object: {
      sha: "happyPathCommitSHA",
      type: "commit",
      url: `https://api.github.com/repos/${owner}/${repo}/git/commits/happyPathCommitSHA`
    }
  };
};

export function makeApiGithubServer({ environment = "test" } = {}) {
  return createServer({
    environment,
    routes() {
      this.urlPrefix = "https://api.github.com";
      this.get(
        "/repos/danyg/go-to-test/git/trees/1849d3736a51b4afda8575169b8e0ee01ad070ae",
        () => new Response(200, {}, treesResponse)
      );
      this.get(
        "/repos/:owner/:repo/git/trees/happyPathCommitSHA",
        () => new Response(200, {}, treesResponse)
      );
      this.get(
        "/repos/:owner/:repo/git/trees/:sha",
        () => new Response(404, {}, {})
      );
      this.get(
        "/repos/ownerDeep500/repoDeep500/git/trees/fakedeep500sha",
        () => new Response(500, {}, {})
      );

      // MATCHING-REFS
      this.get(
        "/repos/danyg/go-to-test/git/matching-refs/heads",
        () => new Response(200, {}, matchingRefs)
      );
      this.get(
        "/repos/ownerDeep404/repoDeep404/git/matching-refs/heads",
        () => new Response(200, {}, matchingRefsDeep404)
      );
      this.get(
        "/repos/ownerDeep500/repoDeep500/git/matching-refs/heads",
        () => new Response(200, {}, matchingRefsDeep500)
      );
      this.get(
        "/repos/failure/noBranches/git/matching-refs/heads",
        () => new Response(200, {}, [])
      );
      this.get(
        "/repos/owner400/repo400/git/matching-refs/:ref",
        () => new Response(400, {}, {})
      );
      this.get(
        "/repos/owner500/repo500/git/matching-refs/:ref",
        () => new Response(500, {}, {})
      );
      this.get(
        "/repos/owner503/repo503/git/matching-refs/:ref",
        () => new Response(503, {}, {})
      );
      this.get(
        "/repos/fakeBranchName/:repo/git/matching-refs/heads",
        (_schema, request) => [
          getBranch(request.params.repo, {
            owner: "fakeBranchName",
            repo: request.params.repo
          })
        ]
      );
      this.get(
        "/repos/:owner/:repo/git/matching-refs/:ref",
        () => new Response(404, {}, {})
      );
    }
  });
}

export function makeApiGithubServerBeforeEachTest() {
  let server: Server;
  beforeEach(() => {
    // return Promise.resolve()
    //   .then(() => {
    //     if (server?.pretender?.shutdown) server.pretender.shutdown();
    //   })
    //   .then(() => new Promise((r) => setTimeout(r, 100)))
    //   .then(() => {
    //   });
    server = makeApiGithubServer();
  });
  afterEach(() => {
    server.shutdown();
  });
}
