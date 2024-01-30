import http, { http1 } from "../http-product";

class ProductService {
    getAll(){
        return http.get("/products");
    }

    getSingleProduct(id){
        return http.get(`/products/${id}`);
    }

    getCategory(){
        return http.get("/products/categories");
    }

    getProductsByCategory(cat){
        return http.get(`/products/category/${cat}`);
    }

    addProduct(data){
        return http1.post("/products", data);
    }
    
    signup(data){
        return http1.post("/signup", data);
    }

    signin(data){
        return http1.post("/signin", data);
    }

    // update({id, data}){
    //     return http.patch(`/posts/${id}`, data);
    // }

    delete(id){
        return http.delete(`/products/${id}`);
    }
}

export default new ProductService();