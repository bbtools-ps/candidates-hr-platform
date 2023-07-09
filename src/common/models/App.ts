import { Candidate } from "./Candidate";

export interface IAppState {
  allCandidates: Candidate[];
  showAddCandidate: boolean;
  showEditCandidate: boolean;
  filteredCandidates: Candidate[];
  searchTerm: string;
}

export enum IAppActionType {
  ADD_CANDIDATE = "ADD_CANDIDATE",
  EDIT_CANDIDATE = "EDIT_CANDIDATE",
  REMOVE_CANDIDATE = "REMOVE_CANDIDATE",
  SEARCH_CANDIDATES = "SEARCH_CANDIDATES",
  RESET_CANDIDATES = "RESET_CANDIDATES",
}

export interface IAppAction {
  type: IAppActionType;
  payload?:
    | { _TYPE: IAppActionType.REMOVE_CANDIDATE; id: string }
    | {
        _TYPE: IAppActionType.ADD_CANDIDATE | IAppActionType.EDIT_CANDIDATE;
        candidate: Candidate;
      }
    | {
        _TYPE: IAppActionType.SEARCH_CANDIDATES;
        searchTerms: RegExpMatchArray | null;
      };
}
