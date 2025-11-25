import { useEffect, useState } from "react";
import ProductForm from "./ProductForm"
import ProductList from "./ProductList"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import axios from "axios";

function Product() {

    const BASE_URL=import.meta.env.VITE_BASE_API_URL+ '/products';

    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [editData,setEditData]=useState(null);

    useEffect(()=>{
        try {
            const loadProducts=async ()=>{
                var productsData=(await axios.get(`${BASE_URL}`)).data;
                console.log(productsData);
                setProducts(productsData);
             }

            loadProducts();

        } catch (error) {
            console.error("Error occurred while fetching:", error);
            toast.error(`Error occurred while fetching the products.`);
        }finally{
            setLoading(false);
        }
        

    },[]);

    useEffect((product)=>{
        methods.reset(editData);
    },[editData]);


    const defultValues = {
        id: 0,
        name: "",
        unitPrice: 0
    };
    const methods= useForm(
    { defaultValues: defultValues }
  )

  const onSubmit = async (product) => {
    try {
        setLoading(true);
        if(product.id<1){
            console.log("Create product",product);
            const createdProduct=(await (axios.post(`${BASE_URL}`,product))).data;
            setProducts((prevProduct)=>[...prevProduct,createdProduct])
        }else{
            console.log("Update product",product);
            const editedProduct=(await (axios.put(`${BASE_URL}/${product.id}`,product))).data;
            setProducts((prevProducts)=>prevProducts.map((p)=>(p.id===product.id ? product : p)))
        }
        methods.reset(defultValues);
        toast.success(`Saved successfully.`);
    } catch (error) {
        console.error("Error occurred while saving the product:", error);
        toast.error(`Error occurred while saving the product.`);
    }finally{
        setLoading(false);
    }

  }
  const onFormReset = () => methods.reset(defultValues)

   

    const handleEdit=(product)=>{
        setEditData(product);
    }

    const handleDelete=(product)=>{
        if(!confirm(`Are you sure you want to delete the product "${product.name}"?`)){
            return;
        }
        try {
            setLoading(true);
            setProducts((prevProducts)=>prevProducts.filter((p)=>p.id!==product.id))
            toast.success(`Product "${product.name}" deleted successfully.`);
        } catch (error) {
            toast.error(`Error occurred while deleting the product.`);
        }finally{
            setLoading(false);
        }
        
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Product Management
                    </h1>

                </div>
                {loading && <p>Loading...</p>}
                {!loading && <>
                <ProductForm methods={methods} onSubmit={onSubmit} onFormReset={onFormReset}/>
                <ProductList products={products} onProductEdit={handleEdit} onProductDelete={handleDelete} />
                </>}
            </div>
        </div>
    )
}

export default Product