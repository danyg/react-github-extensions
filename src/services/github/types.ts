export type GithubBranch = {
  ref: string;
  object: { sha: string };
};
export type GithubBranches = GithubBranch[];

export type GitHubTree = [
  {
    path: string;
    type: "blob" | "tree";
  }
];
