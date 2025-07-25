"use client";
import Image from "next/image";
import Link from "next/link";
import { Instagram, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [openSections, setOpenSections] = useState({});
  const toggleSection = (sectionTitle) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const footerSections = [
    {
      title: "Mamiko",
      items: [
        { name: "Home", link: "/" },
        { name: "Products", link: "/products" },
        { name: "About", link: "/about" },
        { name: "Account", link: "/account" },
      ],
    },
    {
      title: "Products",
      items: [
        { name: "Water Bottles", link: "/products" },
        { name: "Baby Wipes", link: "/products" },
        { name: "Oral & Grooming Care", link: "/products" },
        { name: "Feeding & Tableware", link: "/products" },
        { name: "Potty & Storage", link: "/products" },
        { name: "Laundry & Bottle Care", link: "/products" },
      ],
    },
    // {
    //   title: "Policy",
    //   items: [
    //     "Terms & Conditions",
    //     "FAQ",
    //     "Delivery Policy",
    //     "Return & Refund Policy",
    //   ],
    // },
  ];

  const socialLinks = [
    { icon: Instagram, name: "Instagram", size: 28, link: "https://www.instagram.com/mamikoofficialstore/" },
    { icon: null, name: "Tiktok", image: "/images/tiktok-logo.png", size: 28, link: "http://www.tiktok.com/@mothersco_indonesia" },
    { icon: null, name: "Shopee", image: "/images/shopee-logo.svg", size: 28, link: "https://id.shp.ee/iBArLta" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-16 md:mt-24 lg:mt-32 overflow-hidden"
    >
      <motion.div
        className="footer-line h-[1.5px] bg-[#e6b724] w-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />

      <div className="footer-content px-4 sm:px-8 md:px-12 lg:px-20 py-6 md:py-8 flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
        <div className="footer-left flex flex-col lg:flex-row gap-6 lg:gap-36 w-full lg:w-auto">
          {footerSections.map((section, sectionIndex) => {
            return (
              <motion.div
                key={sectionIndex}
                className="flex flex-col"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + sectionIndex * 0.1,
                  ease: "easeOut",
                }}
              >
                {/* Desktop version - always visible */}
                <div className="hidden lg:flex lg:flex-col lg:gap-2.5">
                  <p className="text-lg md:text-xl font-semibold">
                    {section.title}
                  </p>
                  <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-md">
                    {section.items.map((item, itemIndex) => (
                      <Link key={itemIndex} href={item.link}>
                        <motion.p
                          key={itemIndex}
                          initial={{ x: -10, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: 0.6 + sectionIndex * 0.1 + itemIndex * 0.05,
                            ease: "easeOut",
                          }}
                          className="cursor-pointer"
                        >
                          {item.name}
                        </motion.p>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile/Tablet version - dropdown */}
                <div className="lg:hidden">
                  <motion.button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex justify-between items-center py-3 border-b border-gray-200"
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="text-md font-semibold text-left">
                      {section.title}
                    </p>
                    <motion.div
                      animate={{
                        rotate: openSections[section.title] ? 180 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <ChevronDown size={24} className="text-gray-600" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {openSections[section.title] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-3 pt-4 pb-2 pl-4 text-sm font-medium">
                          {section.items.map((item, itemIndex) => (
                            <motion.p
                              key={item}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -10, opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: itemIndex * 0.05,
                                ease: "easeOut",
                              }}
                              className="cursor-pointer"
                            >
                              {item.name}
                            </motion.p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          className="footer-right flex flex-col gap-[10px] lg:mr-10 mt-6 lg:mt-0"
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
          <motion.p
            className="font-semibold text-lg md:text-xl"
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
          >
            Check us out
          </motion.p>
          <div className="flex flex-col gap-4 md:gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row gap-2 items-center cursor-pointer"
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.8 + index * 0.1,
                  ease: "easeOut",
                }}
              >
                <div className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 flex items-center justify-center flex-shrink-0">
                  {social.icon ? (
                    <social.icon className="w-full h-full" />
                  ) : (
                    <Image
                      src={social.image}
                      width={24}
                      height={24}
                      className="w-full h-full object-contain"
                      alt={social.name}
                    />
                  )}
                </div>
                <p className="font-medium text-xs md:text-sm leading-none">
                  {social.name}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>{" "}
      </div>
      <motion.div
        className="footer-bottom py-4 px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col sm:flex-row justify-between gap-4 sm:gap-0"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      >
        <motion.p
          className="font-semibold text-sm md:text-md text-center sm:text-left items-center flex"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
        >
          Made by CYL Labs
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
