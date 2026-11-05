"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/tracking";

const defaultWhatsappUrl = "https://wa.me/9779827022781?text=Hi%20Rakesh%2C%20I%27m%20interested%20in%20your%20digital%20marketing%20services.%20I%27d%20like%20to%20know%20more.";

const journey = ["Attention", "Interest", "Inquiry", "Follow-up", "Sale"];
const photos = {
  personalBrand: {
    src: "/images/first-page-pic.png",
    alt: "Portrait of the Digi Tech Rakes digital marketing consultant",
  },
  kathmanduShop: {
    src: "/images/kathmandu-shop.jpg",
    alt: "Shopkeeper working inside a small, well-stocked neighborhood shop in Kathmandu",
    credit: "Safal Karki",
    href: "https://unsplash.com/photos/man-in-blue-polo-shirt-sitting-inside-brown-room-Bjo94tgBWzQ",
  },
  neighborhoodStore: {
    src: "/images/neighborhood-store.jpg",
    alt: "Shop owner seated behind the counter of a neighborhood store",
    credit: "Ali Mkumbwa",
    href: "https://unsplash.com/photos/a-woman-sitting-at-a-counter-in-a-store-EOkN2pRjFsg",
  },
  analytics: {
    src: "/images/marketing-analytics.jpg",
    alt: "Hands working at a laptop with a website analytics dashboard on screen",
    credit: "Myriam Jessier",
    href: "https://unsplash.com/es/fotos/persona-usando-macbook-pro-en-black-table-eveI7MOcSmw",
  },
  showroom: {
    src: "/images/furniture-showroom.jpg",
    alt: "Sunlit modern furniture showroom with a sofa, armchairs, and a coffee table",
    credit: "Lisa Anna",
    href: "https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-painting-on-the-wall-XUqstGHHlQc",
  },
  kochiShop: {
    src: "/images/kochi-shop.jpg",
    alt: "Shopkeeper seated at the counter of a busy open-front neighborhood store in Kochi",
    credit: "Wietse Jongsma",
    href: "https://unsplash.com/photos/a-man-smiles-in-a-packed-open-front-store-g3IR5Y3C730",
  },
  meeting: {
    src: "/images/business-meeting.jpg",
    alt: "Small business team reviewing a website and notes together around a table",
    credit: "Derek Coleman",
    href: "https://unsplash.com/photos/three-people-sitting-at-a-table-with-laptops-and-notebooks-Uzwig52Fpqg",
  },
  serviceAds: {
    src: "/images/facebook-ads.jpg",
    alt: "Digital advertising campaign analytics displayed on a laptop and phone",
  },
  serviceSocialMedia: {
    src: "/images/social-media-handling.jpg",
    alt: "Sculpted social media icons representing online community platforms",
  },
  serviceWebsite: {
    src: "/images/website-design.jpg",
    alt: "Illustration representing web design on a laptop screen",
    fit: "contain",
  },
  serviceDiagnosis: {
    src: "/images/business-diagnosis.jpg",
    alt: "Business team discussing a diagnosis and strategy around a visual planning board",
    fit: "contain",
  },
};
type StockPhoto = { src: string; alt: string; credit?: string; href?: string; fit?: "cover" | "contain" };

function PhotoCredit({ photo }: { photo: StockPhoto }) {
  if (!photo.credit || !photo.href) return null;
  return <a className="photo-credit" href={photo.href} target="_blank" rel="noreferrer">Photo: {photo.credit} / Unsplash</a>;
}

