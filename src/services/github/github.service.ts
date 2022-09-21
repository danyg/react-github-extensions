import { RepoLocator } from "../../core/types";
import { FileList } from "../../core/models";
import {
  adaptGithubTreeToCoreFileList,
  createErrorHandler,
  getBranches,
  getMainBranchSHA,
  getTree
} from "./helpers";

export async function getFileListFromRepo(
  repoLocator: RepoLocator
): Promise<FileList> {
  const handleResponseErrors = createErrorHandler(
    repoLocator,
    getFileListFromRepo
  );

  const branches = await getBranches(repoLocator, handleResponseErrors);
  const sha = getMainBranchSHA(branches);
  const tree = await getTree(repoLocator, sha, handleResponseErrors);

  return adaptGithubTreeToCoreFileList(tree);
}
