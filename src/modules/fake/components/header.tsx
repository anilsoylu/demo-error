import { Gamepad2, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FakePageHeader() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Gamepad2 className="text-primary-foreground" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                KzamLongIsland
              </h1>
              <p className="text-xs text-muted-foreground">Gaming Platform</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6">
            {["Home", "Games", "Tournaments", "Leaderboard", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </nav>

          <Button>
            <PlayCircle className="mr-2" size={16} />
            Play Now
          </Button>
        </div>
      </div>
    </header>
  );
}
