import { RepoLocator } from "core/types";
import {
  MainBranchNotFound,
  RepositoryNotFound,
  ServiceUnreachable
} from "core/models/errors";
import { FileList, FileListElementType } from "core/models";
import { GithubBranches, GitHubTree } from "./types";

const throwRepoNotFound = (repoLocator: RepoLocator) => {
  throw new RepositoryNotFound(repoLocator);
};

export const createErrorHandler = (
  repoLocator: RepoLocator,
  orignator: CallableFunction
) => (response: Response) => {
  if (response.status === 404) throwRepoNotFound(repoLocator);
  if (response.status >= 400) throw new ServiceUnreachable(orignator);
};

const MAIN_BRANCHES = ["refs/heads/main", "refs/heads/master"];
const isMainBranch = (ref: string) => MAIN_BRANCHES.includes(ref);

export function getMainBranchSHA(branches: GithubBranches) {
  for (const branch of branches) {
    if (isMainBranch(branch.ref)) return branch.object.sha;
  }
  throw new MainBranchNotFound();
}

export async function getBranches(
  repoLocator: RepoLocator,
  handleResponseErrors: (response: Response) => void
) {
  const { owner, repo } = repoLocator;
  const branchesResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/matching-refs/heads`
  );
  handleResponseErrors(branchesResponse);
  const branches = await branchesResponse.json();
  return branches;
}

export async function getTree(
  repoLocator: RepoLocator,
  sha: string,
  handleResponseErrors: (response: Response) => void
): Promise<GitHubTree> {
  const { owner, repo } = repoLocator;
  const treeResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${sha}`
  );
  handleResponseErrors(treeResponse);

  return (await treeResponse.json()).tree;
}

export const adaptGithubTreeToCoreFileList = (tree: GitHubTree): FileList =>
  tree.map(({ path, type }) => ({
    path,
    type:
      type === "blob" ? FileListElementType.FILE : FileListElementType.DIRECTORY
  }));
