"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import home from "../public/home.svg";
import pfp from "../public/Ellipse 1.svg";

interface FormData {
  name: string;
  roll: string;
  mobile: string;
}

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    roll: "",
    mobile: "",
  });

  const [errors, setErrors] = useState<FormData>({
    name: "",
    roll: "",
    mobile: "",
  });

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "name" && !value.match(/^[a-zA-Z0-9 ]*$/)) {
      error = "No Special Characters allowed";
    }

    if (name === "roll") {
      if (value.length !== 9) {
        error = "Length must be 9 characters long";
      }
      if (!/^[a-zA-Z0-9]*$/.test(value)) {
        error += "<br /> Roll Number format must be proper";
      }
    }

    if (name === "mobile" && !/^\d{10}$/.test(value)) {
      error = "Length must be 10 digits long";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid =
      Object.values(errors).every((error) => error === "") &&
      Object.values(formData).every((value) => value !== "");

    if (isValid) {
      router.push(
        `/responses?name=${formData.name}&roll=${formData.roll}&mobile=${formData.mobile}`
      );
    } else {
      console.log("Form has errors:", errors);
    }
  };

  return (
    <>
      <div className="pb-9 pt-4 pl-7 header flex items-start w-full">
        <Image src={home} height={18} alt="Home Icon" />
        <p className="pl-1">HOME</p>
      </div>
      <div className="card h-auto flex flex-col mx-5 justify-center items-center">
        <p className="mr-auto ml-5 mt-8 cursor-pointer">Home / Profile</p>
        <Image src={pfp} width={100} alt="PFP" className="mt-5" />
        <p className="mt-4 mb-9">person@gmail.com</p>
        <form className="inputs flex flex-col mb-8" onSubmit={handleSubmit}>
          <div className="one">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              autoComplete="off"
              id="name"
            />
            {errors.name && <p className="error-msgs">{errors.name}</p>}
          </div>
          <div className="one">
            <input
              type="text"
              name="roll"
              value={formData.roll}
              onChange={handleChange}
              placeholder="Roll Number"
              autoComplete="off"
              id="roll_no"
            />
            {errors.roll && (
              <div
                className="error-msgs"
                dangerouslySetInnerHTML={{ __html: errors.roll }}
              />
            )}
          </div>

          <div className="one">
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              autoComplete="off"
              id="mobile_no"
            />
            {errors.mobile && <p className="error-msgs">{errors.mobile}</p>}
          </div>
          <input className="cursor-pointer" type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}
