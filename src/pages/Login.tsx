import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useRegisterUserMutation,
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

export const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const [login] = useLoginMutation();
  const [registerUser] = useRegisterUserMutation();
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

  const onRegisterSubmit: SubmitHandler<RegisterFormData> = (data) => {
    dispatch(loginStart());
    registerUser(data)
      .unwrap()
      .then((response) => {
        // After successful registration, dispatch auth state to Redux
        if (response?.token && response?.user) {
          dispatch(
            loginSuccess({ user: response.user, token: response.token })
          );
          toast.success("Registration successful", {
            duration: 3000,
          });
        }
        // After successful registration, navigate based on user role
        if (response?.user?.role === "admin") {
          navigate("/dashboard/admin");
        } else {
          navigate("/dashboard/user");
        }
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
        console.error("Registration Error", error);
        toast.error("Registration Error", {
          duration: 3000,
        });
      });
  };

  return (
    <div className="flex flex-col lg:flex-row py-20 flex items-center justify-center bg-gray-50 min-h-screen">
      <div className="w-full md:w-1/2 bg-center flex justify-start">
        <img src="login.png" alt="login" className="w-[80%] h-auto" />
      </div>

      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between mb-6">
          <Link
            to="/login"
            className={`text-lg font-medium ${
              !isRegistering ? "text-purple-600" : "text-gray-400"
            }`}
            onClick={() => setIsRegistering(false)}
          >
            Login
          </Link>
          <Link
            to="/login"
            className={`text-lg font-medium ${
              isRegistering ? "text-purple-600" : "text-gray-400"
            }`}
            onClick={() => setIsRegistering(true)}
          >
            Register
          </Link>
        </div>

        {isRegistering ? (
          <form onSubmit={handleSubmit(onRegisterSubmit)}>
            <h2 className="text-2xl font-semibold text-center mb-8">
              Create Your Account
            </h2>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className="w-full py-6"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

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

            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="w-full mt-6 py-6 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition duration-300"
            >
              Register
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onLoginSubmit)}>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Welcome Back!
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
        )}
      </div>
    </div>
  );
};
