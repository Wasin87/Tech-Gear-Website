'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  AlertCircle,
  User,
  MessageSquare
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Address",
      details: ["support@techgear.com", "sales@techgear.com"],
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Numbers",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office Location",
      details: ["123 Tech Street", "San Francisco, CA 94107"],
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Mon-Fri: 9AM - 6PM", "Sat: 10AM - 4PM", "Sun: Closed"],
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/20"
    },
  ];

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day hassle-free return policy on all products. Items must be in original condition with all accessories."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 100 countries worldwide. Shipping times and costs vary by location."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track orders from your account dashboard."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All payments are secure and encrypted."
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-base-100 dark:bg-base-200 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
              <span>Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold   mb-6">
              We're Here to <span className="text-primary">Help</span>
            </h1>
            <p className="text-xl   mb-8 max-w-3xl mx-auto">
              Have questions or need assistance? Our team is ready to provide you with the support you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-base-100  rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300 dark:border-base-400"
              >
                <div className={`${info.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <div className={info.color}>
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold   mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className=" ">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-base-100   rounded-3xl p-8 shadow-xl border border-base-300 dark:border-base-400"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold  ">
                    Send Us a Message
                  </h2>
                  <p className=" ">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 "
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-full mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold   mb-3">
                    Message Sent Successfully!
                  </h3>
                  <p className="t  mb-6">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium   mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name *
                        </div>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-base-200 dark:bg-base-300 border border-base-300 dark:border-base-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium   mb-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </div>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-base-200 dark:bg-base-300 border border-base-300 dark:border-base-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium   mb-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </div>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-base-200 dark:bg-base-300 border border-base-300 dark:border-base-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium   mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-base-200 dark:bg-base-300 border border-base-300 dark:border-base-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="sales">Sales Question</option>
                        <option value="billing">Billing Issue</option>
                        <option value="returns">Returns & Refunds</option>
                        <option value="feedback">Feedback & Suggestions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-base-200 dark:bg-base-300 border border-base-300 dark:border-base-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Please describe your inquiry in detail..."
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                    <p className="text-sm  ">
                      * Required fields
                    </p>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="bg-base-100   rounded-3xl overflow-hidden shadow-xl border border-base-300 dark:border-base-400">
                <div className="relative h-80 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold   mb-2">
                      Dhaka Gulshan Office
                    </h3>
                    <p className=" ">
                      123 Tech Street, Dhaka Gulshan, CA 94107
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold   mb-3">
                    Getting Here
                  </h4>
                  <ul className="space-y-2  ">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                      <span>5 min walk from Montgomery BART Station</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                      <span>Street parking available nearby</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt=2"></div>
                      <span>Wheelchair accessible entrance</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-base-100 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Urgent Support</h3>
                    <p className="text-white/80">For critical issues</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-white/80">Emergency Phone</p>
                    <p className="text-lg font-semibold">+1 (555) 911-4567</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Available</p>
                    <p className="text-lg font-semibold">24/7</p>
                  </div>
                  <p className="text-sm text-white/80">
                    For order cancellations, urgent shipping issues, or critical account problems
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-base-200  ">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-xl  0 max-w-2xl mx-auto">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-4 last:mb-0"
              >
                <div className="bg-base-100   rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-lg font-bold   mb-3">
                    {faq.question}
                  </h3>
                  <p className=" ">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media & Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold   mb-6">
                Stay Connected
              </h2>
              <p className="  mb-8">
                Follow us on social media for the latest updates, tech news, and exclusive deals.
              </p>
              <div className="flex gap-4">
                {['Whatsapp', 'Facebook' , 'LinkedIn'].map((platform) => (
                  <button
                    key={platform}
                    className="px-6 py-3 bg-base-300     rounded-lg font-semibold hover:bg-base-300 dark:hover:bg-base-400 transition-colors duration-300"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold   mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="  mb-6">
                Get the latest tech news, product updates, and exclusive offers directly in your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white dark:bg-base-200 border border-base-300 dark:border-base-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
              <p className="text-sm   mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold   mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl   mb-8">
              Check our comprehensive <Link href="/faq" className="text-primary hover:underline">FAQ page</Link> or browse our <Link href="/help" className="text-primary hover:underline">help center</Link> for more information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/faq"
                className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300"
              >
                Visit FAQ
              </Link>
           
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;