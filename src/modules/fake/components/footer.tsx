import { Gamepad2 } from "lucide-react";

export default function FakePageFooter() {
  return (
    <footer className="bg-card border-t py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Gamepad2 className="text-primary-foreground" size={20} />
            </div>
            <span className="font-bold text-foreground">
              KzamLongIsland Gaming
            </span>
          </div>

          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>© 2024 KzamLongIsland. All rights reserved.</p>
            <p>Designed for safe and fun gaming experience.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
