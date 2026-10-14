import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleDollarSign,
  Heart,
  Instagram,
  Landmark,
  Leaf,
  Mail,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Sparkles,
  Sun,
  Utensils,
  Users,
  X,
} from 'lucide-react';

const photos = {
  hero: 'https://images.pexels.com/photos/8042458/pexels-photo-8042458.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
  food: 'https://images.pexels.com/photos/9090750/pexels-photo-9090750.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  volunteers: 'https://images.pexels.com/photos/7849437/pexels-photo-7849437.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  books: 'https://images.pexels.com/photos/39523809/pexels-photo-39523809.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  supplies: 'https://images.pexels.com/photos/6646778/pexels-photo-6646778.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  community: 'https://images.pexels.com/photos/35671829/pexels-photo-35671829.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
};

type Icon = typeof Heart;
type GalleryCategory = 'Toutes' | 'Aide alimentaire' | 'Enfants' | 'Activités' | 'Éducation';

type GalleryItem = {
  title: string;
  category: Exclude<GalleryCategory, 'Toutes'>;
  image: string;
  tall?: boolean;
};

const galleryItems: GalleryItem[] = [
  { title: 'Un repas partagé', category: 'Aide alimentaire', image: photos.food, tall: true },
  { title: 'Grandir ensemble', category: 'Enfants', image: photos.hero },
  { title: 'Des livres pour demain', category: 'Éducation', image: photos.books },
  { title: 'La force du collectif', category: 'Activités', image: photos.volunteers, tall: true },
  { title: 'Préparer, servir, aimer', category: 'Aide alimentaire', image: photos.supplies },
  { title: 'Chaque sourire compte', category: 'Enfants', image: photos.community },
];

const actions = [
  { icon: Utensils, number: '01', title: 'Aide alimentaire', text: 'Des repas et des denrées pour répondre aux besoins les plus essentiels.' },
  { icon: BookOpen, number: '02', title: 'Soutien scolaire', text: 'Fournitures, accompagnement et encouragement pour apprendre sereinement.' },
  { icon: Package, number: '03', title: 'Aide matérielle', text: 'Vêtements et biens essentiels collectés avec soin et distribués avec dignité.' },
  // { icon: Sparkles, number: '04', title: 'Activités bibliques', text: 'Des temps de prière, de partage et de découverte de la foi chrétienne.' },
  { icon: Sun, number: '04', title: 'Activités éducatives', text: 'Des ateliers, jeux et rencontres pour grandir, créer et s’épanouir.' },
];

const values = [
  ['Amour', 'Nous plaçons l’amour du prochain au cœur de notre engagement.'],
  ['Dignité', 'Chaque enfant mérite respect, attention et considération.'],
  ['Compassion', 'Nous sommes attentifs aux réalités et aux besoins de chacun.'],
  ['Foi', 'Notre action est inspirée par notre foi chrétienne.'],
  ['Espérance', 'Nous croyons qu’un avenir meilleur est possible.'],
  ['Service', 'Nous mettons nos ressources et nos compétences au service des autres.'],
];

function Brand({ light = false, logo = '/logo_header.png' }: { light?: boolean; logo?: string }) {
  return (
    <a href="#accueil" className={`brand ${light ? 'brand-light' : ''}`} aria-label="Pain et Espérance, accueil">
      <img className="brand-logo" src={logo} alt="Pain & Espérance" />
    </a>
  );
}

function Button({ children, href = '#soutenir', variant = 'primary', onClick }: { children: React.ReactNode; href?: string; variant?: 'primary' | 'light' | 'outline'; onClick?: () => void }) {
  return <a onClick={onClick} className={`button button-${variant}`} href={href}>{children}<ArrowRight size={16} strokeWidth={2.5} /></a>;
}

