export interface Issue {
  id: string,
  githubIssueId: number,
  title: string,
  number: number,
  state: IssueState,
  url: string,
  githubUser: GithubUser,
  assignees: GithubUser[],
  repoName: string,
  repoUrl: string,
  openedAt: number,
}

export interface GithubUser {
  id: number,
  login: string,
  html_url: string,
}

export enum IssueState {
  open = "open",
  close = "close",
}
