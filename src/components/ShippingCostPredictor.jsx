"use client";
import React, { useState } from "react";
// import { ShipmentForm } from "(components)/shipment-form";
// import { ResultsDashboard } from "(components)/results-dashboard";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ShipmentForm } from "@/components/shipment-form";
import { ResultsDashboard } from "@/components/results-dashboard";
import { ShippingGroups } from "@/components/shipping-groups";
import { ShippingExperts } from "@/components/shipping-experts";
import { RelatedPosts } from "@/components/related-posts";
import { UpcomingEvents } from "@/components/upcoming-events";
// import { ShippingGroups } from "(components)/shipping-groups";
// import { ShippingExperts } from "(components)/shipping-experts";
// import { RelatedPosts } from "(components)/related-posts";
// import { UpcomingEvents } from "(components)/upcoming-events";

export default function ShippingCostPredictor() {
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAdditionalSections, setShowAdditionalSections] = useState(false);

  const handleSubmit = (details) => {
    setShipmentDetails(details);
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      const shippingFees = calculateShippingFees(details);
      const customsDuties = calculateCustomsDuties(details);
      const otherFees = calculateOtherFees(details);
      const deliveryTime = estimateDeliveryTime(details);

      setResults({
        shippingFees,
        customsDuties,
        otherFees,
        deliveryTime,
        aiInsights: generateAIInsights(
          details,
          shippingFees,
          customsDuties,
          otherFees
        ),
      });
      setLoading(false);
      setShowAdditionalSections(true);
    }, 2000);
  };

  // ... (keep the existing calculation and insight generation functions)

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto bg-[#1c1f26]">
      <ShipmentForm onSubmit={handleSubmit} />
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center"
          >
            <Loader2 className="h-8 w-8 animate-spin text-[#7e6be8]" />
          </motion.div>
        )}

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ResultsDashboard
              results={results}
              shipmentDetails={shipmentDetails}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showAdditionalSections && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <ShippingGroups />
          <ShippingExperts />
          <RelatedPosts />
          <UpcomingEvents />
        </motion.div>
      )}
    </div>
  );
}
