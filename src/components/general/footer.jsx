"use client";
import Image from "next/image";
import { Instagram, ChevronDown, ChevronUp } from "lucide-react";
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
      items: ["Account", "About"],
    },
    {
      title: "Products",
      items: [
        "Bottles & Sippy Cups",
        "Tissues",
        "Oral Care",
        "Potty",
        "Travel & Storage",
      ],
    },
    {
      title: "Policy",
      items: [
        "Terms & Conditions",
        "FAQ",
        "Delivery Policy",
        "Return & Refund Policy",
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, name: "Instagram", size: 28 },
    { icon: null, name: "Tiktok", image: "/images/tiktok-logo.png", size: 28 },
    { icon: null, name: "Shopee", image: "/images/shopee-logo.svg", size: 28 },
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
        className="footer-line h-0.5 bg-gray-500 w-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />

      <div className="footer-content px-4 sm:px-8 md:px-12 lg:px-20 py-6 md:py-8 flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
        <div className="footer-left flex flex-col lg:flex-row gap-6 lg:gap-36 w-full lg:w-auto">
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
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
                <p className="text-xl md:text-2xl harmonia-bold">
                  {section.title}
                </p>
                <div className="flex flex-col gap-3 md:gap-4 text-base md:text-lg harmonia-regular">
                  {section.items.map((item, itemIndex) => (
                    <motion.p
                      key={item}
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
                      {item}
                    </motion.p>
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
                  <p className="text-xl md:text-2xl harmonia-bold text-left">
                    {section.title}
                  </p>
                  <motion.div
                    animate={{ rotate: openSections[section.title] ? 180 : 0 }}
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
                      <div className="flex flex-col gap-3 pt-4 pb-2 pl-4 text-base md:text-lg harmonia-regular">
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
                            {item}
                          </motion.p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="footer-right flex flex-col gap-[10px] lg:mr-10 mt-6 lg:mt-0"
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
          <motion.p
            className="harmonia-bold text-xl md:text-2xl"
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
          >
            Check us out
          </motion.p>
          <div className="flex flex-col gap-4 md:gap-6">
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.name}
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
                {social.icon ? (
                  <social.icon size={social.size} />
                ) : (
                  <div className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-7 xl:h-7 relative flex items-center justify-center">
                    <Image
                      src={social.image}
                      width={social.size}
                      height={social.size}
                      style={{
                        objectFit: "contain",
                        minWidth: `${social.size}px`,
                        minHeight: `${social.size}px`,
                      }}
                      alt={social.name}
                    />
                  </div>
                )}
                <p className="harmonia-regular text-sm md:text-md pt-1">
                  {social.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="footer-line h-0.5 bg-gray-500 w-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      />

      <motion.div
        className="footer-bottom py-4 px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col sm:flex-row justify-between gap-4 sm:gap-0"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      >
        <motion.p
          className="harmonia-regular text-lg md:text-xl text-center sm:text-left"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
        >
          Made by CYL Labs
        </motion.p>
        <motion.div
          className="harmonia-bold text-lg md:text-2xl flex flex-row gap-8 md:gap-16 justify-center sm:justify-end"
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
        >
          {["Home", "Products", "About"].map((item, index) => (
            <motion.p
              key={item}
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: 0.8 + index * 0.1,
                ease: "easeOut",
              }}
              className="cursor-pointer"
            >
              {item}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
