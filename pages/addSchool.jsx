import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.append("image", data.image[0]);

    const res = await fetch("/api/addSchool", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setMessage(result.message || result.error);
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-lg bg-white mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Add School</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input placeholder="Name" {...register("name", { required: true })} className="w-full p-2 border rounded" />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <input placeholder="Address" {...register("address", { required: true })} className="w-full p-2 border rounded" />
        <input placeholder="City" {...register("city", { required: true })} className="w-full p-2 border rounded" />
        <input placeholder="State" {...register("state", { required: true })} className="w-full p-2 border rounded" />
        
        <input type="number" placeholder="Contact" {...register("contact", { required: true, minLength: 10 })} className="w-full p-2 border rounded" />
        {errors.contact && <p className="text-red-500">Valid contact is required</p>}

        <input type="email" placeholder="Email" {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} className="w-full p-2 border rounded" />
        {errors.email_id && <p className="text-red-500">Valid email required</p>}

        <input type="file" {...register("image", { required: true })} className="w-full" />
        {errors.image && <p className="text-red-500">Image is required</p>}

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
      </form>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
