import { RootState } from "@/app/store";
import Loading from "@/components/Loading";
import { Card, CardContent } from "@/components/ui/card";
import { useFetchUserOrdersQuery } from "@/features/orders/orderApi";
import { useSelector } from "react-redux";
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

const COLORS = ["#6366F1", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

export const UserCharts = () => {
  const email = useSelector((state: RootState) => state.auth.user?.email)!;
  const { data, isLoading, error } = useFetchUserOrdersQuery(email);

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading your orders.</div>;

  const orders = data?.data || [];

  // Aggregate data
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const statusCount: Record<string, number> = {};
  orders.forEach((o) => {
    statusCount[o.status] = (statusCount[o.status] || 0) + 1;
  });
  const statusData = Object.entries(statusCount).map(([status, count]) => ({
    name: status,
    value: count,
  }));
  const spendingData = orders.map((o, i) => ({
    name: `Order ${i + 1}`,
    totalPrice: o.totalPrice,
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-white shadow-md border border-gray-200">
          <CardContent className="p-6">
            <p className="text-lg text-gray-500 pb-2">Total Orders</p>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md border border-gray-200">
          <CardContent className="p-6">
            <p className="text-lg text-gray-500 pb-2">Total Spent</p>
            <p className="text-2xl font-bold">৳ {totalSpent}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        {/* Order status distribution */}
        <Card className="h-[450px] bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <CardContent className="flex flex-col justify-between h-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Order Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={
                    statusData.length
                      ? statusData
                      : [{ name: "No Data", value: 1 }]
                  }
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) =>
                    statusData.length ? `${name} (${value})` : ""
                  }
                  labelLine={false}
                >
                  {(statusData.length
                    ? statusData
                    : [{ name: "No Data", value: 1 }]
                  ).map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={
                        statusData.length
                          ? COLORS[idx % COLORS.length]
                          : "#E5E7EB"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center text-sm text-gray-500">By status</div>
          </CardContent>
        </Card>

        {/* Spending over orders */}
        <Card className="h-[450px] bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <CardContent className="flex flex-col justify-between h-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Spending by Order
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={
                  spendingData.length
                    ? spendingData
                    : [{ name: "No Data", totalPrice: 0 }]
                }
              >
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalPrice" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center text-sm text-gray-500">
              Each bar represents one order
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
