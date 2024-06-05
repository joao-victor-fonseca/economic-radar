"use client";

import React, { useRef, useState, ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";
import useAlert from "../../../../hooks/useAlert";
import Alert from "@/components/Alert";
import Image from "next/image";

const Support = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    <section className="flex flex-col lg:flex-row text-white">
      <div className="lg:w-1/2 p-8">
        {alert.show && <Alert type={alert.type} text={alert.text} />}
        <p className="support-text">
          {`We're here to assist you. Whether you're encountering bugs or have
          inquiries, don't hesitate to reach out.`}
        </p>
        <h1 className="head-text">Get in Touch with Us!</h1>

        <form
          ref={formRef}
          className="flex flex-col gap-5 mt-5"
          onSubmit={handleSubmit}
        >
          <label className="text-white font-semibold">
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

          <label className="text-white font-semibold">
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

          <label className="text-white font-semibold">
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
