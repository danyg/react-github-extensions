import { RepoLocator } from "core/types";

export class RepositoryNotFound extends Error {
  public readonly owner: string;
  public readonly repo: string;

  public constructor({ owner, repo }: RepoLocator) {
    super();
    this.owner = owner;
    this.repo = repo;
  }
}

export class ServiceUnreachable extends Error {
  public constructor(public readonly fn: CallableFunction) {
    super();
  }
}

export class MainBranchNotFound extends Error {}
