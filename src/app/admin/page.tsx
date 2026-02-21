"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Save, Upload, Plus } from "lucide-react";
import { generatePropertyDescription } from "@/ai/flows/generate-property-description-flow";
import { useToast } from "@/hooks/use-toast";

export default function AdminCMS() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    squareFootage: 2500,
    bedrooms: 3,
    style: "Modern Contemporary",
    neighborhoodFeatures: "Close to parks, quiet cul-de-sac, luxury amenities",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "squareFootage" || name === "bedrooms" ? parseInt(value) || 0 : value
    }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.squareFootage || !formData.bedrooms || !formData.style || !formData.neighborhoodFeatures) {
      toast({
        title: "Missing Details",
        description: "Please fill in square footage, bedrooms, style, and neighborhood features for the AI.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const result = await generatePropertyDescription({
        squareFootage: formData.squareFootage,
        bedrooms: formData.bedrooms,
        style: formData.style,
        neighborhoodFeatures: formData.neighborhoodFeatures,
      });
      
      setFormData(prev => ({ ...prev, description: result.description }));
      toast({
        title: "Success",
        description: "AI description generated successfully!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate description. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-muted/20">
      <Header />
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="font-headline text-4xl font-bold text-primary">Admin CMS</h1>
            <p className="text-muted-foreground">Manage property listings and generate marketing content.</p>
          </div>
          <Button className="gap-2 rounded-xl">
            <Plus className="w-4 h-4" />
            Add Property
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="rounded-2xl border-none shadow-xl overflow-hidden">
              <CardHeader className="bg-primary text-white">
                <CardTitle className="font-headline">Property Basics</CardTitle>
                <CardDescription className="text-white/70">Core details for the listing</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Property Title</label>
                  <Input 
                    name="title" 
                    value={formData.title} 
                    onChange={handleInputChange}
                    placeholder="e.g. The Sapphire Bay Mansion" 
                    className="h-12 border-muted" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Square Footage</label>
                    <Input 
                      name="squareFootage" 
                      type="number"
                      value={formData.squareFootage} 
                      onChange={handleInputChange}
                      placeholder="Sq Ft" 
                      className="h-12 border-muted" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bedrooms</label>
                    <Input 
                      name="bedrooms" 
                      type="number"
                      value={formData.bedrooms} 
                      onChange={handleInputChange}
                      placeholder="Beds" 
                      className="h-12 border-muted" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Architectural Style</label>
                  <Input 
                    name="style" 
                    value={formData.style} 
                    onChange={handleInputChange}
                    placeholder="e.g. Modern Minimalist, Traditional, Colonial" 
                    className="h-12 border-muted" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Neighborhood Features</label>
                  <Textarea 
                    name="neighborhoodFeatures" 
                    value={formData.neighborhoodFeatures} 
                    onChange={handleInputChange}
                    placeholder="Parks, schools, quiet streets, luxury shops..." 
                    className="min-h-[100px] border-muted" 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none shadow-xl overflow-hidden">
              <CardHeader className="bg-accent text-white flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-headline">Marketing Description</CardTitle>
                  <CardDescription className="text-white/70 italic">AI-powered engaging copy</CardDescription>
                </div>
                <Button 
                  onClick={handleGenerateDescription} 
                  disabled={loading}
                  className="bg-white text-accent hover:bg-white/90 gap-2 font-bold uppercase text-[10px] tracking-widest"
                >
                  {loading ? "Generating..." : <><Sparkles className="w-4 h-4" /> AI Generate</>}
                </Button>
              </CardHeader>
              <CardContent className="p-8">
                <Textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange}
                  placeholder="The property description will appear here..." 
                  className="min-h-[300px] border-muted leading-relaxed" 
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="rounded-2xl border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Publish Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full h-12 gap-2 bg-primary">
                  <Save className="w-4 h-4" />
                  Save Draft
                </Button>
                <Button variant="outline" className="w-full h-12 gap-2 border-primary text-primary hover:bg-primary/5">
                  <Upload className="w-4 h-4" />
                  Publish Live
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Media Upload</CardTitle>
                <CardDescription>Property gallery images</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-10 text-center space-y-4 cursor-pointer hover:bg-muted/30 transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Drop images here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}