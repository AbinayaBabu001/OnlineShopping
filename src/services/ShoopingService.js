import Request from '@/helpers/BaseService'

class ShoopingService extends Request {
    fetchProductList() {
        return this.submit('get','Product/GetAllProduct')
    }
    reStock(data) {
        return this.submit('post','Product/AddProduct', data)
    }
    orderProduct(data) {
        return this.submit('post','Order/AddOrder',data)
    }
    editProduct(data) {
        return this.submit('put','Product/EditProduct',data)
    }

}

export default ShoopingService