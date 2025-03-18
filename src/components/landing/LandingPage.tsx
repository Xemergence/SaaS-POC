import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Twitter, Youtube, Instagram } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#121218] text-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/vite.svg" alt="xEmergence Logo" className="h-10 w-10" />
          <span className="text-xl font-bold text-white">xEmergence</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-white hover:text-[#7b68ee] transition-colors"
          >
            Product
          </a>
          <a
            href="#"
            className="text-white hover:text-[#7b68ee] transition-colors"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-white hover:text-[#7b68ee] transition-colors"
          >
            Company
          </a>
          <a
            href="#"
            className="text-white hover:text-[#7b68ee] transition-colors"
          >
            Contact Us
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-[#1e1e2d]"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white rounded-full">
              <span>Sign Up</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6">
          <div className="text-[#7b68ee] uppercase tracking-wider text-sm font-medium mb-2">
            POWERING PROGRESS
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Powering Teams & Local Businesses
          </h1>
          <p className="text-lg text-gray-300">
            Aggregate and visualize critical business metrics from your deployed
            websites, with real-time insights and cost management capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/signup">
              <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white w-full sm:w-auto px-8 py-6 text-lg rounded-full">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="text-sm text-gray-300 mt-4">
            It's for pretty much everyone
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Badge icon="infinity" text="For Innovators" />
            <Badge icon="code" text="Digital Integrations" />
            <Badge icon="users" text="For Small Teams" />
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              alt="xEmergence Dashboard Preview"
              className="relative rounded-lg shadow-2xl border border-[#2a2a3a] w-full max-w-lg"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#1a1a24]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-[#7b68ee] uppercase tracking-wider text-sm font-medium mb-2">
              PRICED FAIRLY
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Free for new solo users, and reasonably priced business
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              tier="MAX"
              price="$200"
              features={[
                "Business intelligence dashboard",
                "Platforms and extension automation",
                "Social media integration",
                "Secure dashboard access",
                "Unlimited members",
              ]}
              ctaText="Get started with MAX"
            />
            <PricingCard
              tier="PLUS"
              price="$80"
              featured={true}
              features={[
                "AI automation",
                "Local payment methods",
                "Platform support",
                "Simulation Support",
                "2-4 members",
              ]}
              ctaText="Get started with Plus"
            />
            <PricingCard
              tier="FREE"
              price="Free"
              subtext="For Everyone"
              features={[
                "Webpage integration",
                "General analytics",
                "Reporting",
                "Chat support",
                "1 member",
              ]}
              ctaText="Get started with FREE"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#121218]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Cutting edge features with no compromises
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Get Focused"
              description="A place for new issues and ideas. Concentrate on the essentials and disregard diversions."
              icon={<GlowingIcon color="#9aff76" />}
            />
            <FeatureCard
              title="Save time"
              description="Define and organize larger pieces of work with our comprehensive dashboard tools."
              icon={<GlowingIcon color="#ff7676" />}
            />
            <FeatureCard
              title="Gen AI to Co-Create"
              description="Keep work in motion. No longer heavy files with our AI-powered analytics and insights."
              icon={<GlowingIcon color="#a876ff" />}
            />
            <FeatureCard
              title="Acquire and Monitor your Users"
              description="Track website traffic, revenue metrics, operating costs, and database usage with real-time updates."
              icon={<GlowingIcon color="#76ffb8" />}
            />
            <FeatureCard
              title="Single Source Documentation"
              description="All your business metrics and documentation in one place for easy access and management."
              icon={<GlowingIcon color="#c576ff" />}
            />
            <FeatureCard
              title="Get Ahead!"
              description="Stay ahead of the competition with our cutting-edge tools and real-time analytics."
              icon={<GlowingIcon color="#76e4ff" />}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#1a1a24]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-[#1e1e2d] p-8 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sam"
                  alt="User"
                  className="w-12 h-12 rounded-full bg-[#2a2a3a]"
                />
                <div>
                  <h3 className="font-bold text-white">Sam</h3>
                  <p className="text-sm text-gray-300">
                    AI integration specialist
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
                  alt="User"
                  className="w-12 h-12 rounded-full bg-[#2a2a3a]"
                />
                <div>
                  <h3 className="font-bold text-white">Emma</h3>
                  <p className="text-sm text-gray-300">
                    Expands her reach through analytics
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyler"
                  alt="User"
                  className="w-12 h-12 rounded-full bg-[#2a2a3a]"
                />
                <div>
                  <h3 className="font-bold text-white">Tyler</h3>
                  <p className="text-sm text-gray-300">
                    Intelligent systems specialist
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white">Get focused</h3>
                <p className="text-gray-300 mt-2">
                  Concentrate on the essentials and disregard diversions
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#1e1e2d] p-8 rounded-lg">
            <div className="flex flex-col h-full justify-between">
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80"
                  alt="Workflow"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Enhance your Workflow with Sustainability at its Core
                </h3>
                <p className="text-gray-300 mt-2">
                  Simplify intricate processes, make informed decisions, and
                  focus on core business activities without getting lost in the
                  data maze.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-20 bg-[#121218]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-[#7b68ee] opacity-20 blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1581092921461-39b9d007dfb9?w=800&q=80"
                alt="AI Tools"
                className="relative rounded-lg w-full"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Your favourite AI tools
            </h2>
            <p className="text-gray-300 mb-8">
              xEmergence operates with every tool you adore, enabling smooth
              shifts across your work processes
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div
                  key={i}
                  className="bg-[#1e1e2d] p-4 rounded-lg flex items-center justify-center"
                >
                  <GlowingIcon color={getRandomColor()} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1a1a24]">
        <div className="container mx-auto px-4 text-center">
          <div className="text-[#7b68ee] uppercase tracking-wider text-sm font-medium mb-2">
            XEMERGENCE! PRICED FAIRLY
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Try it before making a commitment
          </h2>
          <div className="max-w-md mx-auto">
            <div className="flex rounded-lg overflow-hidden border border-[#2a2a3a] mb-6">
              <div className="bg-[#1e1e2d] p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                placeholder="name@email.com"
                className="flex-1 bg-[#1e1e2d] text-white px-4 py-3 outline-none"
              />
              <button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white px-6 py-3">
                Subscribe
              </button>
            </div>
          </div>
          <p className="text-gray-300 mt-4">
            Concentrate on the essentials and disregard diversions
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#121218] py-12 border-t border-[#2a2a3a]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/logo.png"
                  alt="xEmergence Logo"
                  className="h-8 w-8"
                />
                <span className="text-xl font-bold text-white">xEmergence</span>
              </div>
              <p className="text-gray-300 mb-4">
                Unleash the Full Potential of Your Ideas with Our Accelerated
                Solutions, Driving Your Success Forward
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    For Designers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    For Developers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    For Managers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2a2a3a] pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">
              TrendBlend Inc 2023 All Rights Reserved
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-[#1e1e2d] p-6 rounded-lg border border-[#2a2a3a] hover:border-[#7b68ee] transition-all">
      <div className="mb-6 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center text-white">
        {title}
      </h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );
}

interface PricingCardProps {
  tier: string;
  price: string;
  subtext?: string;
  features: string[];
  ctaText: string;
  featured?: boolean;
}

function PricingCard({
  tier,
  price,
  subtext,
  features,
  ctaText,
  featured = false,
}: PricingCardProps) {
  return (
    <div
      className={`bg-[#1e1e2d] p-8 rounded-lg border ${featured ? "border-[#7b68ee]" : "border-[#2a2a3a]"} flex flex-col h-full`}
    >
      <div className="text-center mb-6">
        <div className="text-[#7b68ee] uppercase tracking-wider text-sm font-medium mb-2">
          {tier}
        </div>
        <div className="text-3xl font-bold text-white">
          {price}{" "}
          <span className="text-lg font-normal text-gray-300">
            per user/month
          </span>
        </div>
        {subtext && <div className="text-gray-300 mt-1">{subtext}</div>}
      </div>

      <div className="flex justify-center gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${featured ? "bg-[#7b68ee] text-white" : "bg-[#2a2a3a] text-gray-300"}`}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-full ${!featured ? "bg-[#7b68ee] text-white" : "bg-[#2a2a3a] text-gray-300"}`}
        >
          Yearly
        </button>
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className="rounded-full bg-[#7b68ee] bg-opacity-20 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#7b68ee]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-white">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`py-3 px-6 rounded-full flex items-center justify-center gap-2 ${featured ? "bg-[#7b68ee] hover:bg-[#6a5acd] text-white" : "bg-[#2a2a3a] hover:bg-[#353545] text-white"}`}
      >
        {ctaText}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function Badge({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="bg-[#1e1e2d] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm">
      {icon === "infinity" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-[#7b68ee]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
        </svg>
      )}
      {icon === "code" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-[#7b68ee]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )}
      {icon === "users" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-[#7b68ee]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )}
      <span>{text}</span>
    </div>
  );
}

function GlowingIcon({
  color = "#7b68ee",
  size = "md",
}: {
  color?: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={`relative ${size === "sm" ? "w-8 h-8" : "w-16 h-16"} flex items-center justify-center`}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color, opacity: 0.2, filter: "blur(8px)" }}
      ></div>
      <div
        className={`relative ${size === "sm" ? "w-6 h-6" : "w-12 h-12"} rounded-full flex items-center justify-center`}
        style={{ backgroundColor: color, opacity: 0.3 }}
      >
        <div
          className={`${size === "sm" ? "w-4 h-4" : "w-8 h-8"} rounded-full flex items-center justify-center`}
          style={{ backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}

function getRandomColor() {
  const colors = [
    "#7b68ee",
    "#9aff76",
    "#ff7676",
    "#76ffb8",
    "#a876ff",
    "#76e4ff",
    "#ffb876",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
