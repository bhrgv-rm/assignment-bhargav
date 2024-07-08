"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface FormData {
  name: string;
  roll: string;
  mobile: string;
}

function Component() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const params = useSearchParams();

  useEffect(() => {
    const name = params.get("name");
    const roll = params.get("roll");
    const mobile = params.get("mobile");

    if (name && roll && mobile) {
      setFormData({ name, roll, mobile });
    }
  }, [params]);

  if (!formData) {
    return <p>No form data found. Please submit the form first.</p>;
  }

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="title">Form Data</h1>
        <p className="text">
          <strong>Name:</strong> {formData.name}
        </p>
        <p className="text">
          <strong>Roll Number:</strong> {formData.roll}
        </p>
        <p className="text">
          <strong>Mobile Number:</strong> {formData.mobile}
        </p>
      </div>

      <style jsx>{`
        .page-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh; /* Full viewport height */
          background-color: #e0e0e0; /* Optional: Background color for the entire page */
        }

        .container {
          padding: 16px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 400px; /* Optional: Set a max width for the box */
          text-align: center; /* Center align text within the box */
        }

        .title {
          font-size: 24px;
          margin-bottom: 12px;
          color: #333;
        }

        .text {
          font-size: 18px;
          margin: 8px 0;
          color: #555;
        }
      `}</style>
    </div>
  );
}
export default function Responses() {
  return (
    <Suspense fallback={<div>Loading Content...</div>}>
      <Component />
    </Suspense>
  );
}
