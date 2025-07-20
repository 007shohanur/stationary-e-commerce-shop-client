import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Plus } from "lucide-react";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/features/products/productsApi";
import { Product } from "@/types/types";

type FormData = {
  name: string;
  price: string;
  quantity: string;
  inStock: boolean;
  description: string;
  category: string;
  brand: string;
  productImg: string;
};

export const ProductTable = () => {
  // Use the query hook to fetch products
  const { data: productsResponse, refetch } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    quantity: "",
    inStock: false,
    description: "",
    category: "",
    brand: "",
    productImg: "",
  });

  const openModal = (product: Product | null = null) => {
    setEditingProduct(product);
    setFormData(
      product
        ? {
            name: product.name,
            price: product.price.toString(),
            quantity: product.quantity.toString(),
            inStock: product.inStock,
            description: product.description || "",
            category: product.category || "",
            brand: product.brand || "",
            productImg: product.productImg || "",
          }
        : {
            name: "",
            price: "",
            quantity: "",
            inStock: false,
            description: "",
            category: "",
            brand: "",
            productImg: "",
          }
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, inStock: e.target.checked });
  };

  const handleSave = async () => {
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price), // Convert price to a number
      quantity: parseInt(formData.quantity), // Convert quantity to a number
      inStock: formData.inStock, // Keep inStock as boolean
      description: formData.description,
      category: formData.category,
      brand: formData.brand,
      productImg: formData.productImg,
    };

    if (editingProduct) {
      await updateProduct({
        id: editingProduct._id,
        updatedProduct: productData,
      });
    } else {
      await addProduct(productData);
    }

    refetch(); // Refetch the products after saving
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    refetch(); // Refetch the products after deletion
  };

  // Debugging - Log the products data
  useEffect(() => {
    console.log("Fetched products:", productsResponse);
  }, [productsResponse]);

  // Handle the type-check and access the 'data' property if necessary
  const products =
    productsResponse && "data" in productsResponse
      ? productsResponse.data
      : productsResponse || [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl text-gray-700 font-bold">
          Manage your product inventory
        </h2>
        <Button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-purple-600 text-white hover:bg-purple-700"
        >
          <Plus size={16} />
          <span>Create Product</span>
        </Button>
      </div>

      {Array.isArray(products) && products.length > 0 ? (
        <Table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <TableHeader className="bg-gray-800 text-white font-bold">
            <TableRow>
              <TableHead className="py-4">Product ID</TableHead>
              <TableHead className="py-4">Name</TableHead>
              <TableHead className="py-4">Price</TableHead>
              <TableHead className="py-4">Quantity</TableHead>
              <TableHead className="py-4">In Stock</TableHead>
              <TableHead className="py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} className="hover:bg-gray-50">
                <TableCell className="py-4">{product._id}</TableCell>
                <TableCell className="py-4">{product.name}</TableCell>
                <TableCell className="py-4">{product.price}</TableCell>
                <TableCell className="py-4">{product.quantity}</TableCell>
                <TableCell className="py-4">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </TableCell>
                <TableCell className="flex space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => openModal(product)}
                    className="text-purple-500 hover:text-purple-700 py-4"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No Products Found</div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="bg-white p-8 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Create Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 my-4">
            <Input
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              className="py-6"
              required // Make this field required
            />
            <Input
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              className="py-6"
              required // Make this field required
            />
            <Input
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="py-6"
              required // Make this field required
            />
            <Input
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="py-6"
              required // Make this field required
            />
            <Input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleInputChange}
              className="py-6"
              required // Make this field required
            />
            <Input
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="py-6"
              required // Make this field required
            />
            <Input
              name="productImg"
              placeholder="Product Image"
              value={formData.productImg}
              onChange={handleInputChange}
              className="py-6"
              required // Make this field required
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleCheckboxChange}
              />
              <label>In Stock</label>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={closeModal}
              variant="outline"
              className="mr-2 btn-outline-purple btn-outline-purple:hover mb-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="outline"
              className="btn-outline-purple btn-outline-purple:hover mb-2"
            >
              {editingProduct ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
