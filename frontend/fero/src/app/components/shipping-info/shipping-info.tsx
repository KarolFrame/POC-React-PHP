"use client";
import styles from "./shipping-info.module.css";
import React, {
  useContext,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { CheckoutContext } from "@/context/CheckoutContext";
import { toast } from "react-toastify";
import { ShippingInfo } from "@/context/CheckoutContext";
import IconMaterial from "../icon-material/icon-material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface ShippingStepHandle {
  handleSubmit: () => void;
}

const ShippingStep = forwardRef<ShippingStepHandle, {}>((_props, ref) => {
  const context = useContext(CheckoutContext);
  const defaultForm = {
    name: "",
    email: "",
    address: "",
    phone: "",
  } as ShippingInfo;

  const [form, setForm] = useState(context?.shipping || defaultForm);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const _itsAllFields = (): boolean => {
    if (Object.values(form).some((v) => !v)) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const _itsEmail = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(form.email);
    setErrors((prev) => ({
      ...prev,
      email: isValid ? "" : "Please enter a valid email address",
    }));
    if (!isValid) toast.error("Please enter a valid email address");
    return isValid;
  };

  const _itsPhoneNumber = (): boolean => {
    const phoneRegex = /^\d+$/;
    const isValid = phoneRegex.test(form.phone);
    setErrors((prev) => ({
      ...prev,
      phone: isValid ? "" : "Phone must contain only numbers",
    }));
    if (!isValid) toast.error("Phone must contain only numbers");
    return isValid;
  };
  const _validateFields = (): boolean => {
    if (!_itsAllFields()) return false;
    if (!_itsEmail()) return false;
    if (!_itsPhoneNumber()) return false;
    return true;
  };

  const _saveShippingInfo = () => {
    context?.setShipping(form);
    toast.success("Shipping info saved");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({
        ...prev,
        email: value && !emailRegex.test(value) ? "Invalid email address" : "",
      }));
    }

    if (name === "phone") {
      const phoneRegex = /^\d+$/;
      setErrors((prev) => ({
        ...prev,
        phone:
          value && !phoneRegex.test(value)
            ? "Phone must contain only numbers"
            : "",
      }));
    }

    if (name === "name") {
      setErrors((prev) => ({
        ...prev,
        name: value.length < 2 ? "Name too short" : "",
      }));
    }

    if (name === "address") {
      setErrors((prev) => ({
        ...prev,
        address: value.length < 5 ? "Address too short" : "",
      }));
    }
  };

  const handleSubmit = (): boolean => {
    if (!_validateFields()) return false;
    _saveShippingInfo();
    return true;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <div className="m-5 p-2">
      <h1 className="text-3xl mb-6 font-bold">Shipping Info</h1>
      <form
        className="flex flex-col gap-3 justify-center content-center"
        onSubmit={handleFormSubmit}
      >
        <div className="relative">
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            variant="outlined"
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconMaterial ico="person" className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="relative">
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconMaterial ico="email" className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="relative">
          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
            variant="outlined"
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconMaterial ico="home" className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="relative">
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            variant="outlined"
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconMaterial ico="phone" className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </form>
    </div>
  );
});

export default ShippingStep;