const services = [
  { number: "01", title: "Facebook Ads", text: "Reach potential customers with campaigns built around a specific business objective—not simply getting more views.", icon: "↗", photo: photos.serviceAds },
  { number: "02", title: "Social Media Handling", text: "Keep your online presence active, professional and relevant so customers have a reason to pay attention.", icon: "◌", photo: photos.serviceSocialMedia },
  { number: "03", title: "Website Design", text: "Create a professional online destination where customers can understand your business, products and next steps.", icon: "⌘", photo: photos.serviceWebsite },
  { number: "04", title: "Business Diagnosis", text: "Before recommending a solution, understand where your current customer journey may be breaking down.", icon: "⌕", photo: photos.serviceDiagnosis },
];
const faqs = [
  ["Do I need Facebook Ads?", "Not necessarily. We first look at your business, audience and current customer journey. If ads make sense, we can discuss a clear objective and what happens after someone responds."],
  ["Is boosting a post enough?", "You can boost a post yourself. The useful question is what you want that spend to achieve—reach, engagement, inquiries or another objective—and where interested people go next."],
  ["What if I've already tried Facebook Ads?", "That's okay. Instead of immediately saying you need more ads, we ask where the journey may be breaking: audience, creative, message, offer, objective, follow-up or conversion process."],
  ["Do you guarantee sales?", "No. Final sales also depend on your offer, pricing, product, customer demand, follow-up and sales process. My job is to help improve the digital marketing side and make the process clearer."],
  ["Do I need a website?", "It depends on how customers make decisions and what information they need. A website can provide a professional place to understand your business and take the next step, but it is not automatically the first solution for every business."],
  ["Can you manage my social media?", "Yes, social media handling can be part of the work. First, we should understand how it supports your broader customer journey rather than treating posts as the whole strategy."],
  ["How does the free consultation work?", "We use 30 minutes to discuss your current marketing, customer journey and biggest marketing problem, then talk through possible next steps. No complicated presentation or marketing lecture."],
  ["What type of businesses do you work with?", "The focus is local businesses in Nepal—such as retailers, suppliers, showrooms and service businesses. Tell me what you sell and who your customers are, and we can see if the conversation is useful."],
  ["Will you explain what you're doing?", "Yes. You should understand what we are trying to achieve, who we are trying to reach, what message we are communicating and what happens after someone inquires."],
  ["What happens after the consultation?", "You decide. If an approach makes sense, we can discuss working together. If it does not, you still leave with a clearer view of what may need attention."],
];

function whatsappHref() {
  return defaultWhatsappUrl;
}

function ConsultationLink({ children, className = "button button-primary", location }: { children: React.ReactNode; className?: string; location: string }) {
  return (
    <a className={className} href="#consultation" data-cta-location={location} onClick={() => trackEvent("click_consultation_cta")}>
      {children}<span aria-hidden="true"> ↗</span>
    </a>
  );
}

