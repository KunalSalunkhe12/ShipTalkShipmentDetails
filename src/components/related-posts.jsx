import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RelatedPosts() {
  const posts = [
    {
      title: "Maximizing Efficiency in US Import Shipping",
      excerpt:
        "Learn advanced strategies to optimize your US import shipping process for maximum cost savings and delivery speed.",
    },
    {
      title: "Integrating AI in US Import Shipping Decisions",
      excerpt:
        "Discover how artificial intelligence can enhance carrier selection and routing in US import shipping systems.",
    },
    {
      title: "Sustainable Practices in US Import Shipping",
      excerpt:
        "Explore eco-friendly approaches to implement US import shipping while reducing your carbon footprint.",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Related US Import Shipping Posts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              <Button variant="link" className="p-0">
                Read more
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
