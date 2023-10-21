import template from './saf-vision-admin.html.twig';

const {Criteria} = Shopware.Data;

const {Component} = Shopware;

Component.register('saf-vision-admin', {
	template,
	inject: ['repositoryFactory', 'feature', 'syncService', 'loginService'],
	data() {
		return {
			creditScore: "",
			customer: "",
			customerOrders: [],
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
		orderColumns() {
			return this.getOrderColumns();
		},
		addressRepository() {
			return this.repositoryFactory.create('order_address');
		},
		customerRepository() {
			return this.repositoryFactory.create('customer');
		},
		orderRepository() {
			return this.repositoryFactory.create('order');
		}

	},

	created: function () {
		this.loadCustomer();
	},

	methods: {
		getOrderColumns() {
			return [{
				property: 'orderNumber',
				label: 'sw-customer.detailOrder.columnNumber',
				align: 'center',
			}, {
				property: 'amountTotal',
				label: 'sw-customer.detailOrder.columnAmount',
				align: 'right',
			}, {
				property: 'stateMachineState.name',
				label: 'sw-customer.detailOrder.columnOrderState',
			}, {
				property: 'orderDateTime',
				label: 'sw-customer.detailOrder.columnOrderDate',
				align: 'center',
			}];
		},
		loadCustomer() {
			return this.customerRepository.get(
				this.order.orderCustomer.customerId,
				Shopware.Context.api
			).then((customer) => {
				this.customer = customer;
				this.loadOrdersForCustomer();
				this.creditScore = this.customer.customFields?.custom_boni_state_json ?? "Keine Informationen verfügbar"
			});
		},
		checkCreditLimit() {
			const httpClient = this.syncService.httpClient;
			httpClient.post(`/_action/safdeliverydate/boni`, {
				customerId: this.order.orderCustomer.customerId,
			}).then((data) => this.creditScore = data.data.custom_boni_state_json).catch(() => {

			});

		},
		loadOrdersForCustomer() {

			let criteria = new Criteria(1, 25);
			if (!this.customerOrders || !this.customerOrders.criteria) {
				criteria.addFilter(Criteria.equals('order.orderCustomer.customerId', this.customer.id));
			} else {
				criteria = this.orders.criteria;
			}
			criteria.addAssociation('stateMachineState')
				.addAssociation('currency');

			this.orderRepository.search(criteria).then((orders) => {
				this.customerOrders = orders;
				this.isLoading = false;
			});
		}
	}
});