<template>
    <b-card :img-src="`https://picsum.photos/600/300/?image=${num}`" img-alt="Image" img-top tag="article"
        style="max-width: 100%;" class="product-card mb-4 card-img-top">
        <b-card-text class="">
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <h4 class="text-truncate font-weight-bold" :title="productDetails.ProductName">
                        {{ productDetails.ProductName }}
                    </h4>
                </div>
                
                <div class="d-flex justify-content-between mt-2">
                    <div>
                        <span class="">Quantity</span>
                        <div class="mt-2" v-if="productDetails.Quantity > 0">
                            <select v-model="selectedQuantity" name="quantity" id="carquantitys" class="select">
                                <option v-for="(item, index) in limitQuantity(productDetails.Quantity)" :key="index" :value="item">{{
                                    item }}</option>
                            </select>
                        </div>
                        <div v-else>
                            <input type="number" v-model="selectedQuantity" id="quantity" name="quantity" min="1">
                            <span v-if="$v.selectedQuantity.$error && !$v.selectedQuantity.required"> This field required</span>
                            <span
                                v-if="$v.selectedQuantity.$error && $v.selectedQuantity.required && !$v.selectedQuantity.numeric">Enter
                                valid value</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="mb-0">In Stock </p>
                        <h3 class="primary-colour"> {{ productDetails.Quantity }}</h3>
                    </div>
                </div>
            </div>
        </b-card-text>
        <div>
            <b-button class="col-md-12 button-color"  v-if="productDetails.Quantity > 0" @click="buyProduct">Buy</b-button>
            <b-button class="col-md-12 button-color" v-if="productDetails.Quantity == 0" @click="restockProduct">Order</b-button>
        </div>
        <img lazy v-show="productDetails.Quantity == 0" class="out-of-stock" src="../../../static/img/out_of_stock.png" alt="out of stock"/>
    </b-card>
</template>

<script>
const { required, numeric } = require('vuelidate/lib/validators')
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);

export default {
    data() {
        return {
            quanityList: [],
            selectedQuantity: 1,
            isLoading: false,
            number: 2
        }
    },
    props: ['productDetails', 'num'],
    validations: {
        selectedQuantity: {
            required,
            numeric
        }
    },
    methods: {
        buyProduct() {
            let tmpProd = {
                selectedQuantity: this.selectedQuantity,
                ...this.productDetails
            }
            this.$emit('buyProduct', tmpProd)
        },
        restockProduct() {
            this.$v.selectedQuantity.$touch()
            if (this.$v.selectedQuantity.$invalid) {
                return false
            }
            let tmpProd = {
                selectedQuantity: this.selectedQuantity,
                ...this.productDetails
            }
            this.$emit('restockProduct', tmpProd)
        },
        limitQuantity(quantity){
            let tempQuantity = quantity
            if(quantity > 100){
                tempQuantity = 100;
            }
            return tempQuantity;
        }
    }
}

</script>