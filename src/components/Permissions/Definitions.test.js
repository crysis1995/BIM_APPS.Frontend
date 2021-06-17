import PermissionDefinitions from './Definitions';

describe('epic.test PermissionDefinitions class', () => {
	describe('epic.test toSpecificElement method', () => {
		test('for one replacement', () => {
			const actual = PermissionDefinitions.toSpecificElement('epic.test.test2.asd-asd.{id}.asd.ttt', '1');
			const expected = 'epic.test.test2.asd-asd.{id}.asd.ttt'.replace('{id}', '1');
			expect(actual).toEqual(expected);
		});
		test('for many replacements', () => {
			const actual = PermissionDefinitions.toSpecificElement(
				'epic.test.{id}.asd-asd.{id}.asd.{id}',
				'1',
				'123',
				'888',
			);
			let expected = 'epic.test.{id}.asd-asd.{id}.asd.{id}'.replace('{id}', '1');
			expected = expected.replace('{id}', '123');
			expected = expected.replace('{id}', '888');
			expect(actual).toEqual(expected);
		});
	});

	describe('epic.test class constant', () => {
		test('Admin', () => {
			const expected = 'warbud.admin';
			const actual = PermissionDefinitions.Admin;
			expect(actual).toEqual(expected);
		});
		test('All', () => {
			const expected = 'warbud.*';
			const actual = PermissionDefinitions.All;
			expect(actual).toEqual(expected);
		});
		test('AccountPasswordReset', () => {
			const expected = 'warbud.account.password.reset';
			const actual = PermissionDefinitions.AccountPasswordReset;
			expect(actual).toEqual(expected);
		});
		test('ProjectView', () => {
			const expected = 'warbud.project.view';
			const actual = PermissionDefinitions.ProjectView;
			expect(actual).toEqual(expected);
		});
		test('AppsWorkProgressMonolithicCraneView', () => {
			const expected = 'warbud.apps.work-progress.monolithic.crane.{id}.view';
			const actual = PermissionDefinitions.AppsWorkProgressMonolithicCraneView;
			expect(actual).toEqual(expected);
		});
		test('AppsWorkProgressMonolithicCraneChange', () => {
			const expected = 'warbud.apps.work-progress.monolithic.crane.{id}.change';
			const actual = PermissionDefinitions.AppsWorkProgressMonolithicCraneChange;
			expect(actual).toEqual(expected);
		});
		test('AppsWorkProgressMonolithicLevelView', () => {
			const expected = 'warbud.apps.work-progress.monolithic.level.{id}.view';
			const actual = PermissionDefinitions.AppsWorkProgressMonolithicLevelView;
			expect(actual).toEqual(expected);
		});
		test('AppsWorkProgressMonolithicLevelChange', () => {
			const expected = 'warbud.apps.work-progress.monolithic.level.{id}.change';
			const actual = PermissionDefinitions.AppsWorkProgressMonolithicLevelChange;
			expect(actual).toEqual(expected);
		});
		test('AppsWorkProgressMonolithicRealisationView', () => {
			const expected = 'warbud.apps.work-progress.monolithic.realisation.view';
			const actual = PermissionDefinitions.AppsWorkProgressMonolithicRealisationView;
			expect(actual).toEqual(expected);
		});
		test('AppsWorkProgressMonolithicRealisationElementSetStatus', () => {
			const expected = 'warbud.apps.work-progress.monolithic.realisation.{id}.set-status';
			const actual = PermissionDefinitions.AppsWorkProgressMonolithicRealisationElementSetStatus;
			expect(actual).toEqual(expected);
		});
		test('AppsWorkProgressMonolithicRealisationElementSetDelay', () => {
			const expected = 'warbud.apps.work-progress.monolithic.realisation.{id}.set-delay';
			const actual = PermissionDefinitions.AppsWorkProgressMonolithicRealisationElementSetDelay;
			expect(actual).toEqual(expected);
		});
		test('AppsWorkProgressMonolithicTermsView', () => {
			const expected = 'warbud.apps.work-progress.monolithic.terms.view';
			const actual = PermissionDefinitions.AppsWorkProgressMonolithicTermsView;
			expect(actual).toEqual(expected);
		});
		test('AppsWorkProgressMonolithicTermsGroupView', () => {
			const expected = 'warbud.apps.work-progress.monolithic.terms.{id}.view';
			const actual = PermissionDefinitions.AppsWorkProgressMonolithicTermsGroupView;
			expect(actual).toEqual(expected);
		});
		test('AppsWorkProgressMonolithicTermsGroupEdit', () => {
			const expected = 'warbud.apps.work-progress.monolithic.terms.{id}.edit';
			const actual = PermissionDefinitions.AppsWorkProgressMonolithicTermsGroupEdit;
			expect(actual).toEqual(expected);
		});
	});
});
