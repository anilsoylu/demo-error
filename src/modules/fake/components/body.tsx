import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Crown,
  Star,
  Users,
  PlayCircle,
  Gamepad2,
  Trophy,
  Zap,
  ChevronRight,
  Target,
  Shield,
  Clock,
} from "lucide-react";

export default function FakePageBody() {
  const gameFeatures = [
    {
      icon: Gamepad2,
      title: "Premium Games",
      description: "Discover the latest and most popular games",
    },
    {
      icon: Trophy,
      title: "Tournaments",
      description: "Compete with other players and win prizes",
    },
    {
      icon: Users,
      title: "Social Gaming",
      description: "Play together with your friends",
    },
    {
      icon: Zap,
      title: "Instant Play",
      description: "Start immediately, no download required",
    },
  ];

  const popularGames = [
    {
      title: "Action Arena",
      category: "Action",
      players: "1.2K+",
      rating: 4.8,
    },
    {
      title: "Puzzle Master",
      category: "Puzzle",
      players: "850+",
      rating: 4.9,
    },
    {
      title: "Racing World",
      category: "Racing",
      players: "2.1K+",
      rating: 4.7,
    },
  ];
  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge variant="secondary" className="mb-6">
            🎮 New Games Added
          </Badge>

          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="text-primary">Welcome to the</span>
            <br />
            Gaming World
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Take your place on our platform full of fun games, competitive
            tournaments, and social experiences. Play with friends and win
            amazing prizes!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8">
              Explore Games
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              How It Works?
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose Us?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameFeatures.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all group"
              >
                <CardHeader>
                  <feature.icon
                    className="mx-auto text-primary mb-4 group-hover:scale-110 transition-transform"
                    size={48}
                  />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-3xl font-bold text-foreground">
              Popular Games
            </h3>
            <Button variant="outline">
              View All
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularGames.map((game, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {game.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {game.category}
                      </p>
                    </div>
                    <Crown className="text-primary" size={20} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-1">
                      <Star
                        className="text-yellow-500 fill-current"
                        size={16}
                      />
                      <span className="text-sm font-medium">{game.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {game.players} players
                      </span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <PlayCircle className="mr-2" size={16} />
                    Start Game
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            Join Now and Start Playing!
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Create a free account and take your place among thousands of
            players. Join daily tournaments and win amazing prizes!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              <Target className="mr-2" size={20} />
              Sign Up Free
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              <Trophy className="mr-2" size={20} />
              Join Tournaments
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield size={20} />
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={20} />
              <span>4.8/5 Player Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span>25,000+ Active Players</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>24/7 Gaming Support</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
