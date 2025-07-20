import { Card, CardContent } from "@/components/ui/card";
import { useGetProductsQuery } from "@/features/products/productsApi";
import { Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

export default function AdminCharts() {
  const { data: productsResponse, isLoading } = useGetProductsQuery();

  const products =
    productsResponse && "data" in productsResponse
      ? productsResponse.data
      : productsResponse || [];

  // Chart Data: Group by category
  const categoryMap: Record<string, number> = {};
  let totalInventoryValue = 0;
  let totalProducts = 0;
  let totalInStock = 0;

  products.forEach((product) => {
    categoryMap[product.category] = (categoryMap[product.category] || 0) + 1;
    totalInventoryValue += product.price * product.quantity;
    totalProducts += 1;
    if (product.inStock) totalInStock += 1;
  });

  const categoryData = Object.entries(categoryMap).map(([category, count]) => ({
    name: category,
    value: count,
  }));

  const priceData = products.map((product) => ({
    name: product.name,
    price: product.price,
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-8 h-8 text-purple-600" />
        </div>
      ) : (
        <>
          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-white shadow-md border border-gray-200">
              <CardContent className="p-6">
                <p className="text-lg text-gray-500 pb-2">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md border border-gray-200">
              <CardContent className="p-6">
                <p className="text-lg text-gray-500 pb-2">
                  Total Inventory Value
                </p>
                <p className="text-2xl font-bold">৳ {totalInventoryValue}</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md border border-gray-200">
              <CardContent className="p-6">
                <p className="text-lg text-gray-500 pb-2">In Stock Products</p>
                <p className="text-2xl font-bold">{totalInStock}</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {/* Pie Chart by Category */}
            <Card className="h-[500px] bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <CardContent className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    Product Category Distribution
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={categoryData}
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name }) => name}
                      labelLine={false}
                    >
                      {categoryData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            [
                              "#6366F1",
                              "#3B82F6",
                              "#10B981",
                              "#F59E0B",
                              "#EF4444",
                            ][index % 5]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      wrapperClassName="bg-white rounded-md px-4 py-2 shadow text-sm"
                      contentStyle={{
                        borderRadius: "8px",
                        borderColor: "#E5E7EB",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-6 text-sm text-gray-500 text-center">
                  Showing category breakdown for {categoryData.length}{" "}
                  categories
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart by Price */}
            <Card className="h-[500px] bg-white py-6 px-2">
              <CardContent className="h-full">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Price Comparison
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priceData}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="price" fill="#845ef7" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
