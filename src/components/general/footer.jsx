"use client";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
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
    >
      <motion.div
        className="footer-line h-0.5 bg-gray-500 w-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />

      <div className="footer-content px-20 py-8 flex flex-row justify-between">
        <div className="footer-left flex flex-row gap-36">
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              className="flex flex-col gap-2.5"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.4 + sectionIndex * 0.1,
                ease: "easeOut",
              }}
            >
              <p className="text-2xl harmonia-bold">{section.title}</p>
              <div className="flex flex-col gap-4 text-lg harmonia-regular">
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
                    whileHover={{
                      x: 5,
                      transition: { duration: 0.2 },
                    }}
                    className="cursor-pointer"
                  >
                    {item}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="footer-right flex flex-col gap-[10px] mr-10"
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
          <motion.p
            className="harmonia-bold text-2xl"
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
          >
            Check us out
          </motion.p>
          <div className="flex flex-col gap-6">
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
                whileHover={{
                  x: 5,
                  transition: { duration: 0.2 },
                }}
              >
                {social.icon ? (
                  <social.icon size={social.size} />
                ) : (
                  <div className="w-7 h-7 relative flex items-center justify-center">
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
                <p className="harmonia-regular text-md pt-1">{social.name}</p>
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
        className="footer-bottom py-4 px-20 flex flex-row justify-between"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      >
        <motion.p
          className="harmonia-regular text-xl"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
        >
          Made by CYL Labs
        </motion.p>
        <motion.div
          className="harmonia-bold text-2xl flex flex-row gap-16"
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
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
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
