import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Clock,
  DollarSign,
  Truck,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export function ResultsDashboard({ results, shipmentDetails }) {
  const [expandedInsight, setExpandedInsight] = useState(null);

  const totalCost =
    results.shippingFees + results.customsDuties + results.otherFees;

  const costData = [
    { name: "Shipping Fees", value: results.shippingFees },
    { name: "Customs Duties", value: results.customsDuties },
    { name: "Other Fees", value: results.otherFees },
  ];

  const COLORS = ["#4299E1", "#FFA500", "#FF6347"];

  const timelineData = [
    { name: "Origin", time: 0 },
    { name: "Customs", time: 3 },
    { name: "Transit", time: 5 },
    { name: "Destination", time: 7 },
  ];

  const comparisonData = [
    { name: "Current", air: 250, sea: 100, express: 400 },
    { name: "Optimized", air: 200, sea: 80, express: 350 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="w-full bg-[#252A34] text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Shipping Cost Estimate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1C1F26] text-white">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {costData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#252A34",
                          color: "#FFFFFF",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {costData.map((item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <span className="flex items-center text-white">
                        <span
                          className="w-3 h-3 mr-2"
                          style={{ backgroundColor: COLORS[index] }}
                        ></span>
                        {item.name}
                      </span>
                      <span className="text-white">${item.value}</span>
                    </div>
                  ))}
                  <Separator className="my-2 bg-gray-600" />
                  <div className="flex justify-between items-center font-bold text-white">
                    <span>Total Cost</span>
                    <span>${totalCost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1C1F26] text-white">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Shipment Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3A3F4B" />

                    <XAxis dataKey="name" stroke="#FFFFFF" />
                    <YAxis stroke="#FFFFFF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#252A34",
                        color: "#FFFFFF",
                      }}
                    />

                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="time"
                      stroke="#4299E1"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4">
                  <h3 className="font-semibold text-white">Shipment Details</h3>
                  <div className="space-y-2 mt-2 text-white">
                    <div className="flex items-center">
                      <Truck className="mr-2 h-4 w-4 text-[#4299E1]" />

                      <span>From: {shipmentDetails.originCountry}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4 text-[#4299E1]" />

                      <span>Value: ${shipmentDetails.value}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-[#4299E1]" />

                      <span>Estimated Delivery: {results.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-[#1C1F26] text-white">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                Shipping Method Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3A3F4B" />

                  <XAxis dataKey="name" stroke="#FFFFFF" />
                  <YAxis stroke="#FFFFFF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#252A34",
                      color: "#FFFFFF",
                    }}
                  />

                  <Legend />
                  <Bar dataKey="air" fill="#4299E1" />
                  <Bar dataKey="sea" fill="#FFA500" />
                  <Bar dataKey="express" fill="#FF6347" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-[#1C1F26] text-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#252A34] p-4 rounded-lg"
                  >
                    <div
                      className="flex items-start cursor-pointer"
                      onClick={() =>
                        setExpandedInsight(
                          expandedInsight === index ? null : index
                        )
                      }
                    >
                      {insight.type === "optimization" && (
                        <TrendingUp className="mr-2 h-5 w-5 text-[#4299E1] mt-0.5" />
                      )}

                      {insight.type === "warning" && (
                        <AlertTriangle className="mr-2 h-5 w-5 text-[#FFA500] mt-0.5" />
                      )}

                      {insight.type === "info" && (
                        <CheckCircle className="mr-2 h-5 w-5 text-[#4CAF50] mt-0.5" />
                      )}

                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-white">
                          {insight.title}
                        </h3>
                        <p className="text-sm text-gray-300 mt-1">
                          {insight.description}
                        </p>
                      </div>
                      {expandedInsight === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <AnimatePresence>
                      {expandedInsight === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4"
                        >
                          {insight.detailedAnalysis && (
                            <div className="bg-[#1C1F26] p-4 rounded-md">
                              <h4 className="font-semibold mb-2 text-white">
                                Detailed Analysis
                              </h4>
                              <p className="text-gray-300">
                                {insight.detailedAnalysis}
                              </p>
                            </div>
                          )}

                          {insight.actionSteps && (
                            <div className="mt-4">
                              <h4 className="font-semibold mb-2 text-white">
                                Recommended Actions
                              </h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                                {insight.actionSteps.map((step, stepIndex) => (
                                  <li key={stepIndex}>{step}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {insight.savings && (
                            <Badge
                              variant="secondary"
                              className="mt-4 bg-[#4CAF50] text-white"
                            >
                              Potential Savings: ${insight.savings}
                            </Badge>
                          )}

                          {insight.timeReduction && (
                            <Badge
                              variant="secondary"
                              className="mt-4 ml-2 bg-[#2196F3] text-white"
                            >
                              Time Saved: {insight.timeReduction}
                            </Badge>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <Button className="bg-[#4299E1] hover:bg-[#FFC700] text-black font-bold py-2 px-4 rounded">
              Download Detailed Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
