import SafVisionPlugin from './SafVision/saf-vision.plugin';
import SafOffcanvas from "./SafVision/saf-offcanvas";
import SafFormSubmit from "./SafVision/saf-form-submit";

// Register your plugin via the existing PluginManager
const PluginManager = window.PluginManager;
PluginManager.register('SafVisionPlugin', SafVisionPlugin);
PluginManager.override('OffCanvasTabs', SafOffcanvas, '[data-offcanvas-tabs]');
PluginManager.override('FormCmsHandler', SafFormSubmit, '.cms-element-form form');