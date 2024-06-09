"use client";

import React, { useRef, useState, ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";
import useAlert from "../../../../hooks/useAlert";
import Alert from "@/components/Alert";
import Image from "next/image";

const Support = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error(
        "One or more EmailJS environment variables are not defined."
      );
      return;
    }

    const formData = new FormData();
    formData.append("from_name", form.name);
    formData.append("from_email", form.email);
    formData.append("message", form.message);
    if (file) {
      formData.append("file", file);
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: "Economic Radar",
          from_email: form.email,
          to_email: "radareconomicoinovalab@gmail.com",
          message: form.message,
          file: file ? file.name : "",
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          showAlert({ text: "Thank you for your message 😃", type: "success" });

          setTimeout(() => {
            hideAlert();
            setForm({
              name: "",
              email: "",
              message: "",
            });
            setFile(null);
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          showAlert({
            text: "I didn't receive your message 😢",
            type: "danger",
          });
        }
      );
  };

  return (
    <section className="flex flex-col lg:flex-row  text-white">
      <div className="lg:w-1/2 p-8">
        {alert.show && <Alert type={alert.type} text={alert.text} />}
        <p className="support-text">
          {`We're here to assist you. Whether you're encountering bugs or have
          inquiries, don't hesitate to reach out.`}
        </p>
        <h1 className="head-text">Get in touch with us!</h1>

        <form
          ref={formRef}
          className="flex flex-col gap-5 mt-5"
          onSubmit={handleSubmit}
        >
          <label className=" text-gray-300 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="John"
              required
              value={form.name}
              onChange={handleChange}
            />
          </label>

          <label className=" text-gray-300 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="John@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
            />
          </label>

          <label className=" text-gray-300 font-semibold">
            Your Message
            <textarea
              name="message"
              rows={4}
              className="textarea"
              placeholder="Let me know how I can help you!"
              required
              value={form.message}
              onChange={handleChange}
            />
          </label>

          <label className=" text-gray-300 font-semibold">
            Add the print with the bug here (optional)
            <input
              type="file"
              name="file"
              className="input"
              accept=".pdf, .png, .jpg"
              onChange={handleFileChange}
            />
          </label>

          <button type="submit" disabled={loading} className="btn">
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className="lg:w-1/2 p-8 flex flex-col justify-center items-center">
        <Image
          src="/images/imageSupport.png"
          alt="Logo Economic Radar"
          layout="responsive"
          width={400}
          height={240}
          className=""
        />
      </div>
    </section>
  );
};

export default Support;
