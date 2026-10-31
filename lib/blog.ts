// Blog posts. Content is stored as simple blocks so every post renders with the same design.
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title: string; text: string; cta?: { label: string; href: string } }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  category: string;
  keywords: string[];
  published: string; // ISO date
  updated: string; // ISO date
  readMinutes: number;
  author: string;
  imagePrompt: string; // prompt used to generate the featured image
  image?: { src: string; alt: string; width: number; height: number };
  body: Block[];
  faq: { q: string; a: string }[];
};

export const POSTS: Post[] = [
  {
    slug: "do-small-businesses-need-an-ai-chatbot",
    title: "Do Small Businesses Really Need an AI Chatbot on Their Website?",
    seoTitle: "Do Small Businesses Need an AI Chatbot on Their Website?",
    description:
      "Is an AI chatbot worth it for a small business website? What it does, what it costs, when you don't need one, and how to get one free with your website.",
    excerpt:
      "Most visitors leave without asking their question. Here is what a website chatbot actually does for a small business, when it is worth it, and when it is not.",
    category: "AI for Business",
    keywords: [
      "AI chatbot for small business",
      "do I need a chatbot on my website",
      "website chatbot",
      "chatbot for small business website",
      "AI chatbot cost",
      "24/7 customer service small business",
      "free chatbot with website",
    ],
    published: "2026-10-31",
    updated: "2026-10-31",
    readMinutes: 7,
    author: "Zoxen Digital Team",
    image: {
      src: "/blog/ai-chatbot-for-small-business-website.webp",
      alt: "AI chatbot answering a customer question on a small business website, shown on a laptop",
      width: 1600,
      height: 900,
    },
    imagePrompt:
      "A clean, modern illustration for a blog header: a small business website open on a laptop, with a friendly AI chat window in the bottom right corner answering a customer question. Soft light background (off-white to pale lavender), indigo and violet accent colors (#4f46e5, #7c3aed), subtle floating chat bubbles, minimal flat 3D style, no text, no logos, wide 16:9 composition, lots of clean space on the left.",
    body: [
      { type: "p", text: "Picture this. It is 9:40 at night and someone lands on your website. They like what they see, but they have one question before they reach out. Do you serve their area? How much does it cost? Can they book this week?" },
      { type: "p", text: "There is nobody to ask, so they close the tab. Most of the time you never even know they were there." },
      { type: "p", text: "That small moment is the real reason AI chatbots have become so common on small business websites. Not because they are trendy, but because the questions keep coming at times when nobody is around to answer them." },
      { type: "p", text: "So, do you actually need one? Short answer: if people visit your website and have questions before they buy, a chatbot will probably pay for itself. Let's look at why, and also when it is not worth it." },

      { type: "h2", id: "what-it-does", text: "What does an AI chatbot actually do on a website?" },
      { type: "p", text: "A modern AI chatbot is trained on your own business information: your services, prices, opening hours, service areas and common questions. When a visitor types a question, it replies in seconds, in plain language, using that information." },
      { type: "p", text: "Older chatbots worked with rigid menus and buttons, and they were frustrating. The newer ones understand normal sentences. Someone can type \"do you guys do weekend appointments in Dallas\" and get a real answer." },
      { type: "p", text: "In practice, a good website chatbot handles three jobs:" },
      { type: "ul", items: [
        "Answers the same questions you get every day, so customers don't have to wait for you.",
        "Collects the visitor's name, phone number or email when they are interested, so you can follow up.",
        "Hands the conversation to you when it needs a human, like a custom quote or a complaint.",
      ] },

      { type: "h2", id: "main-benefit", text: "The biggest benefit: customers get answers without waiting for anyone" },
      { type: "p", text: "This is the part most business owners underestimate. When a customer arrives on your website, they usually have a handful of simple questions. How much? How long does it take? Do you work in my city? What do I need to get started?" },
      { type: "p", text: "Without a chatbot, they have two choices. Dig through your pages hoping to find the answer, or send a message and wait. Many people do neither. They just leave and try the next business in the search results." },
      { type: "p", text: "With a chatbot, those questions get cleared up right away. The customer does not need to call, email or wait for someone to be online. By the time they do contact you, they already know your prices and process, so the conversation is shorter and they are much closer to saying yes." },
      { type: "quote", text: "A chatbot does not replace you. It handles the first ten questions so your real conversations start at question eleven." },

      { type: "h2", id: "other-benefits", text: "Other ways a chatbot helps a small business" },
      { type: "h3", text: "It works after hours" },
      { type: "p", text: "Your website is open 24 hours a day, but you are not. A lot of people browse in the evening or on weekends, after their own work is done. A chatbot keeps answering while you sleep, and the leads are waiting for you in the morning." },
      { type: "h3", text: "It turns visitors into leads" },
      { type: "p", text: "A contact form just sits there. A chatbot starts a conversation. When someone asks about pricing, it can answer and then ask, \"Would you like us to send you a quote?\" That simple question turns a quiet visitor into a name and number you can call." },
      { type: "h3", text: "It saves you time" },
      { type: "p", text: "If you answer the same five questions by phone or WhatsApp every day, that adds up to hours every month. A chatbot takes that load off you and your team, so you can spend the time on actual paying work." },
      { type: "h3", text: "It makes a small business look bigger" },
      { type: "p", text: "Fast replies feel professional. A visitor who gets an instant, helpful answer at night gets the impression of a well-run company, even if your whole team is two people." },

      { type: "h2", id: "when-not-needed", text: "When you probably don't need a chatbot" },
      { type: "p", text: "We build chatbots, so it would be easy to say every business needs one. That is not true, and it is worth being honest about." },
      { type: "ul", items: [
        "Your website gets very few visitors, maybe a handful a week. There is not much for a chatbot to do yet.",
        "Almost every enquiry needs a long, custom conversation, like a large construction contract or legal advice.",
        "You already reply to every message within minutes, all day and evening.",
      ] },
      { type: "p", text: "Even then, a chatbot can still help with the basic questions. But if your traffic is low, the first priority is getting more people to your site, through SEO or ads, and then adding a chatbot to convert them." },

      { type: "h2", id: "cost", text: "How much does an AI chatbot cost for a small business?" },
      { type: "p", text: "Prices vary a lot depending on how it is built. Ready-made chatbot tools usually charge a monthly subscription, and custom-built bots can cost thousands of dollars up front. On top of that, someone has to set it up properly and train it on your business, which is where many owners get stuck." },
      { type: "p", text: "For most small businesses, the best value is a chatbot that comes set up with your website, already trained on your services, so you don't have to figure out the technical side yourself." },
      { type: "callout", title: "Get an AI chatbot free with your website", text: "At Zoxen Digital, every Standard website package includes a free AI chatbot, normally a $30 add-on. We set it up and train it on your services, prices and common questions, so it starts answering customers from day one.", cta: { label: "See the $99 website package", href: "/web-development" } },

      { type: "h2", id: "good-chatbot", text: "What makes a good small business chatbot" },
      { type: "p", text: "Not every chatbot is helpful. A bad one annoys people more than having no chatbot at all. Before you add one, make sure it does these things well:" },
      { type: "ul", items: [
        "It is honest that it is an AI assistant and does not pretend to be a person.",
        "It only answers from your real business information instead of making things up.",
        "It offers to connect the visitor with a human when the question is complex.",
        "It asks for contact details at the right moment, not the second someone arrives.",
        "It looks like part of your website and works well on mobile, where most visitors are.",
      ] },

      { type: "h2", id: "verdict", text: "So, is it worth it?" },
      { type: "p", text: "For most small businesses with a steady flow of website visitors, yes. A chatbot answers the questions customers have before they buy, it works when you are offline, and it quietly collects leads you would otherwise lose." },
      { type: "p", text: "The key is to keep it simple. Train it on your real information, let it handle the common questions, and keep a human in the loop for anything important. Done that way, it feels less like a robot and more like a helpful front desk that never goes home." },
    ],
    faq: [
      { q: "Is an AI chatbot worth it for a small business?", a: "Usually, yes, if your website gets regular visitors who have questions before buying. It answers common questions instantly, works after hours and captures leads. If your site gets very few visitors, focus on traffic first." },
      { q: "Can a chatbot answer questions about my specific business?", a: "Yes. A modern AI chatbot is trained on your own information, such as services, prices, hours and service areas, so it answers based on your business rather than generic replies." },
      { q: "Will customers be annoyed by a chatbot?", a: "Not if it is set up well. People mainly get frustrated when a bot pretends to be human, gives wrong answers or blocks them from reaching a person. A good chatbot is upfront, accurate and hands over to a human when needed." },
      { q: "How much does a website chatbot cost?", a: "It ranges from monthly subscriptions for ready-made tools to thousands of dollars for custom builds. With Zoxen Digital, an AI chatbot is included free with the Standard website package." },
      { q: "Does a chatbot replace a customer service person?", a: "No. It handles the repetitive first questions so you and your team can focus on real conversations, quotes and closing sales." },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
