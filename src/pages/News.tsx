import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, Search, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const News = () => {
  const { t } = useLanguage();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginRole, setLoginRole] = useState<"buyer" | "seller" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleLoginClick = (role?: "buyer" | "seller") => {
    setLoginRole(role || null);
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: t('news_post_1_title'),
      excerpt: t('news_post_1_excerpt'),
      content: "",
      author: "Maria Silva",
      date: "2026-02-05",
      readTime: "5 min",
      category: t('news_category_market'),
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
    },
    {
      id: 2,
      title: t('news_post_2_title'),
      excerpt: t('news_post_2_excerpt'),
      content: "",
      author: "João Santos",
      date: "2026-02-04",
      readTime: "7 min",
      category: t('news_category_tips'),
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2096&auto=format&fit=crop"
    },
    {
      id: 3,
      title: t('news_post_3_title'),
      excerpt: t('news_post_3_excerpt'),
      content: "",
      author: "Ana Costa",
      date: "2026-02-03",
      readTime: "6 min",
      category: t('news_category_trends'),
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      title: t('news_post_4_title'),
      excerpt: t('news_post_4_excerpt'),
      content: "",
      author: "Pedro Alves",
      date: "2026-02-02",
      readTime: "4 min",
      category: t('news_category_investment'),
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 5,
      title: t('news_post_5_title'),
      excerpt: t('news_post_5_excerpt'),
      content: "",
      author: "Sofia Rodrigues",
      date: "2026-02-01",
      readTime: "8 min",
      category: t('news_category_legal'),
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 6,
      title: t('news_post_6_title'),
      excerpt: t('news_post_6_excerpt'),
      content: "",
      author: "Ricardo Mendes",
      date: "2026-01-31",
      readTime: "5 min",
      category: t('news_category_tech'),
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const categories = [
    { id: "all", label: t('news_category_all') },
    { id: "market", label: t('news_category_market') },
    { id: "tips", label: t('news_category_tips') },
    { id: "trends", label: t('news_category_trends') },
    { id: "investment", label: t('news_category_investment') },
    { id: "legal", label: t('news_category_legal') },
    { id: "tech", label: t('news_category_tech') }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === categories.find(c => c.id === selectedCategory)?.label;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={handleLoginClick} />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-4">
                {t('news_title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('news_subtitle')}
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('news_search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-xl"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-2xl text-muted-foreground">{t('news_no_results')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        {post.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        {t('news_read_more')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 px-4 md:px-6 bg-muted/30">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('news_newsletter_title')}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('news_newsletter_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder={t('news_newsletter_placeholder')}
                className="flex-1 h-12"
              />
              <Button size="lg" className="h-12 px-8">
                {t('news_newsletter_button')}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseLoginModal} 
        initialRole={loginRole} 
      />
    </div>
  );
};

export default News;
