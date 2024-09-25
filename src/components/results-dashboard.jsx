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
  Package,
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const timelineData = [
    { name: "Origin", time: 0 },
    {
      name: "Customs",
      time: shipmentDetails.shippingMethod === "express" ? 1 : 2,
    },
    {
      name: "Transit",
      time: shipmentDetails.shippingMethod === "express" ? 2 : 4,
    },
    {
      name: "Destination",
      time: shipmentDetails.shippingMethod === "express" ? 3 : 7,
    },
  ];

  const comparisonData = [
    {
      name: "Current",
      [shipmentDetails.shippingMethod]: results.shippingFees,
      [shipmentDetails.shippingMethod === "express" ? "standard" : "express"]:
        shipmentDetails.shippingMethod === "express"
          ? Math.round(25 * parseFloat(shipmentDetails.weight))
          : Math.round(50 * parseFloat(shipmentDetails.weight)),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Shipping Cost Estimate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cost Breakdown</CardTitle>
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
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {costData.map((item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <span className="flex items-center">
                        <span
                          className="w-3 h-3 mr-2"
                          style={{ backgroundColor: COLORS[index] }}
                        ></span>
                        {item.name}
                      </span>
                      <span>${item.value}</span>
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center font-bold">
                    <span>Total Cost</span>
                    <span>${totalCost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shipment Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="time"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4">
                  <h3 className="font-semibold">Shipment Details</h3>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center">
                      <Truck className="mr-2 h-4 w-4" />
                      <span>From: {shipmentDetails.originCountry}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4" />
                      <span>Value: ${shipmentDetails.value}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Estimated Delivery: {results.deliveryTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Weight: {shipmentDetails.weight} kg</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">
                Shipping Method Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="express" fill="#8884d8" />
                  <Bar dataKey="standard" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold">AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
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
                        <TrendingUp className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                      )}

                      {insight.type === "warning" && (
                        <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500 mt-0.5" />
                      )}

                      {insight.type === "info" && (
                        <CheckCircle className="mr-2 h-5 w-5 text-blue-500 mt-0.5" />
                      )}

                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold">
                          {insight.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {insight.description}
                        </p>
                      </div>
                      {expandedInsight === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
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
                            <div className="bg-white dark:bg-gray-700 p-4 rounded-md">
                              <h4 className="font-semibold mb-2">
                                Detailed Analysis
                              </h4>
                              <p>{insight.detailedAnalysis}</p>
                            </div>
                          )}

                          {insight.actionSteps && (
                            <div className="mt-4">
                              <h4 className="font-semibold mb-2">
                                Recommended Actions
                              </h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {insight.actionSteps.map((step, stepIndex) => (
                                  <li key={stepIndex}>{step}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {insight.savings && (
                            <Badge
                              variant="secondary"
                              className="mt-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            >
                              Potential Savings: ${insight.savings}
                            </Badge>
                          )}

                          {insight.timeReduction && (
                            <Badge
                              variant="secondary"
                              className="mt-4 ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                            >
                              Time Saved: {insight.timeReduction}
                            </Badge>
                          )}

                          {insight.impact && (
                            <div className="mt-4">
                              <h4 className="font-semibold mb-2">
                                Potential Impact
                              </h4>
                              <p>Cost: {insight.impact.cost}</p>
                              <p>Time: {insight.impact.time}</p>
                            </div>
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
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Download Detailed Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
