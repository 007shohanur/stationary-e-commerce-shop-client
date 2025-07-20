import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RootState } from "@/app/store";
import { useUpdateProfileMutation } from "@/features/auth/authApi";
import { updateUser } from "@/features/auth/authSlice";
import toast from "react-hot-toast";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user); // Adjust based on your state structure
  const [updateProfile, { isLoading, isSuccess, error }] =
    useUpdateProfileMutation(); // Destructure mutation result

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePic: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  // Populate profile state when the component loads
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        profilePic: null, // Adjust if you have a profile picture URL
      });

      if (user.profilePic) {
        setPreview(user.profilePic); // Use profilePic URL if available
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setProfile((prev) => ({ ...prev, profilePic: file }));
    }
  };

  type UpdatedProfile = {
    name: string;
    email: string;
    phone: string;
    address: string;
    profilePic: string;
  };

  const handleUpdate = async () => {
    // Construct the updated profile with necessary fields
    const updatedProfile: UpdatedProfile = {
      name: profile.name ?? "", // Ensure values are not undefined
      email: profile.email ?? "",
      phone: profile.phone ?? "",
      address: profile.address ?? "",
      profilePic: preview ?? "", // Ensure preview is a string or empty string
    };

    try {
      console.log("Updating profile:", updatedProfile);

      // Execute the mutation and wait for the response
      const response = await updateProfile(updatedProfile).unwrap();
      console.log("Profile updated successfully:", response);

      // Since we are only updating the profile, dispatch the updated profile as Partial<User>
      dispatch(updateUser(updatedProfile)); // Pass the updatedProfile directly as Partial<User>

      toast.success("Profile updated successfully!", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="p-6 flex justify-center items-start bg-gray-50 min-h-screen my-12">
      <Card className="w-full max-w-2xl sm:max-w-lg md:max-w-2xl shadow-lg rounded-2xl border border-gray-200">
        <CardHeader className="bg-gray-800 text-white rounded-t-2xl">
          <CardTitle className="text-2xl text-center py-3">
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white rounded-b-2xl space-y-10">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-700">
              <img
                src={preview || "/default-profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <label
              className="mt-4 text-md text-purple-700 font-semibold cursor-pointer"
              htmlFor="profilePicUpload"
            >
              Upload Profile Picture
            </label>
            <input
              id="profilePicUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <form className="space-y-5">
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-3 py-5 mt-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
              />
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter your email"
                readOnly
                className="w-full p-3 py-5 mt-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
              />
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full p-3 py-5 mt-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
              />
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">
                Address
              </label>
              <Input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full p-3 py-5 mt-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
              />
            </div>
            <div className="text-center">
              <Button
                onClick={handleUpdate}
                className="w-full my-4 py-6 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
                disabled={isLoading} // Disable button while mutation is in progress
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
          {isSuccess && (
            <p className="text-green-500 text-center">
              Profile updated successfully!
            </p>
          )}
          {error && (
            <p className="text-red-500 text-center">Error updating profile.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
