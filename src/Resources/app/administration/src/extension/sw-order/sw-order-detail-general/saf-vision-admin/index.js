import template from './saf-vision-admin.html.twig';

const {Criteria} = Shopware.Data;

const {Component} = Shopware;

Component.register('saf-vision-admin', {
	template,
	inject: ['repositoryFactory', 'feature', 'syncService', 'loginService'],
	data() {
		return {
			creditScore: "",
			customer: ""
		}

	},
	props: {
		order: {
			type: Object,
			required: true,
			default() {
				return {};
			}
		},
		address: {
			type: Object,
			required: false,
			default() {
				return {};
			}
		}
	},
	computed: {
		addressRepository() {
			return this.repositoryFactory.create('order_address');
		},
		customerRepository() {
			return this.repositoryFactory.create('customer');
		}
	},

	created: function () {
		this.loadCustomer();
	},

	methods: {

		loadCustomer() {
			return this.customerRepository.get(
				this.order.orderCustomer.customerId,
				Shopware.Context.api
			).then((customer) => {
				this.customer = customer;
				this.creditScore = this.customer.customFields?.custom_boni_state_json ?? "Keine Informationen verfügbar"
			});
		},
		checkCreditLimit() {
			const httpClient = this.syncService.httpClient;
			httpClient.post(`/_action/safdeliverydate/boni`, {
				customerId: this.order.orderCustomer.customerId,
			}).then((data) => this.creditScore = data.data.custom_boni_state_json).catch(() => {

			});

		}
	}
});