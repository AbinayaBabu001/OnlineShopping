<template>
    <div class="container ">
        <div class="d-flex flex-wrap justify-content-between product-wrapper row">
            <div v-for="(item, index) in showProductList" :key=index class="col-4">
                <card class="" @buyProduct="orderProduct" @restockProduct="restockProduct" @editPrd="editProduct" :num="imgOrder + index + pageNumber" :productDetails="item"></card>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <b-pagination @input="linkGen" v-model="pageNumber" :total-rows="productList.length" :per-page="pageSize"
                aria-controls="my-table"></b-pagination>
        </div>
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true" color="#0069d9"></loading>
    </div>
</template>

<script>

const Card = () => import("@/components/product/card.vue")
const Loading = () => import('vue-loading-overlay')

export default {
    data() {
        return {
            productList: [],
            showProductList: [],
            pageSize: 12,
            pageNumber: 1,
            isLoading: false,
            imgOrder: 12,
            min: 1,
            max: 8,
            selectedProduct: {}
        }
    },
    components: {
        Card,
        Loading
    },
    methods: {
        orderProduct(product) {
            let tmpProduct = {
                productId: product.ProductId,
                quantity: product.selectedQuantity,
                customerId: "f9e86959-d568-44b9-2087-08dc44a8c8ef",

            }
            this.isLoading = true



            this.$store.dispatch('shopping/orderProduct', tmpProduct)
                .then(() => {
                    this.isLoading = false
                    this.getProducts()
                    this.$bvToast.toast(`${product.productName || ''} Purchased successfully`, {
                        title: 'Success',
                        toaster: 'b-toaster-top-center',
                        variant: 'success',
                        solid: true
                    })
                })
                .catch(() => {
                    this.isLoading = false
                })
            if (product.selectedQuantity == product.Quantity) {
                this.imgOrder = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
            }
        },
        getProducts() {
            this.isLoading = true
            this.$store.dispatch('shopping/getProductList')
                .then(res => {
                    this.isLoading = false
                    this.productList = []                    

                    this.productList = res.data.filter(s => s.IsActive == true && s.Quantity > 0)

                    this.showProductList = this.productList.slice(((this.pageSize * this.pageNumber) - 12), this.pageSize * this.pageNumber)
                })
                .catch(() => {
                    this.isLoading = false
                })
        },
        linkGen(pageNum) {
            this.isLoading = true
            this.pageNumber = pageNum
            this.showProductList = this.productList.slice(((this.pageSize * this.pageNumber) - 12), this.pageSize * this.pageNumber)
            this.isLoading = false

        },
        restockProduct(product){
            let tmpProduct = {
                productId: product.ProductId,
                quantity: product.selectedQuantity,
                customerId: "f9e86959-d568-44b9-2087-08dc44a8c8ef",

            }
            this.isLoading = true



            this.$store.dispatch('shopping/orderProduct', tmpProduct)
                .then(() => {
                    this.isLoading = false
                    this.getProducts()
                    this.$bvToast.toast(`${product.productName || ''} purchased successfully`, {
                        title: 'Success',
                        toaster: 'b-toaster-top-center',
                        variant: 'success',
                        solid: true
                    })
                })
                .catch(() => {
                    this.isLoading = false
                })
            if (product.selectedQuantity == product.Quantity) {
                this.imgOrder = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
            }
        },
        editPrd(product){
            this.selectedProduct = product
        }
    },
    created() {
        this.getProducts()
    }
}
</script>

