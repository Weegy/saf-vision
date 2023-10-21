!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p=(window.__sw__.assetPath + '/bundles/safvision/'),t(t.s="wDg5")}({wDg5:function(e,r,t){"use strict";t.r(r);var n=Shopware.Data.Criteria;Shopware.Component.register("saf-vision-admin",{template:'<sw-card class="sw-order-delivery-metadata" title="Kundendaten">\n    <router-link :to="{ name: \'sw.customer.detail\', params: { id: this.order.orderCustomer.customerId } }">\n        Zu den Details von {{ this.order.orderCustomer.firstName }} {{ this.order.orderCustomer.lastName }}\n    </router-link>\n    <br>\n    <br>\n    <hr>\n    <sw-description-list>\n        <dt>Bonitätsprüfung</dt>\n        <dd>\n            <sw-button\n                    class="sw-order-list__add-order"\n                    variant="primary"\n                    @click="checkCreditLimit()"\n            >\n                Starten\n            </sw-button>\n        </dd>\n    </sw-description-list>\n    <sw-description-list>\n        <dd>\n            <span v-html="creditScore"></span>\n        </dd>\n    </sw-description-list>\n    <hr>\n    <sw-description-list>\n        <dt>alle Bestellungen des Kunden</dt>\n\n        <sw-entity-listing\n                    :columns="orderColumns"\n                    :repository="orderRepository"\n                    :items="customerOrders"\n                    :allow-column-edit="false"\n                    :show-settings="false"\n                    :show-selection="false"\n                    :full-page="false"\n                    :is-loading="isLoading"\n            >\n                \n                {% block sw_customer_detail_order_card_grid_columns %}\n                    \n                    {% block sw_customer_detail_order_card_grid_columns_number %}\n                        <template #column-orderNumber="{ item }">\n                            <router-link :to="{ name: \'sw.order.detail\', params: { id: item.id } }">\n                                {{ item.orderNumber }}\n                            </router-link>\n                        </template>\n                    {% endblock %}\n\n                    \n                    {% block sw_customer_detail_order_card_grid_columns_amount %}\n                        <template #column-amountTotal="{ item }">\n                           {{  item.amountTotal}}\n                        </template>\n                    {% endblock %}\n\n                    \n                    {% block sw_customer_detail_order_card_grid_columns_order_date_time %}\n                        <template #column-orderDateTime="{ item }">\n                            <sw-time-ago :date="item.orderDateTime" />\n                        </template>\n                    {% endblock %}\n                {% endblock %}\n\n                \n                {% block sw_customer_detail_order_card_grid_columns_action %}\n                    <template #actions="{ item }">\n                        \n                        {% block sw_customer_detail_order_card_grid_columns_action_button %}\n                            <sw-context-menu-item\n                                    class="sw-order-list-order-view-action"\n                                    :router-link="{ name: \'sw.order.detail\', params: { id: item.id } }"\n                            >\n                                {{ $tc(\'sw-customer.detailOrder.columnContextOpenOrder\') }}\n                            </sw-context-menu-item>\n                        {% endblock %}\n                    </template>\n                {% endblock %}\n            </sw-entity-listing>\n    </sw-description-list>\n</sw-card>',inject:["repositoryFactory","feature","syncService","loginService"],data:function(){return{creditScore:"",customer:"",customerOrders:[]}},props:{order:{type:Object,required:!0,default:function(){return{}}},address:{type:Object,required:!1,default:function(){return{}}}},computed:{orderColumns:function(){return this.getOrderColumns()},addressRepository:function(){return this.repositoryFactory.create("order_address")},customerRepository:function(){return this.repositoryFactory.create("customer")},orderRepository:function(){return this.repositoryFactory.create("order")}},created:function(){this.loadCustomer()},methods:{getOrderColumns:function(){return[{property:"orderNumber",label:"sw-customer.detailOrder.columnNumber",align:"center"},{property:"amountTotal",label:"sw-customer.detailOrder.columnAmount",align:"right"},{property:"stateMachineState.name",label:"sw-customer.detailOrder.columnOrderState"},{property:"orderDateTime",label:"sw-customer.detailOrder.columnOrderDate",align:"center"}]},loadCustomer:function(){var e=this;return this.customerRepository.get(this.order.orderCustomer.customerId,Shopware.Context.api).then((function(r){var t,n;e.customer=r,e.loadOrdersForCustomer(),e.creditScore=null!==(t=null===(n=e.customer.customFields)||void 0===n?void 0:n.custom_boni_state_json)&&void 0!==t?t:"Keine Informationen verfügbar"}))},checkCreditLimit:function(){var e=this;this.syncService.httpClient.post("/_action/safdeliverydate/boni",{customerId:this.order.orderCustomer.customerId}).then((function(r){return e.creditScore=r.data.custom_boni_state_json})).catch((function(){}))},loadOrdersForCustomer:function(){var e=this,r=new n(1,25);this.customerOrders&&this.customerOrders.criteria?r=this.orders.criteria:r.addFilter(n.equals("order.orderCustomer.customerId",this.customer.id)),r.addAssociation("stateMachineState").addAssociation("currency"),this.orderRepository.search(r).then((function(r){e.customerOrders=r,e.isLoading=!1}))}}}),Shopware.Component.override("sw-order-detail-general",{template:'{% block sw_order_detail_general_info_card %}\n    {% parent %}\n    <saf-vision-admin :order="order"></saf-vision-admin>\n{% endblock %}'},{})}});