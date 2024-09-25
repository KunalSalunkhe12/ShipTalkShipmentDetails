import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Package, Truck, DollarSign, MapPin } from "lucide-react";

export function ShipmentForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    originCountry: "",
    productDescription: "",
    weight: "",
    dimensions: "",
    shippingMethod: "",
    destination: "",
    value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-4xl mx-auto bg-[#242933] text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Enter Shipment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Country of Origin
                </label>
                <Select
                  name="originCountry"
                  onValueChange={(value) =>
                    handleSelectChange("originCountry", value)
                  }
                >
                  <SelectTrigger className="bg-[#2e3440] text-white">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2e3440] text-white">
                    <SelectItem value="china">China</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="vietnam">Vietnam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Product Description or HS Code
                </label>
                <Input
                  name="productDescription"
                  placeholder="e.g., Electronics, Clothing, 8517.12.00"
                  value={formData.productDescription}
                  onChange={handleChange}
                  className="bg-[#2e3440] text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Weight (kg)</label>
                <Input
                  name="weight"
                  type="number"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="bg-[#2e3440] text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Dimensions (LxWxH cm)
                </label>
                <Input
                  name="dimensions"
                  placeholder="e.g., 30x20x15"
                  value={formData.dimensions}
                  onChange={handleChange}
                  className="bg-[#2e3440] text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Shipping Method
                </label>
                <Select
                  name="shippingMethod"
                  onValueChange={(value) =>
                    handleSelectChange("shippingMethod", value)
                  }
                >
                  <SelectTrigger className="bg-[#2e3440] text-white">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2e3440] text-white">
                    <SelectItem value="air">Air</SelectItem>
                    <SelectItem value="sea">Sea</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  U.S. Destination
                </label>
                <Input
                  name="destination"
                  placeholder="Zip Code or City"
                  value={formData.destination}
                  onChange={handleChange}
                  className="bg-[#2e3440] text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Shipment Value (USD)
                </label>
                <Input
                  name="value"
                  type="number"
                  placeholder="Enter value"
                  value={formData.value}
                  onChange={handleChange}
                  className="bg-[#2e3440] text-white"
                />
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="w-full bg-[#7e6be8] hover:bg-[#6a5ad4] text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Calculate Shipping Cost
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <InfoCard
          icon={<Package className="w-8 h-8 text-[#7e6be8]" />}
          title="Package Details"
          description="Accurate dimensions ensure precise quotes"
        />

        <InfoCard
          icon={<Truck className="w-8 h-8 text-[#7e6be8]" />}
          title="Shipping Method"
          description="Choose the best option for your timeline"
        />

        <InfoCard
          icon={<DollarSign className="w-8 h-8 text-[#7e6be8]" />}
          title="Declared Value"
          description="Affects customs duties and insurance"
        />

        <InfoCard
          icon={<MapPin className="w-8 h-8 text-[#7e6be8]" />}
          title="Destination"
          description="Impacts shipping time and cost"
        />
      </div>
    </motion.div>
  );
}

function InfoCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#242933] p-4 rounded-lg shadow-md"
    >
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="ml-2 text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm text-gray-300">{description}</p>
    </motion.div>
  );
}