function SectionIntro({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className={`section-intro ${light ? 'section-intro-light' : ''}`}><span className="eyebrow"><span />{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<GalleryCategory>('Toutes');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const [contactSent, setContactSent] = useState(false);
  const [volunteerSent, setVolunteerSent] = useState(false);

  useEffect(() => {
    document.title = 'Pain & Espérance — Nourrir le corps, éveiller l’âme';
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('hashchange', closeMenu);
    return () => window.removeEventListener('hashchange', closeMenu);
  }, []);

  const filteredGallery = useMemo(() => galleryFilter === 'Toutes' ? galleryItems : galleryItems.filter((item) => item.category === galleryFilter), [galleryFilter]);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSent(true);
    event.currentTarget.reset();
  };

  const submitVolunteer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVolunteerSent(true);
    event.currentTarget.reset();
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigation principale">
            <a href="#accueil">Accueil</a><a href="#mission">Notre mission</a><a href="#vision">Notre vision</a><a href="#galerie">Galerie</a><a href="#actualites">Actualités</a><a href="#soutenir">Nous soutenir</a><a href="#contact">Contact</a>
          </nav>
          <div className="header-actions"><a className="header-donate" href="#don"><Heart size={15} fill="currentColor" />Faire un don</a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">{menuOpen ? <X /> : <Menu />}</button></div>
        </div>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-image" style={{ backgroundImage: `url(${photos.hero})` }} />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <div className="hero-kicker"><span className="cross-line"></span> Une présence qui prend soin</div>
            <h1>Nourrir le corps,<br /><em>éveiller l’âme.</em></h1>
            <p className="hero-lead">Semer l’amour, transmettre l’espérance et contribuer à bâtir un avenir meilleur pour les enfants vulnérables.</p>
            <div className="hero-buttons"><Button href="#soutenir">Nous soutenir</Button><Button href="#actions" variant="light">Découvrir nos actions</Button></div>
            <div className="hero-note"><span className="note-line" />Une association chrétienne engagée auprès des enfants vulnérables.</div>
          </div>
          <div className="hero-scroll"><span />Défiler pour découvrir</div>
        </section>

        <section className="intro-band" id="mission">
          <div className="container intro-grid">
            <div className="intro-stat"><span className="stat-mark"></span><strong>Une main tendue.<br />Une vie relevée.</strong><small>Notre engagement au quotidien</small></div>
            <div><SectionIntro eyebrow="Notre mission" title="Donner du pain. Donner de l’amour. Donner de l’espérance." text="Nous croyons que chaque enfant mérite de grandir dans un environnement où il est nourri, aimé, protégé, écouté et encouragé à espérer. Pain et Espérance œuvre pour apporter une aide concrète aux enfants vulnérables tout en leur permettant de découvrir les valeurs de l’Évangile et de grandir dans la foi, la dignité et l’espérance." /><a className="text-link" href="#vision">En savoir plus <ArrowRight size={16} /></a></div>
          </div>
        </section>

        <section className="pillars section-pad">
          <div className="container"><SectionIntro eyebrow="Nos deux piliers" title="Prendre soin de l’enfant, dans toutes ses dimensions." text="Parce que les besoins du corps et ceux du cœur sont intimement liés." /><div className="pillar-grid">
            <article className="pillar-card pillar-bread"><div className="pillar-icon"></div><span className="pillar-label">01 / Le concret</span><h3>Offrir du pain</h3><p>Répondre aux besoins essentiels des enfants.</p><ul><li>Repas et aide alimentaire</li><li>Vêtements</li><li>Fournitures scolaires</li><li>Soutien matériel</li><li>Assistance selon les besoins</li></ul><blockquote>« Personne ne devrait être privé de l’essentiel lorsqu’une main peut être tendue. »</blockquote></article>
            <article className="pillar-card pillar-hope"><div className="pillar-icon"></div><span className="pillar-label">02 / L’essentiel</span><h3>Offrir de l’espérance</h3><p>Nourrir également le cœur et l’esprit.</p><ul><li>Enseignement biblique</li><li>Temps de prière</li><li>Écoute et accompagnement</li><li>Partage de la Parole de Dieu</li><li>Jeux et activités éducatives</li></ul><blockquote>« Un enfant a besoin de pain pour vivre, mais aussi d’amour et d’espérance pour grandir. »</blockquote></article>
          </div></div>
        </section>

        <section className="objectives section-pad" id="actions"><div className="container"><SectionIntro eyebrow="Nos objectifs" title="Quatre engagements, une même espérance." text="Notre action repose sur quatre engagements essentiels :" /><div className="objective-grid">{actions.slice(0, 4).map(({ icon: IconComponent, number, title, text }) => <article className="objective-card" key={number}><span className="objective-number">{number}</span><IconComponent size={25} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p></article>)}</div><div className="action-feature"><div className="feature-image" style={{ backgroundImage: `url(${photos.books})` }} /><div className="feature-copy"><span className="eyebrow"><span />À qui nous nous adressons</span><h3>Accueillis. Aimés. Respectés. Écoutés. Encouragés.</h3><p>Pain et Espérance porte une attention particulière aux enfants vulnérables et démunis, notamment ceux qui traversent des difficultés matérielles, sociales ou familiales.</p><Button href="#soutenir" variant="outline">Soutenir cette vision</Button></div></div></div></section>

        <section className="vision section-pad" id="vision"><div className="container vision-grid"><div className="vision-copy"><SectionIntro eyebrow="Notre vision" title="Voir chaque enfant grandir avec dignité et espérance." text="Nous rêvons d’un monde dans lequel aucun enfant ne se sent oublié ou abandonné. À travers Pain et Espérance, nous voulons contribuer à bâtir des communautés où les enfants reçoivent non seulement une aide matérielle, mais aussi de l’attention, de l’affection, une éducation et une orientation spirituelle." /><div className="ambition"><span>Notre ambition</span><strong>Semer aujourd’hui dans la vie d’un enfant les graines d’un avenir meilleur.</strong></div></div><div className="vision-photo"><img src={photos.community} alt="Des enfants partagent un repas ensemble" /><div className="photo-badge"><span>Une espérance<br /><strong>qui se partage</strong></span></div></div></div></section>

        <section className="faith section-pad"><div className="container faith-inner"><div className="faith-symbol">✚</div><SectionIntro eyebrow="Notre foi" title="Une action fondée sur l’amour du prochain" text="Pain et Espérance est une association chrétienne dont l’engagement est inspiré par les enseignements de Jésus-Christ." light /><div className="bible-quote">« Laissez venir à moi les petits enfants… »<small>Matthieu 19:14</small></div><p className="faith-detail">Cette parole nous rappelle l’importance d’accueillir, d’aimer et de prendre soin des enfants. Nous voulons mettre notre foi en pratique par des actes concrets de solidarité, de compassion et de service.</p></div></section>

        <section className="actions-list section-pad"><div className="container"><SectionIntro eyebrow="Agir avec nous" title="Des actions simples, un impact profondément humain." text="Chaque geste participe à créer un environnement où les enfants peuvent grandir." /><div className="action-list-grid">{actions.map(({ icon: IconComponent, number, title, text }) => <article key={number} className="action-row"><div className="action-icon"><IconComponent size={22} /></div><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowRight className="row-arrow" size={20} /></article>)}</div></div></section>

        <section className="gallery section-pad" id="galerie"><div className="container"><div className="gallery-heading"><SectionIntro eyebrow="Galerie" title="Nos actions en images" text="Des instants de partage, d’apprentissage et de joie, au plus près des enfants." /><div className="filter-list">{(['Toutes', 'Aide alimentaire', 'Enfants', 'Activités', 'Éducation'] as GalleryCategory[]).map((filter) => <button className={galleryFilter === filter ? 'active' : ''} key={filter} onClick={() => setGalleryFilter(filter)}>{filter}</button>)}</div></div><div className="gallery-grid">{filteredGallery.map((item) => <button className={`gallery-item ${item.tall ? 'gallery-tall' : ''}`} key={item.title} onClick={() => setActiveImage(item)}><img src={item.image} alt={item.title} /><span className="gallery-caption"><small>{item.category}</small><strong>{item.title}</strong></span></button>)}</div><p className="gallery-disclaimer">Les photographies présentant des mineurs doivent être publiées uniquement lorsque l’association dispose des autorisations nécessaires.</p></div></section>

        <section className="news section-pad" id="actualites"><div className="container"><SectionIntro eyebrow="Actualités" title="Les dernières nouvelles de Pain & Espérance" text="Retrouvez les temps forts, les projets et les histoires qui font vivre notre engagement." /><div className="news-grid"><article className="news-card news-card-main"><img src={photos.food} alt="Distribution alimentaire" /><div className="news-card-content"><span>Action de terrain · [Date]</span><h3>Distribution alimentaire</h3><p>Retour en images sur notre dernière action auprès des enfants vulnérables.</p><a href="#contact">Lire l’article <ArrowRight size={15} /></a></div></article><article className="news-card"><div className="news-date">À venir</div><span>Vie de l’association</span><h3>Des nouvelles de nos projets</h3><p>Les prochaines actualités de Pain & Espérance seront partagées ici.</p><a href="#contact">Rester informé <ArrowRight size={15} /></a></article><article className="news-card news-card-dark"><div className="news-spark"></div><span>Appel à la solidarité</span><h3>Ensemble, faisons grandir l’espérance.</h3><a href="#soutenir">Nous soutenir <ArrowRight size={15} /></a></article></div></div></section>

        <section className="support section-pad" id="soutenir"><div className="container"><SectionIntro eyebrow="Nous soutenir" title="Votre soutien peut devenir une source d’espérance." text="Il existe plusieurs manières de soutenir Pain et Espérance." /><div className="support-grid"><article className="support-card support-card-donate"><CircleDollarSign /><span>01</span><h3>Faire un don</h3><p>Votre contribution peut participer au financement de repas, fournitures, vêtements et activités pour les enfants.</p><Button href="#don" variant="light">Faire un don</Button></article><article className="support-card"><Users /><span>02</span><h3>Devenir bénévole</h3><p>Vous souhaitez donner de votre temps et de vos compétences ? Rejoignez notre équipe.</p><Button href="#benevole" variant="outline">Devenir bénévole</Button></article><article className="support-card"><Landmark /><span>03</span><h3>Devenir partenaire</h3><p>Entreprises, églises, associations et particuliers peuvent contribuer à nos projets.</p><Button href="#contact" variant="outline">Devenir partenaire</Button></article></div></div></section>

        <section className="donation section-pad" id="don"><div className="container donation-grid"><div><SectionIntro eyebrow="Faire un don" title="Chaque geste compte." text="Vous pouvez contribuer à la mission de Pain et Espérance par un don financier ou matériel." /><div className="impact-list"><span><Utensils />Un repas</span><span><BookOpen />Des fournitures scolaires</span><span><Package />Des vêtements</span><span><Heart />L’accompagnement d’un enfant</span></div></div><div className="donation-panel"><div className="donation-option"><strong>Mobile Money</strong><span>[Informations de paiement]</span></div><div className="donation-option"><strong>Virement bancaire</strong><span>[Coordonnées bancaires]</span></div><div className="donation-option"><strong>Don matériel</strong><span>Pour proposer un don matériel, contactez-nous directement.</span></div><Button href="#contact">Contacter Pain & Espérance</Button></div></div></section>

        <section className="volunteer section-pad" id="benevole"><div className="container form-grid"><div><SectionIntro eyebrow="Devenir bénévole" title="Donnez de votre temps. Donnez de votre cœur." text="Pain et Espérance a besoin de personnes prêtes à contribuer à sa mission." /><div className="skill-tags">{['Encadrement des enfants', 'Éducation', 'Événements', 'Communication', 'Logistique', 'Collecte de dons', 'Activités chrétiennes', 'Audiovisuel'].map((skill) => <span key={skill}><Check size={14} />{skill}</span>)}</div></div><form className="form-card" onSubmit={submitVolunteer}><div className="form-row"><label>Nom et prénom<input required name="name" placeholder="Votre nom" /></label><label>Téléphone<input required name="phone" placeholder="Votre téléphone" /></label></div><div className="form-row"><label>E-mail<input required type="email" name="email" placeholder="vous@exemple.com" /></label><label>Ville<input required name="city" placeholder="Votre ville" /></label></div><label>Domaine de compétence<input required name="skill" placeholder="Ex. éducation, logistique..." /></label><label>Comment souhaitez-vous aider ?<textarea required name="message" rows={4} placeholder="Parlez-nous de votre motivation" /></label><button className="submit-button" type="submit">Envoyer ma candidature <ArrowRight size={16} /></button>{volunteerSent && <p className="form-success"><Check size={16} />Merci pour votre candidature. Nous reviendrons vers vous.</p>}</form></div></section>

        <section className="values section-pad"><div className="container values-grid"><div><SectionIntro eyebrow="Qui sommes-nous ?" title="Une association chrétienne engagée auprès des enfants." text="Notre mission est de répondre aux besoins essentiels tout en apportant un accompagnement humain, affectif et spirituel." /><div className="motto"><span>Notre devise</span><strong>« Nourrir le corps,<br />éveiller l’âme. »</strong></div></div><div className="value-cards">{values.map(([name, text], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{text}</p></article>)}</div></div></section>

        <section className="contact section-pad" id="contact"><div className="container contact-grid"><div><SectionIntro eyebrow="Contact" title="Nous sommes à votre écoute." text="Vous souhaitez obtenir des informations, proposer votre aide, devenir partenaire ou soutenir une action ? Contactez-nous." /><div className="contact-details"><p><Mail size={18} /><span>E-mail<strong>contact.info@pain-esperance.com</strong></span></p><p><Phone size={18} /><span>Téléphone<strong>+237 656573713 </strong></span></p><p><MessageCircle size={18} /><span>WhatsApp<strong>+237 656573713</strong></span></p><p><Landmark size={18} /><span>Adresse<strong>[À compléter]</strong></span></p></div></div><form className="form-card contact-form" onSubmit={submitContact}><label>Nom et prénom<input required name="name" placeholder="Votre nom" /></label><label>Téléphone / E-mail<input required name="contact" placeholder="Comment vous joindre ?" /></label><label>Objet<input required name="subject" placeholder="Le sujet de votre message" /></label><label>Votre message<textarea required name="message" rows={5} placeholder="Écrivez votre message..." /></label><button className="submit-button" type="submit">Envoyer le message <ArrowRight size={16} /></button>{contactSent && <p className="form-success"><Check size={16} />Votre message est prêt à être pris en compte. Merci.</p>}</form></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-top"><div><Brand light logo="/logo_footer.png" /><p className="footer-about">Association chrétienne engagée auprès des enfants vulnérables.</p><div className="socials"><a href="#contact" aria-label="Instagram"><Instagram size={17} /></a><a href="#contact" aria-label="WhatsApp"><MessageCircle size={17} /></a><a href="#contact" aria-label="Facebook"><span>f</span></a></div></div><div><h4>Navigation</h4><a href="#mission">Notre mission</a><a href="#vision">Notre vision</a><a href="#galerie">Galerie</a></div><div><h4>Nous soutenir</h4><a href="#don">Faire un don</a><a href="#benevole">Devenir bénévole</a><a href="#contact">Devenir partenaire</a></div><div className="footer-quote"><span></span><p>« La foi se vit aussi dans l’action. »</p><small>— Pain & Espérance</small></div></div><div className="container footer-bottom"><span>© PAIN & ESPÉRANCE — Tous droits réservés.</span><span>Une association au service des enfants, de l’amour et de l’espérance.</span></div></footer>

      {activeImage && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActiveImage(null)}><button onClick={() => setActiveImage(null)} aria-label="Fermer"><X /></button><img src={activeImage.image} alt={activeImage.title} onClick={(event) => event.stopPropagation()} /><div><small>{activeImage.category}</small><strong>{activeImage.title}</strong></div></div>}
    </div>
  );
}

export default App;
