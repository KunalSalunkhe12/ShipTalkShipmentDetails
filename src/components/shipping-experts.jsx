import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ShippingExperts() {
  const experts = [
    {
      name: "John Smith",
      role: "US Import Strategy Expert",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
      name: "Mary Jane",
      role: "International Logistics Specialist",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      name: "Ralph Doe",
      role: "Customs Compliance Guru",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          US Import Shipping Experts
        </CardTitle>
        <Button variant="ghost" className="text-xs">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {experts.map((expert, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={expert.avatar} />
                <AvatarFallback>
                  {expert.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {expert.name}
                </p>
                <p className="text-sm text-muted-foreground">{expert.role}</p>
              </div>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
