import './2D3DSwitch.scss';
import Store from '../../../../store';
import ForgeViewerActions from '../../redux/actions';

export class Switch2D3DViewExtension extends Autodesk.Viewing.Extension {
	// private control: Autodesk.Viewing.UI.Control;
	private button3D: Autodesk.Viewing.UI.Button | undefined;
	constructor(viewer: Autodesk.Viewing.GuiViewer3D, options: any) {
		super(viewer, options);
	}

	load(): boolean | Promise<boolean> {
		console.log('loaded Switch2D3DViewExtension');
		return true;
	}
	unload(): boolean {
		console.log('unloaded Switch2D3DViewExtension');
		return true;
	}
	onToolbarCreated(toolbar?: Autodesk.Viewing.UI.ToolBar) {
		var viewer = this.viewer;

		this.button3D = new Autodesk.Viewing.UI.Button('button_3d');
		this.button3D.setDisplay('3D');
		this.button3D.setIcon('view_3d');
		this.button3D.addEventListener('click', () => this.handleClickButton());

		const subToolbar = new Autodesk.Viewing.UI.ControlGroup('9f2f5e30-901d-4e2f-b05e-2e60d2ec5b41');
		subToolbar.addControl(this.button3D);

		toolbar?.addControl(subToolbar);
	}

	private handleClickButton() {
		if (this.button3D) {
			if (this.button3D.getState() === 1) {
				this.button3D.setState(0);
				Store.dispatch(ForgeViewerActions.Activate3DView());
			} else {
				this.button3D.setState(1);
				Store.dispatch(ForgeViewerActions.Inactivate3DView());
			}
		}
	}

	static register() {
		Autodesk.Viewing.theExtensionManager.registerExtension('Switch2D3DViewExtension', Switch2D3DViewExtension);
	}
}
