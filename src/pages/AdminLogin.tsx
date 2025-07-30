import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
} from "@/features/auth/authApi";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "@/features/auth/authSlice";
import toast from "react-hot-toast";

type LoginFormData = {
  email: string;
  password: string;
};

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export const AdminLogin: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const [login] = useLoginMutation();

  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate(); // Use navigate to redirect
  const dispatch = useDispatch(); // Dispatch to store user and token in Redux

  const onLoginSubmit: SubmitHandler<LoginFormData> = (data) => {
    dispatch(loginStart());
    login(data)
      .unwrap()
      .then((response) => {
        // After successful login, dispatch auth state to Redux
        if (response?.token && response?.user) {
          dispatch(
            loginSuccess({ user: response.user, token: response.token })
          );
          toast.success("Login successful", {
            duration: 3000,
          });
        }
        // After successful login, navigate based on user role
        if (response?.user?.role === "admin") {
          navigate("/dashboard/admin");
        } else {
          navigate("/dashboard/user");
        }
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
        setLoginError(error?.data?.error || "Login failed. Please try again.");
        console.error("Login Error", error);
        toast.error("Login failed. Please try again.", {
          duration: 3000,
        });
      });
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className=" w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
       
          <form onSubmit={handleSubmit(onLoginSubmit)}>
            <h2 className="text-2xl font-semibold text-center mb-6">
                Admin Login
            </h2>

            <div className="mb-4">
              <Input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: "Email is required" })}
                className="w-full py-6"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <Input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full py-6"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {loginError && (
              <p className="text-red-500 text-sm mb-4">{loginError}</p>
            )}

            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="w-full mt-6 py-6 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition duration-300"
            >
              Login
            </Button>
          </form>
          </div>
          </div>
  );
};
