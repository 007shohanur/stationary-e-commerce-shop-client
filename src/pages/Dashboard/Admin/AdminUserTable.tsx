import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useGetAllUsersQuery, useUpdateProfileMutation } from "@/features/auth/authApi";
import Loading from "@/components/Loading";

export const UserTable = () => {
  // Fetch users using the useGetAllUsersQuery hook
  const { data, isLoading, isError, refetch } = useGetAllUsersQuery();

  const [updateUser]=useUpdateProfileMutation()

  const users = data?.users || []; // data is now an object with the 'users' array

  const handleDeactivate =async (user: any) => {
    const userData = {
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      profilePic: user.profilePic,
      status: user.status=="Active" ? "Deactive": "Active",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      
    };
    await updateUser(userData);
  

    refetch(); // Refetch the users after saving
  };

  if (isLoading) {
    return <Loading/>; // Show loading indicator while users are being fetched
  }

  if (isError) {
    return <div>Error fetching users</div>; // Handle the error scenario
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage your user accounts</h2>
      </div>

      <Table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-800 text-white font-bold">
          <TableRow>
            <TableHead className="py-4">User ID</TableHead>
            <TableHead className="py-4">Name</TableHead>
            <TableHead className="py-4">Email</TableHead>
            <TableHead className="py-4">Role</TableHead>
            <TableHead className="py-4">Phone</TableHead>
            <TableHead className="py-4">Status</TableHead>
            <TableHead className="py-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {users?.length ? (
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user._id} className="hover:bg-gray-50">
                <TableCell className="py-4">{user._id}</TableCell>
                <TableCell className="py-4">{user.name}</TableCell>
                <TableCell className="py-4">{user.email}</TableCell>
                <TableCell className="py-4 capitalize">{user.role}</TableCell>
                <TableCell className="py-4">{user.phone || "N/A"}</TableCell>
                <TableCell className="py-4">{user.status}</TableCell>
                <TableCell className="flex space-x-2 py-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleDeactivate(user)}
                    className="text-purple-500 hover:text-blue-700"
                  >
                    <Edit size={16} /> Deactivate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <div className="py-4 text-center">No User Found</div>
        )}
      </Table>
    </div>
  );
};
