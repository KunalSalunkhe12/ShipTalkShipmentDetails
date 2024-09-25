import React, { useState } from "react";
// import { ShipmentForm } from "(components)/shipment-form";
// import { ResultsDashboard } from "(components)/results-dashboard";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ResultsDashboard } from "./results-dashboard";
import { ShipmentForm } from "./shipment-form";

export default function ShippingCostPredictor() {
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (details) => {
    setShipmentDetails(details);
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setResults({
        shippingFees: 250,
        customsDuties: 100,
        otherFees: 50,
        deliveryTime: "5-7 business days",
        aiInsights: [
          {
            type: "optimization",
            title: "Section 321 De Minimis Strategy",
            description:
              "Your shipment value of $800 qualifies for duty-free entry under Section 321 De Minimis.",
            detailedAnalysis:
              "Section 321 allows for duty-free entry of shipments valued at $800 or less. By strategically splitting higher-value shipments, you can potentially save significantly on duties and fees. This approach is particularly effective for e-commerce businesses or frequent shippers.",
            actionSteps: [
              "Split future shipments exceeding $800 into multiple parcels",
              "Ensure each parcel is addressed to different individuals or on different days",
              "Keep detailed records of split shipments for customs compliance",
            ],

            savings: 100,
          },
          {
            type: "warning",
            title: "Peak Season Surcharge Alert",
            description:
              "Your shipment is scheduled during the holiday peak season (November-December). Expect additional surcharges from carriers.",
            detailedAnalysis:
              "Carriers typically impose surcharges during peak seasons to manage increased demand. These surcharges can significantly impact shipping costs, especially for larger or heavier items. Understanding these seasonal trends can help in better planning and budgeting for your shipments.",
            actionSteps: [
              "Consider delaying non-urgent shipments to January",
              "Book shipments well in advance to secure capacity",
              "Explore alternative carriers that might offer lower peak season surcharges",
            ],

            savings: 75,
          },
          {
            type: "info",
            title: "Optimal Port of Entry: Los Angeles",
            description:
              "Based on your origin and destination, routing through the Port of Los Angeles could reduce transit time.",
            detailedAnalysis:
              "The Port of Los Angeles is known for its efficient handling of certain product categories and its strategic location for distribution across the US. By choosing this port, you can potentially benefit from faster processing times and more frequent sailing schedules.",
            actionSteps: [
              "Specify Los Angeles as the preferred port of entry with your freight forwarder",
              "Ensure your customs broker is familiar with Los Angeles port procedures",
              "Monitor port congestion reports and have a backup plan if delays occur",
            ],

            timeReduction: "2-3 days",
          },
          {
            type: "optimization",
            title: "Consolidated Shipping Opportunity",
            description:
              "If you're planning multiple shipments, consolidating them into a single larger shipment could qualify you for bulk pricing discounts with your carrier.",
            detailedAnalysis:
              "Consolidated shipping can lead to significant cost savings, especially for businesses with regular shipping needs. By combining multiple shipments, you can often negotiate better rates with carriers and reduce per-unit shipping costs. This approach also has the added benefit of simplifying logistics and potentially reducing your carbon footprint.",
            actionSteps: [
              "Review your upcoming shipment schedule for the next 1-2 months",
              "Identify shipments that can be consolidated without impacting your supply chain",
              "Negotiate with your carrier for volume-based discounts",
              "Consider using a freight consolidator service for even more savings",
            ],

            savings: 150,
          },
          {
            type: "info",
            title: "Customs Broker Recommendation",
            description:
              "Given the complexity of your shipment (high value and regulated product category), we recommend using a customs broker to ensure compliance and potentially expedite clearance.",
            detailedAnalysis:
              "Customs brokers specialize in navigating the complex landscape of international trade regulations. For high-value or regulated goods, their expertise can be invaluable in ensuring compliance, avoiding delays, and sometimes even identifying opportunities for duty savings. While there's a cost associated with their services, the potential savings in time and avoided penalties often outweigh this expense.",
            actionSteps: [
              "Research and contact reputable customs brokers specializing in your product category",
              "Provide detailed information about your shipment to potential brokers for accurate quotes",
              "Discuss potential strategies for duty minimization and expedited clearance",
              "Ensure the chosen broker is licensed and has a good track record with U.S. Customs and Border Protection",
            ],
          },
        ],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto">
      <ShipmentForm onSubmit={handleSubmit} />
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center"
          >
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
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
    </div>
  );
}
