import { RepoLocator } from "../types";

const isComplete = (locator: Partial<RepoLocator>): locator is RepoLocator =>
  Boolean(locator.owner) && Boolean(locator.repo);

export const equalsRepoLocator = (
  a?: Partial<RepoLocator>,
  b?: Partial<RepoLocator>
): a is RepoLocator => {
  if (!a || !b) return false;
  if (!isComplete(a) || !isComplete(b)) return false;

  return a.owner === b.owner && a.repo === b.repo;
};
