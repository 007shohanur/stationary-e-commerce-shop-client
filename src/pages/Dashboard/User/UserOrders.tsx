
import { RootState } from "@/app/store";
import Loading from "@/components/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchUserOrdersQuery } from "@/features/orders/orderApi";
import { useSelector } from "react-redux";

export const UserOrders = () => {
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  // Fetching orders for the user with email passed as a prop
  const { data, error, isLoading } = useFetchUserOrdersQuery(
    userEmail as string
  );

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading orders</div>;

  const orders = data?.data || [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full border border-gray-200 rounded-lg">
          <TableHeader className="bg-gray-800 text-white">
            <TableRow>
              <TableHead className="py-4">Order ID</TableHead>
              <TableHead className="py-4">Product ID</TableHead>
              <TableHead className="py-4">Quantity</TableHead>
              <TableHead className="py-4">Total Price</TableHead>
              <TableHead className="py-4">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.length > 0 ? (
              orders.map((order: any) => (
                <TableRow key={order._id} className="hover:bg-gray-50">
                  <TableCell className="py-4">{order._id}</TableCell>
                  <TableCell className="py-4">{order.product}</TableCell>
                  <TableCell className="py-4">{order.quantity}</TableCell>
                  <TableCell className="py-4">{order.totalPrice}</TableCell>
                  <TableCell
                    className={`py-4 font-medium ${
                      order.status === "Pending"
                        ? "text-yellow-600"
                        : order.status === "Shipping"
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
                  >
                    {order.status}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-16 text-gray-500 text-lg">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

