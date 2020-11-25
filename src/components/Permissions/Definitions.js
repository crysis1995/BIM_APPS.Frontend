export default class PermissionDefinitions {
	static Admin = 'warbud.admin';
	static All = 'warbud.*';
	static AccountPasswordReset = 'warbud.account.password.reset';
	static ProjectView = 'warbud.project.view';

	static AppsWorkProgressMonolithicCraneView = 'warbud.apps.work-progress.monolithic.crane.{id}.view';
	static AppsWorkProgressMonolithicCraneChange = 'warbud.apps.work-progress.monolithic.crane.{id}.change';
	static AppsWorkProgressMonolithicAllCraneView = 'warbud.apps.work-progress.monolithic.crane.*.view';
	static AppsWorkProgressMonolithicAllCraneChange = 'warbud.apps.work-progress.monolithic.crane.*.change';

	static AppsWorkProgressMonolithicLevelView = 'warbud.apps.work-progress.monolithic.level.{id}.view';
	static AppsWorkProgressMonolithicLevelChange = 'warbud.apps.work-progress.monolithic.level.{id}.change';
	static AppsWorkProgressMonolithicAllLevelView = 'warbud.apps.work-progress.monolithic.level.*.view';
	static AppsWorkProgressMonolithicAllLevelChange = 'warbud.apps.work-progress.monolithic.level.*.change';

	static AppsWorkProgressMonolithicRealisationView = 'warbud.apps.work-progress.monolithic.realisation.view';
	static AppsWorkProgressMonolithicRealisationElementSetStatus =
		'warbud.apps.work-progress.monolithic.realisation.{id}.set-status';
	static AppsWorkProgressMonolithicRealisationElementSetDelay =
		'warbud.apps.work-progress.monolithic.realisation.{id}.set-delay';
	static AppsWorkProgressMonolithicRealisationAllSetStatus =
		'warbud.apps.work-progress.monolithic.realisation.*.set-status';
	static AppsWorkProgressMonolithicRealisationAllSetDelay =
		'warbud.apps.work-progress.monolithic.realisation.*.set-delay';

	static AppsWorkProgressMonolithicTermsView = 'warbud.apps.work-progress.monolithic.terms.view';
	static AppsWorkProgressMonolithicTermsGroupView = 'warbud.apps.work-progress.monolithic.terms.{id}.view';
	static AppsWorkProgressMonolithicTermsAllView = 'warbud.apps.work-progress.monolithic.terms.*.view';
	static AppsWorkProgressMonolithicTermsGroupEdit = 'warbud.apps.work-progress.monolithic.terms.{id}.edit';
	static AppsWorkProgressMonolithicTermsAllEdit = 'warbud.apps.work-progress.monolithic.terms.*.edit';

	static toSpecificElement(permission, ...ids) {
		return ids.reduce((prev, ac) => prev.replace('{id}', ac), permission);
	}
}
