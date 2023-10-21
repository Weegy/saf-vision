import OffCanvasTabs from 'src/plugin/offcanvas-tabs/offcanvas-tabs.plugin';

export default class SafOffcanvas extends OffCanvasTabs {
	_isInAllowedViewports() {
		return false;
	}
}