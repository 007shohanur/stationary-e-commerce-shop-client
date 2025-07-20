import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

import { Order } from "@/types/types"; 
import { useFetchOrdersQuery, useOrderStatusMutation } from "@/features/orders/orderApi";
import Loading from "@/components/Loading";

export const OrderTable = () => {
  // Redux query hook to fetch orders
  const { data, isLoading, isError, error, refetch } = useFetchOrdersQuery();

  const [updateOrder] = useOrderStatusMutation()

  // Handle the approve action 
  const handleApprove = async (id: string) => {
    const orderData = {
      orderId: id,
      status: "Shipped",
      
    };
    await updateOrder(orderData);
  

    refetch();
  };

  // Handle loading and error states
  if (isLoading) return <Loading/>;

  // Accessing the error correctly for FetchBaseQueryError type
  const errorMessage = isError
    ? (error as { status: number; data: { message: string } }).data?.message
    : null;

  if (errorMessage) return <div>Error: {errorMessage}</div>;

  const orders: Order[] = data?.data ? data.data : [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Orders</h2>
      </div>

      <Table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-800 text-white font-bold">
          <TableRow>
            <TableHead className="py-4">Order ID</TableHead>
            <TableHead className="py-4">Customer</TableHead>
            <TableHead className="py-4">Quantity</TableHead>
            <TableHead className="py-4">Status</TableHead>
            <TableHead className="py-4">Total Price</TableHead>
            <TableHead className="py-4">Created At</TableHead>
            <TableHead className="py-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <>
                <TableRow key={order._id} className="hover:bg-gray-50">
                  <TableCell className="py-4">{order._id}</TableCell>
                  <TableCell className="py-4">{order.email}</TableCell>
                  <TableCell className="py-4">{order.quantity}</TableCell>
                  <TableCell className="py-4">{order.status}</TableCell>
                  <TableCell className="py-4">
                    ${order.totalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="py-4">
                    <Button
                      variant="ghost"
                      onClick={() => handleApprove(order._id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <CheckCircle size={16} /> Approve
                    </Button>
                  </TableCell>
                </TableRow>
                
              </>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
