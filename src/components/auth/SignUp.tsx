import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#121218]">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo-black.png"
            alt="xEmergence Logo"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-xl font-bold text-white">xEmergence</span>
        </Link>
      </div>

      <Card className="w-full max-w-md bg-[#1e1e2d] border-[#2a2a3a]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">
            Create an Account
          </CardTitle>
          <CardDescription className="text-gray-300">
            Sign up to access the xEmergence dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#7b68ee] hover:bg-[#6a5acd] text-white rounded-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2a2a3a]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1e1e2d] px-2 text-gray-300">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
            >
              Google
            </Button>
            <Button
              variant="outline"
              className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
            >
              GitHub
            </Button>
          </div>
          <div className="text-center mt-4 text-gray-300">
            Already have an account?{" "}
            <Link to="/login">
              <Button
                variant="link"
                className="p-0 text-[#7b68ee] hover:text-[#6a5acd]"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
