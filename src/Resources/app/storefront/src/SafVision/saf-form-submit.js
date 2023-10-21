import FormCmsHandler
	from "src/plugin/forms/form-cms-handler.plugin";

export default class SafFormSubmit extends FormCmsHandler {
	_handleResponse(res) {
		const response = JSON.parse(res);
		this.$emitter.publish('onFormResponse', res);

		if (response.length > 0) {
			let changeContent = true;
			let content = '';
			for (let i = 0; i < response.length; i += 1) {
				if (response[i].type === 'danger' || response[i].type === 'info') {
					changeContent = false;
				}
				content += response[i].alert;
			}
			document.getElementById("saf-vision-form").style.display = "none";
			this._createResponse(changeContent, content);
		} else {
			window.location.reload();
		}
	}
}
