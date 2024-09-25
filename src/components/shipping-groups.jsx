import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Truck, Home, DollarSign, Leaf } from "lucide-react";

export function ShippingGroups() {
  const groups = [
    {
      name: "US Import Optimization",
      icon: <Package className="w-4 h-4" />,
    },
    {
      name: "International Logistics Strategies",
      icon: <Truck className="w-4 h-4" />,
    },
    {
      name: "Last Mile Delivery Innovations",
      icon: <Home className="w-4 h-4" />,
    },
    {
      name: "Import Cost Savings",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      name: "Sustainable US Importing",
      icon: <Leaf className="w-4 h-4" />,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          US Import Shipping Groups
        </CardTitle>
        <Button variant="ghost" className="text-xs">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {groups.map((group, index) => (
            <div
              key={index}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                {group.icon}
                <span className="text-sm font-medium">{group.name}</span>
              </div>
              <Button variant="outline" size="sm">
                Join
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
