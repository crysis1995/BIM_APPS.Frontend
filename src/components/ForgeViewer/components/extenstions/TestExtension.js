import { ACCEPTANCE_TYPE } from '../../../../sites/work_progress/redux/types/constans';
import Store from '../../../../store';
import ReactPanel from './ReactPanel';

const Autodesk = window.Autodesk;

class ReactPanelExtension extends Autodesk.Viewing.Extension {
	/**
	 * Konstruktor
	 *
	 * @param viewer
	 * @param options
	 */
	constructor(viewer, options) {
		super(viewer, options);
		this.panel = new ReactPanel(viewer, {
			id: 'react-panel-id',
			title: 'Legenda',
		});
		Store.subscribe(() => {
			// let isActive;
			if (this.panel) {
				const { active_acceptance_type } = Store.getState().Odbiory.OdbioryComponent;
				const { panel_is_active } = Store.getState().ForgeViewer;
				if (active_acceptance_type === ACCEPTANCE_TYPE.MONOLITHIC) {
					this.panel.setVisible(panel_is_active);
				}

				// if (status === 'color') isActive = true;
				// if (status === 'clean') isActive = false;
				// this.panel.setVisible(isActive);
			}
		});
	}

	/**
	 *  Callback
	 *
	 * @returns {boolean}
	 */
	load() {
		console.log('Viewing.Extension.ReactPanel loaded');

		return true;
	}

	/**
	 *
	 *
	 * @returns {string}
	 * @constructor
	 */
	static get ExtensionId() {
		return 'Viewing.Extension.ReactPanel';
	}

	/**
	 *
	 *
	 * @param toolbar
	 */
	onToolbarCreated(toolbar) {
		var viewer = this.viewer;
		var panel = this.panel;

		var panelIsActive = false;
		// Button 1
		var button1 = new Autodesk.Viewing.UI.Button('show-env-bg-button');
		button1.onClick = function (e) {
			if (panelIsActive) {
				panel.setVisible(!panelIsActive);
				panelIsActive = !panelIsActive;
				return;
			}
			panel.setVisible(!panelIsActive);
			panelIsActive = !panelIsActive;
		};
		button1.addClass('show-env-bg-button');
		button1.setToolTip('Pokaż legendę');

		// SubToolbar
		this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-toolbar');
		this.subToolbar.addControl(button1);

		toolbar.addControl(this.subToolbar);
	}

	/**
	 * Unload callback
	 *
	 * @returns {boolean}
	 */
	unload() {
		console.log('Viewing.Extension.ReactPanel unloaded');
		if (this.subToolbar) {
			this.viewer.toolbar.removeControl(this.subToolbar);
			this.subToolbar = null;
			this.panel = null;
		}
		return true;
	}
}

Autodesk.Viewing.theExtensionManager.registerExtension(ReactPanelExtension.ExtensionId, ReactPanelExtension);

export default ReactPanelExtension;
