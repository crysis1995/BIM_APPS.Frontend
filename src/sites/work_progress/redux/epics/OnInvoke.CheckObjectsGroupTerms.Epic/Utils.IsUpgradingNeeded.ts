import { GetAllAcceptanceTermsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetAcceptanceTerms';

export function isUpgradingNeeded(term: GetAllAcceptanceTermsType.AcceptanceTerm) {
	return term.REAL_START === null || term.REAL_FINISH === null;
}