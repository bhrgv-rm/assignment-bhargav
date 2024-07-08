"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface FormData {
  name: string;
  roll: string;
  mobile: string;
}

export default function Responses() {
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
        <h1 className="title">Data Submitted</h1>
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

      {/* CSS in JSX */}
      <style jsx>{`
        .page-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .container {
          padding: 20px 40px;
          background-color: #334166;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: auto;
          text-align: center;
        }

        .title {
          font-size: 24px;
          margin-bottom: 12px;
        }

        .text {
          font-size: 18px;
          margin: 8px 0;
        }
      `}</style>
    </div>
  );
}