function WhatsAppLink({ children, className = "button button-secondary", location }: { children: React.ReactNode; className?: string; location: string }) {
  return (
    <a className={className} href={whatsappHref()} data-cta-location={location} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_whatsapp")} aria-label={`${children} (opens WhatsApp)`}>
      <span className="whatsapp-icon" aria-hidden="true">◉</span>{children}
    </a>
  );
}

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className="section-intro"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{children ? <p>{children}</p> : null}</div>;
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [sending, setSending] = useState(false);
  const formStarted = useRef(false);

  useEffect(() => {
    trackEvent("view_landing_page");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form).entries());
    trackEvent("submit_consultation_form");

    setSending(true);
    setFormStatus("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Request failed");
      setFormStatus("Thanks. Your consultation request has been received. I'll be in touch using your preferred contact method.");
      form.reset();
    } catch (error) {
      setFormStatus(error instanceof Error ? error.message : "Your request could not be sent just now. Please try again later.");
    } finally {
      setSending(false);
    }
  }

  const links = [["Home", "#home"], ["Problems", "#problems"], ["Services", "#services"], ["Process", "#process"], ["Results", "#results"], ["FAQ", "#faq"], ["Contact", "#consultation"]];

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label="Digi Tech Rakes home"><Image className="brand-logo" src="/images/digitech-rakes-logo.png" alt="Digi Tech Rakes — Digitalizing You" width={403} height={250} /></a>
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} id="site-navigation" aria-label="Main navigation">
            {links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <ConsultationLink className="button button-small button-primary nav-mobile-cta" location="navigation">Book Free Consultation Call</ConsultationLink>
          </nav>
          <ConsultationLink className="button button-small button-primary nav-desktop-cta" location="navigation">Book Free Consultation Call</ConsultationLink>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="hero-label"><span className="status-dot" /> DIGITAL MARKETING CONSULTATION FOR LOCAL BUSINESSES</div>
            <h1>Your Business Doesn’t Need More <em>Random Posts.</em></h1>
            <p className="hero-subtitle">It needs a simple digital system that turns attention into customer inquiries.</p>
            <p className="hero-body">I help local businesses in Nepal understand where customers are coming from, attract the right audience and make it easier for people to take the next step.</p>
            <div className="hero-actions"><WhatsAppLink className="button button-primary" location="hero">CHAT WITH RAKESH ON WHATSAPP</WhatsAppLink></div>
            <div className="hero-reassurance"><span className="checkmark">✓</span> No complicated marketing language. No unrealistic promises. Just a practical conversation about your business.</div>
          </div>
          <figure className="hero-visual hero-photo-visual hero-photo-visual--portrait">
            <Image src={photos.personalBrand.src} alt={photos.personalBrand.alt} fill sizes="(max-width: 760px) 100vw, 48vw" fetchPriority="high" />
            <div className="hero-photo-shade" />
            <div className="hero-photo-topline"><span>DIGI TECH RAKES</span><span>NEPAL · DIGITAL MARKETING</span></div>
            <div className="hero-photo-copy"><span className="photo-pill"><i /> YOUR DIGITAL PARTNER</span><strong>Digi Tech Rakes</strong><span>Digital marketing consultant for local businesses.</span></div>
            <div className="hero-photo-flow">{journey.map((item, index) => <span key={item}>{item}{index < journey.length - 1 && <b aria-hidden="true">→</b>}</span>)}</div>
          </figure>
          <div className="hero-bottom"><span>BUILT AROUND YOUR BUSINESS</span><div className="hero-flow">{journey.map((item, index) => <span key={item}>{item}{index < journey.length - 1 && <b aria-hidden="true">→</b>}</span>)}</div></div>
        </section>

        <section className="problem-section section-wrap" id="problems">
          <SectionIntro eyebrow="SOUND FAMILIAR?" title="Facebook मा Post गरिरहनुभएको छ… तर Customer किन आइरहेको छैन?" />
          <div className="problem-layout">
            <div className="problem-quote problem-photo"><Image src={photos.kathmanduShop.src} alt={photos.kathmanduShop.alt} fill sizes="(max-width: 760px) 100vw, 40vw" /><div className="problem-photo-shade" /><div className="problem-photo-copy"><span className="quote-mark">“</span><blockquote>Post ta halirako chu.<br />Tara result kina chaina?</blockquote><span className="quote-caption">A question many busy business owners ask themselves.</span></div><PhotoCredit photo={photos.kathmanduShop} /></div>
            <div className="problem-content"><p className="problem-lead">Your day is already full. Marketing shouldn’t feel like one more thing you have to guess at.</p><ul className="problem-list"><li>Posting without a clear strategy</li><li>Boosting posts without knowing the objective</li><li>Reaching people who may not be the right audience</li><li>Getting views, but not enough inquiries</li><li>Depending heavily on word-of-mouth</li><li>Spending money without understanding what it produces</li></ul></div>
          </div>
          <div className="problem-note"><span className="note-icon">↗</span><div><h3>The problem may not be your product.</h3><p>You already know your products are good. You already have customers. The problem may be the system connecting your business to potential customers online.</p></div></div>
          <div className="procrastination"><span className="eyebrow">WHEN MARKETING KEEPS SLIPPING</span><p>Marketing becomes another task on your list.</p><strong>“Bholi garamla.”</strong><span>But three months later… you’re still in the same place.</span></div>
          <div className="inline-cta"><p>Start with clarity before spending more money on marketing.</p><ConsultationLink className="text-link" location="after_problems">Let's talk about your business <span aria-hidden="true">↗</span></ConsultationLink></div>
        </section>

        <section className="system-section section-wrap" id="system">
          <SectionIntro eyebrow="A DIFFERENT WAY TO THINK ABOUT IT" title="What if your marketing worked like a system?">Not just more posts. A clearer view of the complete customer journey—from the first time someone notices you to the moment they get in touch.</SectionIntro>
          <div className="system-feature"><figure className="system-feature-photo"><Image src={photos.analytics.src} alt={photos.analytics.alt} fill sizes="(max-width: 760px) 100vw, 38vw" /><PhotoCredit photo={photos.analytics} /></figure><div className="system-feature-copy"><span className="eyebrow">LOOK PAST THE VIEW COUNT</span><h3>Did the right people see it—and what did they do next?</h3><p>A dashboard is only useful when it helps explain the next step in the customer journey. We look for clarity from audience and message through to inquiry and follow-up.</p><div className="feature-tags"><span>RIGHT AUDIENCE</span><span>CLEAR MESSAGE</span><span>USEFUL NEXT STEP</span></div></div></div>
          <div className="system-steps">{[{n:"01", t:"ATTRACT", d:"Get your business in front of the right type of people."},{n:"02",t:"CREATE INTEREST",d:"Use relevant content, offers and messaging."},{n:"03",t:"GENERATE INQUIRIES",d:"Give potential customers a clear reason and easy way to contact you."},{n:"04",t:"FOLLOW UP",d:"Move conversations to WhatsApp or Messenger where appropriate."},{n:"05",t:"SUPPORT CONVERSION",d:"Help interested customers understand your business and take the next step."}].map((step,i)=><article className="system-step" key={step.n}><div className="step-number">{step.n}<span>↗</span></div><h3>{step.t}</h3><p>{step.d}</p>{i < 4 && <div className="step-connector" aria-hidden="true" />}</article>)}</div>
          <div className="system-difference"><span>THE DIFFERENCE</span><p><s>“We’re posting on Facebook.”</s><b>“We’re building a customer acquisition system.”</b></p></div>
          <div className="journey-bar">{journey.map((item,i)=><div key={item}><span>0{i+1}</span><b>{item}</b>{i<4&&<i aria-hidden="true">→</i>}</div>)}</div>
        </section>

        <section className="services-section section-wrap" id="services">
          <SectionIntro eyebrow="WHAT I CAN HELP WITH" title="Your business deserves more than just social media posts.">The right solution depends on where your customer journey needs support. We start by understanding that before deciding what to do.</SectionIntro>
          <div className="services-grid">{services.map(service=><article className="service-card" key={service.number}><figure className={`service-photo${service.photo.fit === "contain" ? " service-photo--contain" : ""}`}><Image src={service.photo.src} alt={service.photo.alt} fill sizes="(max-width: 760px) 100vw, 25vw" /><PhotoCredit photo={service.photo} /></figure><div className="service-card-top"><span>{service.number} / 04</span><span className="service-icon" aria-hidden="true">{service.icon}</span></div><h3>{service.title}</h3><p>{service.text}</p><a href="#consultation" aria-label={`Discuss ${service.title}`}>Explore what fits <span aria-hidden="true">↗</span></a></article>)}</div>
          <div className="leak-note"><span className="leak-mark">!</span><p>You don’t need more marketing. <b>You need to fix the part of the marketing journey that’s already leaking opportunities.</b></p></div>
          <div className="value-section"><div><span className="eyebrow">WHAT WE CAN BUILD TOGETHER</span><h3>A practical digital marketing system for your business.</h3><p>Clear communication at every step, so you understand what is being done and why.</p></div><ul className="value-list">{[["Facebook Ads","Campaign planning, audience targeting, creative direction and optimization."],["Social Media Handling","Content planning and management designed around your business and audience."],["Website Design","A professional website where interested customers can learn about your business and take action."],["Customer Journey Planning","Identify how someone moves from discovering your business to making an inquiry."],["Conversion Thinking","Look beyond likes and followers and consider what happens after someone sees your marketing."],["Clear Communication","Understand what is being done and why."]].map(([title,desc])=><li key={title}><span>✓</span><div><b>{title}</b><p>{desc}</p></div></li>)}</ul></div>
        </section>

        <section className="benefits-section section-wrap">
          <div className="benefit-heading"><span className="eyebrow">THE GOAL IS CLARITY AND PROGRESS</span><h2>What can this help you achieve?</h2><p>Work toward a clearer path from reach to inquiry. No guaranteed results—just thoughtful attention to the parts you can improve.</p></div>
          <div className="benefits-grid">{["More relevant visibility","More customer inquiries","A more professional online presence","Less marketing confusion","Less dependence on random posting","More clarity about the customer journey"].map((benefit,i)=><div className="benefit-item" key={benefit}><span>0{i+1}</span><b>{benefit}</b><i aria-hidden="true">↗</i></div>)}</div>
        </section>

        <section className="trust-section section-wrap" id="trust">
          <div className="trust-copy"><span className="eyebrow">A STRAIGHTFORWARD PROMISE</span><h2>And here's what<br />we <em>don't</em> promise.</h2><p className="trust-lead">We don’t believe in:</p><ul className="dont-list"><li>“Spend Rs. 10,000 and definitely make Rs. 1 lakh.”</li><li>“Guaranteed sales.”</li><li>“Thousands of followers = successful business.”</li><li>“One Facebook campaign will solve everything.”</li></ul></div>
          <div className="trust-panel"><div className="trust-panel-icon">✳</div><p>Your final sales can also depend on:</p><div className="dependency-flow"><span>Your offer</span><b>+</b><span>Pricing</span><b>+</b><span>Product</span><b>+</b><span>Customer demand</span><b>+</b><span>Follow-up</span><b>+</b><span>Sales process</span></div><p>My job is to help improve the digital marketing side of that journey and make the process clearer.</p><div className="trust-signoff">No magic. No fake guarantees.<strong>Just a more thoughtful marketing system.</strong></div></div>
        </section>

        <section className="process-section section-wrap" id="process">
          <SectionIntro eyebrow="A LOW-PRESSURE FIRST STEP" title="What happens when you contact us?">No pressure. The purpose of the first conversation is clarity.</SectionIntro>
          <div className="process-layout"><div className="process-list">{[["01","We talk about your business","Tell me what you sell, who your customers are and what you’re currently doing online."],["02","We diagnose","We look at your current digital presence and identify potential gaps in your customer journey."],["03","We discuss your options","I’ll explain what could make sense for your business—and what may not be necessary."],["04","You decide","If the approach makes sense for you, we can discuss working together."]].map(([n,title,text])=><article key={n} className="process-row"><span className="process-number">{n}</span><h3>{title}</h3><p>{text}</p><span className="process-arrow" aria-hidden="true">↗</span></article>)}</div><figure className="process-photo"><Image src={photos.meeting.src} alt={photos.meeting.alt} fill sizes="(max-width: 760px) 100vw, 34vw" /><div className="process-photo-note"><span>NO PRESSURE</span><b>Just a practical conversation about your business.</b></div><PhotoCredit photo={photos.meeting} /></figure></div>
          <div className="process-bottom"><span>NO PRESSURE</span><p>The first conversation is about your business—not a sales presentation.</p><ConsultationLink className="button button-outline" location="after_process">BOOK FREE CONSULTATION CALL</ConsultationLink></div>
        </section>

        <section className="diagnostic-section section-wrap">
          <div className="diagnostic-intro"><div className="diagnostic-heading"><span className="eyebrow">CONSULTANT-LED, BUSINESS-FIRST</span><h2>We don't just manage Facebook pages.</h2><p>Diagnose first. Then recommend the appropriate solution.</p></div><figure className="diagnostic-art"><Image src="/images/business-diagnosis-two.jpg" alt="A key on a keyboard’s Growth key, representing a path to business growth" width={1920} height={1285} sizes="(max-width: 760px) 260px, 310px" /><figcaption><span>01 /</span> DIGITAL BUSINESS DIAGNOSIS</figcaption></figure></div>
          <div className="comparison"><div className="comparison-side comparison-basic"><span>THE USUAL LOOP</span><div>Post <i>→</i> Boost <i>→</i> Hope</div></div><div className="comparison-divider"><span>OR</span></div><div className="comparison-side comparison-system"><span>THE DIGI TECH RAKES APPROACH</span><div className="comparison-flow">{["Understand business","Understand customer","Diagnose marketing gap","Choose appropriate strategy","Attract","Generate inquiry","Follow up","Measure / improve"].map((item,i)=><span key={item}><b>{String(i+1).padStart(2,"0")}</b>{item}</span>)}</div></div></div>
        </section>

        <section className="philosophy-section section-wrap">
          <SectionIntro eyebrow="LOOK BEYOND THE VIEW COUNT" title="A better way to think about digital marketing" />
          <div className="question-steps">{["How many people saw my post?","Did the right people see it?","Did they become interested?","Did they inquire?","Did we follow up?","Did the business have a chance to convert that inquiry into a sale?"].map((q,i)=><div className="question-step" key={q}><span>0{i+1}</span><p>{q}</p><b aria-hidden="true">{i===5?"✓":"↓"}</b></div>)}</div>
          <p className="philosophy-answer">That’s the system I’m interested in building.</p>
        </section>

        <section className="proof-section section-wrap" id="results">
          <div className="proof-header"><div><span className="eyebrow">SAMPLE PROOF / RESULTS</span><h2>Show the work.<br /><em>Don’t just talk about it.</em></h2></div><p>These are illustrative drafts to show how client feedback and case studies could look. They are not real testimonials, projects, or performance results.</p></div>
          <div className="proof-grid">
            <article className="proof-card proof-testimonial">
              <span className="proof-label">SAMPLE TESTIMONIAL COPY</span>
              <span className="proof-disclosure">DEMO ONLY · NOT REAL CLIENT FEEDBACK</span>
              <div className="proof-quote-sample"><div className="proof-quote-mark">“</div><blockquote className="proof-quote">I was posting regularly but couldn’t tell what was leading to inquiries. The review helped me see a clearer next step for interested customers.</blockquote><div className="proof-person"><span className="proof-avatar">EX</span><div><b>Example local retailer</b><span>Illustrative quote · replace with approved client feedback</span></div></div></div>
              <div className="proof-quote-sample"><div className="proof-quote-mark">“</div><blockquote className="proof-quote">The conversation helped me focus on useful inquiries and follow-up instead of counting likes alone.</blockquote><div className="proof-person"><span className="proof-avatar">EX</span><div><b>Example service business</b><span>Illustrative quote · replace with approved client feedback</span></div></div></div>
            </article>
            <article className="proof-card proof-case">
              <span className="proof-label">SAMPLE CASE STUDIES</span>
              <span className="proof-disclosure">HYPOTHETICAL EXAMPLES · NO RESULTS CLAIMED</span>
              <div className="proof-case-item"><h3>Furniture showroom</h3><p><b>Starting point</b> Social posts attract attention, but shoppers have no simple place to compare products and ask questions.</p><p><b>Example plan</b> Create a product-focused page with clear categories and a WhatsApp inquiry step.</p><p><b>What to measure</b> Qualified inquiries, response time, and follow-up.</p></div>
              <div className="proof-case-item"><h3>Neighborhood retailer</h3><p><b>Starting point</b> Customers ask repeated questions about products, hours, and availability across social channels.</p><p><b>Example plan</b> Organize helpful FAQs and set a simple routine for answering and following up on inquiries.</p><p><b>What to measure</b> Inquiry quality and how quickly questions receive a reply.</p></div>
            </article>
            <article className="proof-card proof-work">
              <span className="proof-label">SAMPLE WORK CONCEPTS</span>
              <span className="proof-disclosure">IDEAS ONLY · NOT PUBLISHED CLIENT WORK</span>
              <div className="sample-placeholder"><span>01</span><div><b>Facebook ad concept</b><small>One audience · one offer · one clear WhatsApp action</small></div></div>
              <div className="sample-placeholder"><span>02</span><div><b>Website concept</b><small>Services and products presented with a clear next step</small></div></div>
              <div className="sample-placeholder"><span>03</span><div><b>Social content concept</b><small>Product spotlight · customer question · useful answer</small></div></div>
            </article>
          </div>
        </section>

        <section className="consultation-section section-wrap" id="consultation">
          <div className="consultation-copy"><span className="eyebrow">A FREE 30-MINUTE BUSINESS MARKETING CONSULTATION</span><h2>Start with a conversation about <em>your business.</em></h2><p className="consultation-subtitle">Before talking about packages… let’s talk about your business.</p><p>We’ll discuss your current marketing, customer journey, biggest marketing problem, and possible next steps.</p><div className="consultation-points"><span>✓ No complicated presentation.</span><span>✓ No marketing lecture.</span><span>✓ Just a practical conversation about your business.</span></div><div className="consultation-aside"><span className="aside-clock">◷</span><div><b>30 minutes. No pressure.</b><p>Start with clarity before spending more money on marketing.</p></div></div><WhatsAppLink location="consultation">TALK TO US ON WHATSAPP</WhatsAppLink></div>
          <div className="form-card"><div className="form-heading"><span className="eyebrow">TELL ME A LITTLE ABOUT YOUR BUSINESS</span><h3>Let’s find your marketing gaps.</h3><p>A few details will help make the conversation useful.</p></div><form onSubmit={handleSubmit} onFocus={() => { if (!formStarted.current) { formStarted.current = true; trackEvent("start_consultation_form"); } }}>
            <div className="field-row"><label>Your name<input autoComplete="name" name="name" required minLength={2} placeholder="e.g. Rakesh" /></label><label>Business name<input autoComplete="organization" name="business" required minLength={2} placeholder="Your business" /></label></div>
            <label>Business type<input name="businessType" required placeholder="e.g. Furniture showroom" /></label>
            <label>Phone / WhatsApp number<input autoComplete="tel" name="phone" type="tel" required minLength={7} placeholder="Your preferred number" /></label>
            <label>What’s your biggest marketing problem?<textarea name="problem" rows={3} required minLength={8} placeholder="Tell me what feels difficult right now…" /></label>
            <label>Preferred contact method<select name="preferredContact" defaultValue="WhatsApp"><option>WhatsApp</option><option>Phone call</option><option>Messenger</option></select></label>
            <button className="button button-primary form-submit" type="submit" disabled={sending}>{sending ? "SENDING YOUR REQUEST…" : "SUBMIT CONSULTATION REQUEST"}<span aria-hidden="true"> ↗</span></button>
            <p className="form-note">Your name, phone and consultation details are sent to the site owner through FormSubmit.</p>
            <p aria-live="polite" className={`form-status ${formStatus.includes("could not") || formStatus.includes("couldn't") || formStatus.includes("not connected") || formStatus.includes("FormSubmit:") || formStatus.includes("Unable") ? "is-error" : ""}`}>{formStatus}</p>
          </form></div>
        </section>

        <section className="faq-section section-wrap" id="faq">
          <div className="faq-heading"><span className="eyebrow">GOOD QUESTIONS</span><h2>Before we talk…</h2><p>Clear answers, no marketing lecture.</p></div>
          <div className="faq-list">{faqs.map(([question,answer])=><details key={question} className="faq-item"><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </section>

        <section className="final-cta section-wrap">
          <div className="final-cta-pattern" aria-hidden="true">DR</div><div className="final-cta-content"><span className="eyebrow">YOUR NEXT STEP</span><h2>Ready to find your<br /><em>marketing gaps?</em></h2><p>Let’s diagnose your business before we prescribe the solution.</p><div className="hero-actions"><ConsultationLink location="final">BOOK FREE CONSULTATION CALL</ConsultationLink></div><span className="final-reassurance">Simple conversation. &nbsp; Clear explanation. &nbsp; No unrealistic promises.</span></div><div className="final-statement"><span>ONE CLEARER DIGITAL PATH</span><p>Your business already has something worth selling.<br /><b>Let’s build a clearer digital path for the people who need it.</b></p></div>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><a className="brand" href="#home" aria-label="Digi Tech Rakes home"><Image className="brand-logo" src="/images/digitech-rakes-logo.png" alt="Digi Tech Rakes — Digitalizing You" width={403} height={250} /></a><p>Digital marketing consultation for local businesses.</p><span className="footer-location">NEPAL · DIGITAL MARKETING CONSULTANT</span></div><div className="footer-nav"><b>EXPLORE</b><a href="#home">Home</a><a href="#services">Services</a><a href="#process">Process</a><a href="#faq">FAQ</a><a href="#consultation">Contact</a></div><div className="footer-contact"><b>START WITH A CONVERSATION</b><p>No complicated presentation. Just a practical conversation about your business.</p><ConsultationLink className="footer-cta" location="footer">BOOK FREE CONSULTATION CALL</ConsultationLink><WhatsAppLink className="footer-whatsapp" location="footer">TALK TO US ON WHATSAPP</WhatsAppLink><span className="footer-config-note">WhatsApp opens with a message ready for you to send.</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Digi Tech Rakes</span><div><span>Privacy Policy <small>(add page)</small></span><span>Terms <small>(add page)</small></span></div><span>Built around the customer journey <b>↗</b></span></div></footer>

      <a className="floating-whatsapp" href={whatsappHref()} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_whatsapp")} aria-label="Talk to us on WhatsApp"><span aria-hidden="true">◉</span><b>WhatsApp</b></a>
      <div className="mobile-bottom-cta"><ConsultationLink className="button button-primary" location="mobile_sticky">BOOK FREE CONSULTATION CALL</ConsultationLink></div>
    </>
  );
}
